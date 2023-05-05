import { useToast } from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditChallengeForm, {
  EditChallengeFormValues,
} from 'src/components/challenges/edit_challenge_form/edit_challenge_form';
import PageWrapper from 'src/components/page_layout/page_layout';
import { useCreateChallengeMutation } from 'src/hooks/mutations/challenges_mutations';

const CreateChallengePage: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const createChallengeMutation = useCreateChallengeMutation();

  useEffect(() => {
    if (createChallengeMutation.isError) {
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
  }, [createChallengeMutation.isError]);

  useEffect(() => {
    if (createChallengeMutation.isSuccess) {
      const challengeId = createChallengeMutation.data.id;
      navigate(`/challenges/${challengeId}`);
    }
  }, [createChallengeMutation.isSuccess]);

  const handleSave = useCallback(
    (values: EditChallengeFormValues) => {
      createChallengeMutation.mutate({
        ...values,
      });
    },
    [createChallengeMutation],
  );

  return (
    <PageWrapper title="Create New Challenge">
      <EditChallengeForm onSave={handleSave} />
    </PageWrapper>
  );
};
export default CreateChallengePage;
