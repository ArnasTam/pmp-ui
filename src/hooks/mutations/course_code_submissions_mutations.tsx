import { useMutation } from '@tanstack/react-query';
import useCourseCodeSubmissionsService from 'src/hooks/services/use_course_code_submissions_service';
import CreateCodeSubmissionRequest from 'src/models/http/code_submissions/create_course_code_submission_request';

const useCreateCourseCodeSubmission = () => {
  const codeSubmissionsService = useCourseCodeSubmissionsService();

  return useMutation({
    mutationFn: (data: CreateCodeSubmissionRequest) =>
      codeSubmissionsService.createCodeSubmission(data),
  });
};

export default useCreateCourseCodeSubmission;
