import { jsx } from '@emotion/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import useGetCodeLanguagesQuery from 'src/hooks/queries/code_languages_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';
import { v4 as uuid } from 'uuid';
import { FieldProps } from 'formik/dist/Field';
import React, { FC, useCallback } from 'react';
import {
  Button,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Modal,
  ModalCloseButton,
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  Divider,
  Flex,
  Checkbox,
} from '@chakra-ui/react';
import AccordionCard from 'src/components/cards/accordion_card/accordion_card';
import CodeEditor from 'src/components/code_editor/code_editor';
import CourseLessonTestCasesList from 'src/components/courses/course_lesson_test_cases_list/course_lesson_test_cases_list';
import Editor from 'src/components/editor/editor';
import CourseLesson from 'src/models/course_lesson';
import TestCase from 'src/models/course_lesson_test_case';

interface EditLessonFormValues {
  title: string;
  codeEditorTemplate: string;
  descriptionRichText?: string;
  allowedLanguagesIds: string[];
  testCases: TestCase[];
}

interface EditLessonModalProps {
  isOpen: boolean;
  onSave: (lesson: CourseLesson) => void;
  onClose: () => void;
  lesson?: CourseLesson;
}

const EditLessonModal: FC<EditLessonModalProps> = ({
  isOpen,
  onSave,
  onClose,
  lesson,
}) => {
  const { data: languages, isLoading, isError } = useGetCodeLanguagesQuery();

  const initialValues: EditLessonFormValues = {
    testCases: lesson?.testCases ?? [],
    title: lesson?.title ?? '',
    descriptionRichText: lesson?.descriptionRichText ?? undefined,
    codeEditorTemplate: lesson?.codeEditorTemplate ?? '',
    allowedLanguagesIds: lesson?.allowedCodeLanguageIds ?? [],
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

  if (isLoading) {
    return (
      <Modal
        size="5xl"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <LoadingView />
      </Modal>
    );
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <>
      <Modal
        size="5xl"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSave({
              id: lesson?.id ?? uuid(),
              allowedCodeLanguageIds: values.allowedLanguagesIds,
              codeEditorTemplate: values.codeEditorTemplate,
              descriptionRichText: values.descriptionRichText,
              lessonNr: lesson?.lessonNr ?? 0,
              testCases: values.testCases,
              title: values.title,
            });
          }}
        >
          {(form) => (
            <Form>
              <ModalContent maxH="80vh">
                <ModalHeader>Add New Lesson</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody padding="25px">
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
                  <AccordionCard
                    title="Allowed Code Languages"
                    isExpandable={false}
                  >
                    <FormControl
                      isInvalid={
                        (form.errors.allowedLanguagesIds &&
                          form.touched.allowedLanguagesIds) as boolean
                      }
                    >
                      <Flex pl="5px" direction="column">
                        {languages.map((language) => (
                          <Field
                            key={language.id}
                            name="allowedLanguagesIds"
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
                                      (fieldValue) =>
                                        fieldValue === language.id,
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
                        <ErrorMessage name="allowedLanguagesIds" />
                      </FormErrorMessage>
                    </FormControl>
                  </AccordionCard>
                  <Box h={10} />
                  <AccordionCard title="Content">
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
                </ModalBody>
                <Divider />
                <ModalFooter gap="10px">
                  <Button
                    backgroundColor="green.500"
                    color="white"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditLessonModal;
