import { useMutation } from '@tanstack/react-query';
import useChallengeCodeSubmissionsService from 'src/hooks/services/use_challenge_code_submissions_service';
import CreateChallengeCodeSubmissionRequest from 'src/models/http/code_submissions/create_challenge_code_submission_request';

const useCreateChallengeCodeSubmission = () => {
  const challengeCodeSubmissionsService = useChallengeCodeSubmissionsService();

  return useMutation({
    mutationFn: (data: CreateChallengeCodeSubmissionRequest) =>
      challengeCodeSubmissionsService.createCodeSubmission(data),
  });
};

export default useCreateChallengeCodeSubmission;
