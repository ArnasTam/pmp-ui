import { useMutation } from '@tanstack/react-query';
import useCourseProgressService from 'src/hooks/services/use_course_progress_service';
import CreateCourseProgressRequest from 'src/models/http/course_progress/create_course_progress_request';

const useCreateCourseProgressMutation = () => {
  const courseProgressService = useCourseProgressService();

  return useMutation({
    mutationFn: (data: CreateCourseProgressRequest) =>
      courseProgressService.createCourseProgress(data),
  });
};

export default useCreateCourseProgressMutation;
