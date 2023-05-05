import { SimpleGrid } from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback } from 'react';
import CourseCard from 'src/components/courses/course_card/coures_card';
import PageWrapper from 'src/components/page_layout/page_layout';
import useGetCourseCodeProgress from 'src/hooks/queries/course_progress_queries';
import { useGetCoursesQuery } from 'src/hooks/queries/courses_queries';
import { CourseProgressStatus } from 'src/models/course_progress';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const CoursesPage: FC = () => {
  const {
    isLoading: coursesIsLoading,
    data: courses,
    isError: coursesIsError,
  } = useGetCoursesQuery();

  const {
    isLoading: progressIsLoading,
    data: progress,
    isError: progressIsError,
  } = useGetCourseCodeProgress();

  const isCourseStarted = useCallback(
    (courseId: string) => {
      const progressStatus = progress?.get(courseId)?.status;

      return (
        progressStatus === CourseProgressStatus.IN_PROGRESS ||
        progressStatus === CourseProgressStatus.COMPLETED
      );
    },
    [progress],
  );

  if (coursesIsLoading || progressIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (coursesIsError || progressIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper title="All Courses">
      <SimpleGrid minChildWidth="300px" spacing="24px">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            courseId={course.id}
            title={course.title}
            participantsCount={course.participantCount}
            estimatedHoursNeeded={course.estimatedTimeOfCompletion}
            difficulty={course.difficulty}
            tags={course.tags}
            showStartButton={!isCourseStarted(course.id)}
            author={course.author}
          />
        ))}
      </SimpleGrid>
    </PageWrapper>
  );
};
export default CoursesPage;
