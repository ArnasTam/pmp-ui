import { useToast } from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditCourseForm, {
  EditCourseFormValues,
} from 'src/components/courses/edit_course_form/edit_course_form';
import PageWrapper from 'src/components/page_layout/page_layout';
import { useUpdateCourseMutation } from 'src/hooks/mutations/courses_mutations';
import { useGetCodeLessonsByCourseIdQuery } from 'src/hooks/queries/course_code_lessons_queries';
import { useGetCourseByIdQuery } from 'src/hooks/queries/courses_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const EditCoursePage: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const updateCourseMutation = useUpdateCourseMutation();
  const { courseId } = useParams();

  if (!courseId) {
    return <ErrorView />;
  }

  const {
    data: course,
    isLoading: courseIsLoading,
    isError: courseIsError,
  } = useGetCourseByIdQuery(courseId);

  const {
    data: lessons,
    isLoading: lessonsIsLoading,
    isError: lessonsIsError,
  } = useGetCodeLessonsByCourseIdQuery(courseId);

  useEffect(() => {
    if (updateCourseMutation.isError) {
      toast.closeAll();
      toast({
        title: 'Error',
        description: 'There was an error with saving this course',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }, [updateCourseMutation.isError]);

  useEffect(() => {
    if (updateCourseMutation.isSuccess) {
      navigate(`/courses/${courseId}`);
    }
  }, [updateCourseMutation.isSuccess]);

  const handleSave = useCallback(
    (values: EditCourseFormValues) => {
      updateCourseMutation.mutate({
        id: courseId,
        course: {
          title: values.title,
          descriptionRichText: values.descriptionRichText,
          estimatedTimeOfCompletion: Math.trunc(
            values.estimatedTimeOfCompletion,
          ),
          difficulty: values.difficulty,
          tagIds: values.tagIds,
          codeLessons: values.codeLessons,
        },
      });
    },
    [updateCourseMutation],
  );

  if (courseIsLoading || lessonsIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (courseIsError || lessonsIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper title={'Edit Course'}>
      <EditCourseForm
        initialTitle={course?.title}
        initialDifficulty={course?.difficulty}
        initialCodeLessons={lessons}
        initialTagIds={course?.tags.map((tag) => tag.id)}
        initialDescriptionRichText={course?.descriptionRichText}
        initialEstimatedTimeOfCompletion={course?.estimatedTimeOfCompletion}
        onSave={handleSave}
      />
    </PageWrapper>
  );
};
export default EditCoursePage;
