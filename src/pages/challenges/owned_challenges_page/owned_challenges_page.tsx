import { useAuth0 } from '@auth0/auth0-react';
import { SimpleGrid } from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from 'src/components/challenges/challenge_card/challenge_card';
import PageWrapper from 'src/components/page_layout/page_layout';
import { useDeleteChallengeMutation } from 'src/hooks/mutations/challenges_mutations';
import { useGetChallengesByAuthorIdQuery } from 'src/hooks/queries/challenges_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const OwnedChallengesPage: FC = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth0();
  const deleteChallengeMutation = useDeleteChallengeMutation();

  if (!currentUser?.sub) {
    return <ErrorView />;
  }

  const {
    isLoading,
    data: challenges,
    isError,
    refetch: refetchChallenges,
  } = useGetChallengesByAuthorIdQuery(currentUser.sub);

  const handleDelete = useCallback((id: string) => {
    deleteChallengeMutation.mutateAsync(id).then(() => refetchChallenges());
  }, []);

  const handleEdit = useCallback((id: string) => {
    navigate(`/challenges/${id}/edit`);
  }, []);

  if (isLoading) {
    return <LoadingView showNavBar />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper title="Owned Challenges">
      <SimpleGrid minChildWidth="300px" spacing="24px">
        {challenges?.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challengeId={challenge.id}
            title={challenge.title}
            difficulty={challenge.difficulty}
            author={challenge.author}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </SimpleGrid>
    </PageWrapper>
  );
};
export default OwnedChallengesPage;
