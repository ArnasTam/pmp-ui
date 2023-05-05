import { useAuth0 } from '@auth0/auth0-react';
import { SimpleGrid } from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from 'src/components/courses/course_card/coures_card';
import PageWrapper from 'src/components/page_layout/page_layout';
import { useDeleteCourseMutation } from 'src/hooks/mutations/courses_mutations';
import { useGetCoursesByAuthorIdQuery } from 'src/hooks/queries/courses_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const OwnedCoursePage: FC = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth0();
  const deleteCourseMutation = useDeleteCourseMutation();

  if (!currentUser?.sub) {
    return <ErrorView />;
  }

  const {
    isLoading,
    data: courses,
    isError,
    refetch: refetchCourses,
  } = useGetCoursesByAuthorIdQuery(currentUser.sub);

  const handleDelete = useCallback((id: string) => {
    deleteCourseMutation.mutateAsync(id).then(() => refetchCourses());
  }, []);

  const handleEdit = useCallback((id: string) => {
    navigate(`/courses/${id}/edit`);
  }, []);

  if (isLoading) {
    return <LoadingView showNavBar />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper title="Owned Courses">
      <SimpleGrid minChildWidth="300px" spacing="24px">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            courseId={course.id}
            title={course.title}
            participantsCount={course.participantCount}
            estimatedHoursNeeded={course.estimatedTimeOfCompletion}
            difficulty={course.difficulty}
            tags={[]}
            showComplexityBar={false}
            author={course.author}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </SimpleGrid>
    </PageWrapper>
  );
};
export default OwnedCoursePage;
