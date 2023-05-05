import { useToast } from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditCourseForm, {
  EditCourseFormValues,
} from 'src/components/courses/edit_course_form/edit_course_form';
import PageWrapper from 'src/components/page_layout/page_layout';
import { useCreateCourseMutation } from 'src/hooks/mutations/courses_mutations';

const CreateCoursePage: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const createCourseMutation = useCreateCourseMutation();

  useEffect(() => {
    if (createCourseMutation.isError) {
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
  }, [createCourseMutation.isError]);

  useEffect(() => {
    if (createCourseMutation.isSuccess) {
      const courseId = createCourseMutation.data.id;
      navigate(`/courses/${courseId}`);
    }
  }, [createCourseMutation.isSuccess]);

  const handleSave = useCallback(
    (values: EditCourseFormValues) => {
      createCourseMutation.mutate({
        title: values.title,
        descriptionRichText: values.descriptionRichText,
        estimatedTimeOfCompletion: Math.trunc(values.estimatedTimeOfCompletion),
        difficulty: values.difficulty,
        tagIds: values.tagIds,
        codeLessons: values.codeLessons,
      });
    },
    [createCourseMutation],
  );

  return (
    <PageWrapper title="Create New Course">
      <EditCourseForm onSave={handleSave} />
    </PageWrapper>
  );
};
export default CreateCoursePage;
