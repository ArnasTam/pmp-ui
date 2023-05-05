import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import React, { FC, useCallback } from 'react';
import AccordionCard from 'src/components/cards/accordion_card/accordion_card';
import CodeEditor from 'src/components/code_editor/code_editor';
import CourseLessonTestCasesList from 'src/components/courses/course_lesson_test_cases_list/course_lesson_test_cases_list';
import Editor from 'src/components/editor/editor';
import { useCreateCourseMutation } from 'src/hooks/mutations/courses_mutations';
import useGetCodeLanguagesQuery from 'src/hooks/queries/code_languages_queries';
import TestCase from 'src/models/course_lesson_test_case';
import Difficulty from 'src/types/course_difficulty';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

export interface EditChallengeFormValues {
  title: string;
  difficulty: Difficulty;
  descriptionRichText?: string;
  codeEditorTemplate: string;
  allowedCodeLanguageIds: string[];
  testCases: TestCase[];
}

interface EditChallengeFormProps {
  initialTitle?: string;
  initialDifficulty?: Difficulty;
  initialDescriptionRichText?: string;
  initialCodeEditorTemplate?: string;
  initialAllowedCodeLanguageIds?: string[];
  initialTestCases?: TestCase[];
  onSave: (values: EditChallengeFormValues) => void;
}

const EditChallengeForm: FC<EditChallengeFormProps> = ({
  initialTitle,
  initialDifficulty,
  initialDescriptionRichText,
  initialCodeEditorTemplate,
  initialAllowedCodeLanguageIds,
  initialTestCases,
  onSave,
}) => {
  const {
    data: languages,
    isLoading: langaugesIsLoading,
    isError: languagesIsError,
  } = useGetCodeLanguagesQuery();
  const createCourseMutation = useCreateCourseMutation();

  const initialValues: EditChallengeFormValues = {
    title: initialTitle ?? '',
    difficulty: initialDifficulty ?? Difficulty.Beginner,
    descriptionRichText: initialDescriptionRichText ?? undefined,
    codeEditorTemplate: initialCodeEditorTemplate ?? '',
    allowedCodeLanguageIds: initialAllowedCodeLanguageIds ?? [],
    testCases: initialTestCases ?? [],
  };

  const validateTitle = useCallback((value: string) => {
    if (!value) {
      return 'Title is required';
    }

    return undefined;
  }, []);

  const validateCodeLanguages = useCallback((value: string[]) => {
    if (!value.length) {
      return 'At least on code language must be selected';
    }

    return undefined;
  }, []);

  if (langaugesIsLoading) {
    return <LoadingView />;
  }

  if (languagesIsError) {
    return <ErrorView />;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {(form) => (
        <Form>
          <AccordionCard title="Title" isExpandable={false}>
            <Field name="title" validate={validateTitle}>
              {({ field }: FieldProps) => (
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
          <AccordionCard title="Allowed Code Languages" isExpandable={false}>
            <FormControl
              isInvalid={
                (form.errors.allowedCodeLanguageIds &&
                  form.touched.allowedCodeLanguageIds) as boolean
              }
            >
              <Flex pl="5px" direction="column">
                {languages.map((language) => (
                  <Field
                    key={language.id}
                    name="allowedCodeLanguageIds"
                    validate={validateCodeLanguages}
                  >
                    {({ field }: FieldProps<string[]>) => (
                      <Checkbox
                        {...field}
                        size="lg"
                        colorScheme="green"
                        isChecked={Boolean(
                          field.value &&
                            field.value.find(
                              (fieldValue) => fieldValue === language.id,
                            ),
                        )}
                        value={language.id}
                      >
                        {language.title}
                      </Checkbox>
                    )}
                  </Field>
                ))}
              </Flex>
              <FormErrorMessage>
                <ErrorMessage name="allowedCodeLanguageIds" />
              </FormErrorMessage>
            </FormControl>
          </AccordionCard>
          <Box h={10} />
          <AccordionCard title="Description">
            <Field name="descriptionRichText">
              {({ field }: FieldProps<string>) => (
                <FormControl>
                  <Editor
                    editorStateJson={field.value}
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
          <AccordionCard title="Code Editor Template">
            <Field name="codeEditorTemplate">
              {({ field }: FieldProps<string>) => (
                <FormControl>
                  <CodeEditor
                    initialValue={field.value}
                    onChange={(value) => {
                      form.setFieldValue('codeEditorTemplate', value);
                    }}
                  />
                </FormControl>
              )}
            </Field>
          </AccordionCard>
          <Box h={10} />
          <AccordionCard title="Test Cases">
            <Box>
              <Field name="testCases">
                {({ field }: FieldProps<TestCase[]>) => (
                  <FormControl>
                    <CourseLessonTestCasesList
                      testCases={field.value}
                      onChange={(value) =>
                        form.setFieldValue('testCases', value)
                      }
                    />
                  </FormControl>
                )}
              </Field>
            </Box>
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
export default EditChallengeForm;
