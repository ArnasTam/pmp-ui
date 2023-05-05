import { useQuery } from '@tanstack/react-query';
import useChallengesService from 'src/hooks/services/use_challenges_service';

enum ChallengesQueryKeys {
  GET_CHALLENGES = 'get-challenges',
  GET_CHALLENGE_BY_ID = 'get-challenge-by-id',
  GET_CHALLENGES_BY_AUTHOR_ID = 'get-challenges-by-author-id',
}

export const useGetChallengesQuery = () => {
  const challengesService = useChallengesService();

  return useQuery({
    queryKey: [ChallengesQueryKeys.GET_CHALLENGES],
    queryFn: () => challengesService.getChallanges(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetChallengesByAuthorIdQuery = (authorId: string) => {
  const challengesService = useChallengesService();

  return useQuery({
    queryKey: [ChallengesQueryKeys.GET_CHALLENGES_BY_AUTHOR_ID, authorId],
    queryFn: () => challengesService.getChallengesByAuthorId(authorId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetChallengeByIdQuery = (id: string) => {
  const challengesService = useChallengesService();

  return useQuery({
    queryKey: [ChallengesQueryKeys.GET_CHALLENGE_BY_ID, id],
    queryFn: () => challengesService.getChallengeById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
