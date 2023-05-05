import { SimpleGrid } from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC } from 'react';
import ChallengeCard from 'src/components/challenges/challenge_card/challenge_card';
import PageWrapper from 'src/components/page_layout/page_layout';
import { useGetChallengesQuery } from 'src/hooks/queries/challenges_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const ChallengesPage: FC = () => {
  const { isLoading, data: challenges, isError } = useGetChallengesQuery();

  if (isLoading) {
    return <LoadingView showNavBar />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper title="All Challenges">
      <SimpleGrid minChildWidth="300px" spacing="24px">
        {challenges?.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challengeId={challenge.id}
            title={challenge.title}
            difficulty={challenge.difficulty}
            author={challenge.author}
          />
        ))}
      </SimpleGrid>
    </PageWrapper>
  );
};
export default ChallengesPage;
