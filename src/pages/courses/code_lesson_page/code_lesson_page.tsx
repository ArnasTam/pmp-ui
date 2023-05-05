import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import '@fontsource/source-code-pro';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiTrophyFill,
} from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from 'src/components/code_editor/code_editor';
import CodeOutput from 'src/components/code_output/code_output';
import Editor from 'src/components/editor/editor';
import PageWrapper from 'src/components/page_layout/page_layout';
import useCreateCourseCodeSubmission from 'src/hooks/mutations/course_code_submissions_mutations';
import useGetCodeLanguagesQuery from 'src/hooks/queries/code_languages_queries';
import { useGetCodeLessonByIdQuery } from 'src/hooks/queries/course_code_lessons_queries';
import useGetCourseCodeProgress from 'src/hooks/queries/course_progress_queries';
import { CodeSubmissionResultsStatus } from 'src/models/http/code_submissions/code_submission_response';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const CodeLessonPage: FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { courseId, lessonId } = useParams();
  const [submissionValues, setSubmissionValues] = useState({
    code: '',
    codeLanguageId: '',
  });

  if (!courseId || !lessonId) {
    return <ErrorView />;
  }

  const createCodeSubmissionMutation = useCreateCourseCodeSubmission();

  const {
    isLoading: lessonIsLoading,
    isError: lessonIsError,
    data: lesson,
  } = useGetCodeLessonByIdQuery(lessonId, courseId);

  const {
    isLoading: codeLanguagesIsLoading,
    isError: codeLanguagesIsError,
    data: codeLanguages,
  } = useGetCodeLanguagesQuery();

  const {
    isLoading: progressIsLoading,
    data: progress,
    isError: progressIsError,
    refetch: refetchProgress,
  } = useGetCourseCodeProgress();

  const handlePrevLessonClick = useCallback(() => {
    if (!lesson?.prevLessonId) return;

    navigate(`/courses/${courseId}/lessons/${lesson.prevLessonId}`);
  }, [courseId, lesson?.prevLessonId]);

  const handleNextLessonClick = useCallback(() => {
    if (!lesson?.nextLessonId) return;

    navigate(`/courses/${courseId}/lessons/${lesson.nextLessonId}`);
  }, [courseId, lesson?.nextLessonId]);

  const handleOtherCoursesClick = useCallback(() => {
    navigate('/courses');
  }, []);

  const handleRunCode = useCallback(() => {
    if (!lesson?.codeProblemId) {
      return;
    }

    if (!submissionValues.code) {
      return;
    }

    if (!submissionValues.codeLanguageId) {
      return;
    }

    createCodeSubmissionMutation.mutate({
      lessonId,
      courseId,
      code: submissionValues.code,
      codeLanguageId: submissionValues.codeLanguageId,
      codeProblemId: lesson.codeProblemId,
    });
  }, [submissionValues, lessonId, courseId]);

  useEffect(() => {
    createCodeSubmissionMutation.reset();
    setSubmissionValues({
      code: lesson?.codeEditorTemplate ?? '',
      codeLanguageId: lesson?.allowedCodeLanguageIds?.at(0) ?? '',
    });
  }, [lesson]);

  useEffect(() => {
    if (!createCodeSubmissionMutation.isSuccess) return;

    if (
      createCodeSubmissionMutation.data.status ===
      CodeSubmissionResultsStatus.SUCCESS
    ) {
      onOpen();
      refetchProgress().then();
    }
  }, [createCodeSubmissionMutation.isSuccess]);

  const completedLessonIds = useMemo(
    () =>
      progress
        ?.get(courseId)
        ?.completedCodeLessons?.map((completedLesson) => completedLesson.id) ??
      [],
    [progress, courseId],
  );

  if (lessonIsLoading || codeLanguagesIsLoading || progressIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (lessonIsError || codeLanguagesIsError || progressIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper contentPaddingEnabled={false}>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box w="50vw">
          <Flex backgroundColor="green.500" height="40px">
            <Button
              leftIcon={<RiArrowLeftSLine size="25px" />}
              colorScheme="green"
              borderRadius="0"
              isDisabled={!lesson?.prevLessonId}
              onClick={handlePrevLessonClick}
            />
            <Spacer />
            <Button colorScheme="green" borderRadius="0">
              {`${lesson?.lessonNr}. ${lesson?.title}`}
            </Button>
            {completedLessonIds.includes(lesson?.id) && (
              <Center>
                <Badge colorScheme="purple">COMPLETED</Badge>
              </Center>
            )}
            <Spacer />
            <Button
              rightIcon={<RiArrowRightSLine size="25px" />}
              colorScheme="green"
              borderRadius="0"
              isDisabled={!lesson?.nextLessonId}
              onClick={handleNextLessonClick}
            />
          </Flex>
          <Box maxHeight="calc(100vh - 120px)" overflowY="scroll" p="10px">
            <Editor
              key={lesson?.id}
              isReadMode
              editorStateJson={lesson?.descriptionRichText}
            />
          </Box>
        </Box>
        <Box position="fixed" top="80px" left="50%" w="50vw">
          <CodeEditor
            initialValue={submissionValues.code}
            onChange={(value) => {
              setSubmissionValues({
                ...submissionValues,
                code: value,
              });
            }}
          />
          <Box height="40vh">
            <Flex backgroundColor="green.500" height="40px">
              <Button
                leftIcon={<MdPlayArrow size="25px" />}
                colorScheme={
                  submissionValues.codeLanguageId.length === 0
                    ? 'grey'
                    : 'green'
                }
                borderRadius="0"
                onClick={handleRunCode}
              >
                Run Code
              </Button>
              <Select
                color="white"
                border="none"
                value={submissionValues.codeLanguageId}
                onChange={(e) => {
                  setSubmissionValues({
                    ...submissionValues,
                    codeLanguageId: e.target.value,
                  });
                }}
              >
                {codeLanguages
                  ?.filter((language) =>
                    lesson?.allowedCodeLanguageIds.includes(language.id),
                  )
                  .map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.title}
                    </option>
                  ))}
              </Select>
            </Flex>
            <CodeOutput
              isLoading={createCodeSubmissionMutation.isLoading}
              testCaseResults={
                createCodeSubmissionMutation?.data?.testCaseResults
              }
            />
          </Box>
        </Box>
      </Grid>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <ModalContent>
          <ModalHeader>Congratulations!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center color="green.500">
              <RiTrophyFill size="100px" />
            </Center>
            <Center>
              <Text textAlign="center">
                {lesson?.nextLessonId
                  ? "You've successfully completed the code lesson. You're now ready to move on to the next one."
                  : "You've successfully completed the code lesson. This is the last code lesson of this course!"}
              </Text>
            </Center>
          </ModalBody>
          <ModalFooter gap="10px" pt="40px">
            <Button onClick={onClose}>Close</Button>
            {lesson?.nextLessonId ? (
              <Button
                backgroundColor="green.500"
                color="white"
                onClick={() => {
                  handleNextLessonClick();
                  onClose();
                }}
              >
                Next Lesson
              </Button>
            ) : (
              <Button
                backgroundColor="green.500"
                color="white"
                onClick={() => {
                  handleOtherCoursesClick();
                  onClose();
                }}
              >
                Other Courses
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};
export default CodeLessonPage;
