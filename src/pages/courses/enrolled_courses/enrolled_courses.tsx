import { SimpleGrid } from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useMemo } from 'react';
import CourseCard from 'src/components/courses/course_card/coures_card';
import PageWrapper from 'src/components/page_layout/page_layout';
import useGetCourseCodeProgress from 'src/hooks/queries/course_progress_queries';
import Course from 'src/models/course';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const EnrolledCourses: FC = () => {
  const { isLoading, data, isError } = useGetCourseCodeProgress();

  const courses = useMemo(() => {
    const courseValues: Course[] = [];
    data?.forEach((value) => {
      courseValues.push(value.course);
    });
    return courseValues;
  }, [data]);

  if (isLoading) {
    return <LoadingView showNavBar />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper title="Enrolled Courses">
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
            author={course.author}
            showComplexityBar={false}
            status={data?.get(course.id)?.status}
          />
        ))}
      </SimpleGrid>
    </PageWrapper>
  );
};
export default EnrolledCourses;
