import { useMutation } from '@tanstack/react-query';
import useChallengesService from 'src/hooks/services/use_challenges_service';
import { CreateChallengeRequest } from 'src/models/http/challenges/create_challenge_request';

export const useCreateChallengeMutation = () => {
  const challengesService = useChallengesService();

  return useMutation({
    mutationFn: (data: CreateChallengeRequest) =>
      challengesService.createChallenge(data),
  });
};

export const useUpdateChallengeMutation = () => {
  const challengesService = useChallengesService();

  return useMutation({
    mutationFn: (data: { id: string; challenge: CreateChallengeRequest }) =>
      challengesService.updateChallenge(data.id, data.challenge),
  });
};

export const useDeleteChallengeMutation = () => {
  const challengesService = useChallengesService();

  return useMutation({
    mutationFn: (id: string) => challengesService.deleteChallenge(id),
  });
};
