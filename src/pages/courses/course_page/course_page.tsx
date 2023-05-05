import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccordionCard from 'src/components/cards/accordion_card/accordion_card';
import CourseReviews from 'src/components/courses/course_reviews/course_reviews';
import LessonCardsList from 'src/components/courses/lesson_cards_list/lessons_card_list';
import Editor from 'src/components/editor/editor';
import PageWrapper from 'src/components/page_layout/page_layout';
import useCreateCourseProgressMutation from 'src/hooks/mutations/course_progress_mutations';
import { useGetCodeLessonsByCourseIdQuery } from 'src/hooks/queries/course_code_lessons_queries';
import useGetCourseCodeProgress from 'src/hooks/queries/course_progress_queries';
import { useGetCourseByIdQuery } from 'src/hooks/queries/courses_queries';
import { CourseProgressStatus } from 'src/models/course_progress';
import { getIconByTag } from 'src/utils/tag_icon_util';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const CoursePage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { courseId } = useParams();
  const createCourseProgressMutation = useCreateCourseProgressMutation();
  const { user: currentUser } = useAuth0();

  if (!courseId) {
    return <ErrorView />;
  }

  const {
    isLoading: courseIsLoading,
    data: course,
    isError: courseIsError,
  } = useGetCourseByIdQuery(courseId);

  const {
    isLoading: lessonsIsLoading,
    data: lessons,
    isError: lessonsIsError,
  } = useGetCodeLessonsByCourseIdQuery(courseId);

  const {
    isLoading: progressIsLoading,
    data: progress,
    isError: progressIsError,
    refetch: refetchProgress,
  } = useGetCourseCodeProgress();

  const handleStartClick = useCallback(() => {
    if (currentUser?.sub) {
      createCourseProgressMutation
        .mutateAsync({
          courseId,
          userId: currentUser?.sub,
        })
        .then(() => refetchProgress());
    }
  }, [courseId, currentUser?.sub]);

  const courseIsStarted = useMemo(() => {
    const progressStatus = progress?.get(courseId)?.status;

    return (
      progressStatus === CourseProgressStatus.IN_PROGRESS ||
      progressStatus === CourseProgressStatus.COMPLETED
    );
  }, [progress, courseId]);

  const handleLessonNavigate = useCallback(
    (courseIdValue: string, lessonId: string) => {
      if (courseIsStarted) {
        navigate(`/courses/${courseIdValue}/lessons/${lessonId}`);
      } else {
        onOpen();
      }
    },
    [courseIsStarted],
  );

  const bannerContent = useMemo(() => {
    if (courseIsStarted) {
      return null;
    }
    return (
      <Text>
        {'Start learning now! '}
        <Button
          color="white"
          fontWeight="bold"
          variant="link"
          isLoading={createCourseProgressMutation.isLoading}
          onClick={handleStartClick}
        >
          Click here
        </Button>
        {' to start this course'}
      </Text>
    );
  }, [courseIsStarted]);

  useEffect(() => {
    if (createCourseProgressMutation.isSuccess) {
      toast.closeAll();
      toast({
        title: 'Success',
        description:
          'Congratulations! You have successfully enrolled in the course.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }, [createCourseProgressMutation.isSuccess]);

  const completedLessonIds = useMemo(
    () =>
      progress
        ?.get(courseId)
        ?.completedCodeLessons?.map((lesson) => lesson.id) ?? [],
    [progress, courseId],
  );

  if (courseIsLoading || lessonsIsLoading || progressIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (courseIsError || lessonsIsError || progressIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper bannerContent={bannerContent}>
      <AccordionCard isExpandable={false}>
        <HStack spacing={3}>
          <Heading size="sm" color="grey" w="65px">
            Title:
          </Heading>
          <Heading size="sm">{course?.title}</Heading>
        </HStack>
        <Box h={5} />
        <HStack spacing={3}>
          <Heading size="sm" color="grey" w="65px">
            Author:
          </Heading>
          <Heading size="sm">{course?.author?.email}</Heading>
          <Avatar src={course?.author?.picture} size="xs" ml={-1} mr={2} />
        </HStack>
        <Box h={5} />
        <HStack spacing={3}>
          <>
            <Heading size="sm" color="grey" w="65px">
              Tags:
            </Heading>
            {!course.tags ? <Heading size="md">-</Heading> : <></>}
            <HStack spacing={3}>
              {course.tags?.map((tag) => (
                <Tag
                  key={tag.id}
                  size="md"
                  variant="outline"
                  colorScheme="green"
                >
                  {getIconByTag(tag.title) && (
                    <TagLeftIcon boxSize="12px" as={getIconByTag(tag.title)} />
                  )}
                  <TagLabel>{tag.title}</TagLabel>
                </Tag>
              ))}
            </HStack>
          </>
        </HStack>
      </AccordionCard>
      <Box h={10} />
      <AccordionCard title="Description">
        <Editor isReadMode editorStateJson={course?.descriptionRichText} />
      </AccordionCard>
      <Box h={10} />
      <AccordionCard title="Lessons">
        <LessonCardsList
          courseId={course?.id}
          lessons={lessons}
          completedLessonIds={completedLessonIds}
          onLessonNavigate={handleLessonNavigate}
        />
      </AccordionCard>
      <Box h={10} />
      <AccordionCard title="Reviews">
        <CourseReviews courseId={courseId} />
      </AccordionCard>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <ModalContent>
          <ModalHeader>Start Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Text textAlign="center">
                {
                  'Welcome to the course! To begin learning, start the course to access the lessons.'
                }
              </Text>
            </Center>
          </ModalBody>
          <ModalFooter gap="10px" pt="40px">
            <Button onClick={onClose}>Close</Button>
            <Button
              backgroundColor="green.500"
              color="white"
              onClick={() => {
                handleStartClick();
                onClose();
              }}
            >
              Start
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};
export default CoursePage;
