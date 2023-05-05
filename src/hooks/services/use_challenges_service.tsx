import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import ChallengesService from 'src/services/challenges.service';

const useChallengesService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new ChallengesService(httpClient), [httpClient]);
};

export default useChallengesService;
