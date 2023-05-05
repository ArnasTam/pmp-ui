import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import React, { FC, useCallback } from 'react';
import AccordionCard from 'src/components/cards/accordion_card/accordion_card';
import LessonCardsList from 'src/components/courses/lesson_cards_list/lessons_card_list';
import Editor from 'src/components/editor/editor';
import { useCreateCourseMutation } from 'src/hooks/mutations/courses_mutations';
import useGetCourseTagsQuery from 'src/hooks/queries/course_tags_queries';
import CourseLesson from 'src/models/course_lesson';
import Difficulty from 'src/types/course_difficulty';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

export interface EditCourseFormValues {
  title: string;
  difficulty: Difficulty;
  tagIds: string[];
  estimatedTimeOfCompletion: number;
  descriptionRichText: string;
  codeLessons: CourseLesson[];
}

interface EditCoursePageProps {
  initialTitle?: string;
  initialDifficulty?: Difficulty;
  initialTagIds?: string[];
  initialEstimatedTimeOfCompletion?: number;
  initialDescriptionRichText?: string;
  initialCodeLessons?: CourseLesson[];
  onSave: (values: EditCourseFormValues) => void;
}

const EditCourseForm: FC<EditCoursePageProps> = ({
  initialTitle,
  initialDifficulty,
  initialCodeLessons,
  initialTagIds,
  initialDescriptionRichText,
  initialEstimatedTimeOfCompletion,
  onSave,
}) => {
  const {
    isLoading: tagsIsLoading,
    data: tags,
    isError: tagsIsError,
  } = useGetCourseTagsQuery();
  const createCourseMutation = useCreateCourseMutation();

  const initialValues: EditCourseFormValues = {
    descriptionRichText: initialDescriptionRichText ?? '',
    difficulty: initialDifficulty ?? Difficulty.Beginner,
    estimatedTimeOfCompletion: initialEstimatedTimeOfCompletion ?? 1,
    tagIds: initialTagIds ?? [],
    codeLessons: initialCodeLessons ?? [],
    title: initialTitle ?? '',
  };

  const validateTitle = useCallback((value: string) => {
    if (!value) {
      return 'Name is required';
    }

    return undefined;
  }, []);

  if (tagsIsLoading) {
    return <LoadingView />;
  }

  if (tagsIsError) {
    return <ErrorView />;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {() => (
        <Form>
          <AccordionCard title="Title" isExpandable={false}>
            <Field name="title" validate={validateTitle}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    (form.errors.title && form.touched.title) as boolean
                  }
                >
                  <Input {...field} placeholder="Title" size="lg" />
                  <FormErrorMessage>
                    <ErrorMessage name="title" />
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </AccordionCard>
          <Box h={10} />
          <AccordionCard title="Difficulty" isExpandable={false}>
            <Field name="difficulty">
              {({ field }: FieldProps) => (
                <FormControl>
                  <Select {...field}>
                    <option value={Difficulty.Beginner}>Beginner</option>
                    <option value={Difficulty.Intermediate}>
                      Intermediate
                    </option>
                    <option value={Difficulty.Advanced}>Advanced</option>
                  </Select>
                </FormControl>
              )}
            </Field>
          </AccordionCard>
          <Box h={10} />
          <AccordionCard
            title="Estimated Time of Completion"
            isExpandable={false}
          >
            <Field name="estimatedTimeOfCompletion">
              {({ field }: FieldProps) => (
                <FormControl>
                  <NumberInput
                    defaultValue={initialValues.estimatedTimeOfCompletion ?? 1}
                    min={1}
                    max={2000}
                  >
                    <NumberInputField type="number" {...field} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              )}
            </Field>
          </AccordionCard>
          <Box h={10} />
          <AccordionCard title="Tags" isExpandable={false}>
            <Flex pl="5px" direction="column">
              {tags.map((tag) => (
                <Field key={tag.id} name="tagIds">
                  {({ field }: FieldProps<string[]>) => (
                    <Checkbox
                      {...field}
                      isChecked={
                        !!field.value.find(
                          (fieldValue) => fieldValue === tag.id,
                        )
                      }
                      size="lg"
                      colorScheme="green"
                      value={tag.id}
                    >
                      {tag.title}
                    </Checkbox>
                  )}
                </Field>
              ))}
            </Flex>
          </AccordionCard>
          <Box h={10} />
          <AccordionCard title="Lessons">
            <Field name="codeLessons">
              {({ form, field }: FieldProps<CourseLesson[]>) => (
                <FormControl>
                  <Box>
                    <LessonCardsList
                      isEditable
                      lessons={field.value}
                      onChange={(codeLessons) =>
                        form.setFieldValue('codeLessons', codeLessons)
                      }
                    />
                  </Box>
                  <FormErrorMessage>
                    <ErrorMessage name="descriptionRichText" />
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </AccordionCard>
          <Box h={10} />
          <AccordionCard title="Description">
            <Field name="descriptionRichText">
              {({ form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    (form.errors.descriptionRichText &&
                      form.touched.descriptionRichText) as boolean
                  }
                >
                  <Editor
                    editorStateJson={initialDescriptionRichText}
                    onChange={(state) =>
                      form.setFieldValue('descriptionRichText', state)
                    }
                  />
                  <FormErrorMessage>
                    <ErrorMessage name="descriptionRichText" />
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </AccordionCard>
          <Box h={10} />
          <Button
            backgroundColor="green.500"
            color="white"
            w="100%"
            type="submit"
            isLoading={createCourseMutation.isLoading}
          >
            Publish
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default EditCourseForm;
