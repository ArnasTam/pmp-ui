import { useToast } from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditChallengeForm, {
  EditChallengeFormValues,
} from 'src/components/challenges/edit_challenge_form/edit_challenge_form';
import PageWrapper from 'src/components/page_layout/page_layout';
import { useUpdateChallengeMutation } from 'src/hooks/mutations/challenges_mutations';
import { useGetChallengeByIdQuery } from 'src/hooks/queries/challenges_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const EditChallengePage: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const updateChallengeMutation = useUpdateChallengeMutation();
  const { challengeId } = useParams();

  if (!challengeId) {
    return <ErrorView />;
  }

  const {
    data: challenge,
    isLoading: challengeIsLoading,
    isError: challengeIsError,
  } = useGetChallengeByIdQuery(challengeId);

  useEffect(() => {
    if (updateChallengeMutation.isError) {
      toast.closeAll();
      toast({
        title: 'Error',
        description: 'There was an error with saving this challenge',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }, [updateChallengeMutation.isError]);

  useEffect(() => {
    if (updateChallengeMutation.isSuccess) {
      navigate(`/challenges/${challengeId}`);
    }
  }, [updateChallengeMutation.isSuccess]);

  const handleSave = useCallback(
    (values: EditChallengeFormValues) => {
      updateChallengeMutation.mutate({
        id: challengeId,
        challenge: {
          ...values,
        },
      });
    },
    [updateChallengeMutation],
  );

  if (challengeIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (challengeIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper title="Edit Challenge">
      <EditChallengeForm
        initialTitle={challenge?.title}
        initialDifficulty={challenge?.difficulty}
        initialDescriptionRichText={challenge?.descriptionRichText}
        initialCodeEditorTemplate={challenge?.codeEditorTemplate}
        initialAllowedCodeLanguageIds={challenge?.allowedCodeLanguageIds}
        initialTestCases={challenge?.testCases}
        onSave={handleSave}
      />
    </PageWrapper>
  );
};
export default EditChallengePage;
