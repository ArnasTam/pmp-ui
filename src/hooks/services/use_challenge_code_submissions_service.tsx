import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import ChallengeCodeSubmissionsService from 'src/services/challenge_code_submissions.service';

const useChallengeCodeSubmissionsService = () => {
  const httpClient = useHttpClient();
  return useMemo(
    () => new ChallengeCodeSubmissionsService(httpClient),
    [httpClient],
  );
};

export default useChallengeCodeSubmissionsService;
