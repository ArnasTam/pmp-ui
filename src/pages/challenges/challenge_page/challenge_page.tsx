import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import '@fontsource/source-code-pro';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { RiTrophyFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from 'src/components/code_editor/code_editor';
import CodeOutput from 'src/components/code_output/code_output';
import Editor from 'src/components/editor/editor';
import PageWrapper from 'src/components/page_layout/page_layout';
import useCreateChallengeCodeSubmission from 'src/hooks/mutations/challenge_code_submissions_mutations';
import { useGetChallengeByIdQuery } from 'src/hooks/queries/challenges_queries';
import useGetCodeLanguagesQuery from 'src/hooks/queries/code_languages_queries';
import { CodeSubmissionResultsStatus } from 'src/models/http/code_submissions/code_submission_response';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const ChallengePage: FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { challengeId } = useParams();
  const [submissionValues, setSubmissionValues] = useState({
    code: '',
    codeLanguageId: '',
  });

  if (!challengeId) {
    return <ErrorView />;
  }

  const createChallengeCodeSubmission = useCreateChallengeCodeSubmission();

  const {
    isLoading: challengeIsLoading,
    isError: challengeIsError,
    data: challenge,
  } = useGetChallengeByIdQuery(challengeId);

  const {
    isLoading: codeLanguagesIsLoading,
    isError: codeLanguagesIsError,
    data: codeLanguages,
  } = useGetCodeLanguagesQuery();

  const handleRunCode = useCallback(() => {
    if (
      !challenge?.codeProblemId ||
      !submissionValues.code ||
      !submissionValues.codeLanguageId
    ) {
      return;
    }

    createChallengeCodeSubmission.mutate({
      code: submissionValues.code,
      codeLanguageId: submissionValues.codeLanguageId,
      codeProblemId: challenge.codeProblemId,
    });
  }, [submissionValues, challengeId]);

  useEffect(() => {
    createChallengeCodeSubmission.reset();
    setSubmissionValues({
      code: challenge?.codeEditorTemplate ?? '',
      codeLanguageId: challenge?.allowedCodeLanguageIds?.at(0) ?? '',
    });
  }, [challenge]);

  useEffect(() => {
    if (!createChallengeCodeSubmission.isSuccess) return;

    if (
      createChallengeCodeSubmission.data.status ===
      CodeSubmissionResultsStatus.SUCCESS
    ) {
      onOpen();
    }
  }, [createChallengeCodeSubmission.isSuccess]);

  const handleOtherChallengesClick = useCallback(() => {
    navigate('/challenges');
  }, []);

  if (challengeIsLoading || codeLanguagesIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (challengeIsError || codeLanguagesIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper contentPaddingEnabled={false}>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box w="50vw">
          <Flex backgroundColor="green.500" height="40px">
            <Spacer />
            <Button colorScheme="green" borderRadius="0">
              {`${challenge?.title}`}
            </Button>
            <Spacer />
          </Flex>
          <Box maxHeight="calc(100vh - 120px)" overflowY="scroll" p="10px">
            <Editor
              key={challenge?.id}
              isReadMode
              editorStateJson={challenge?.descriptionRichText}
            />
          </Box>
        </Box>
        <Box position="fixed" top="80px" left="50%" w="50vw">
          <CodeEditor
            initialValue={submissionValues.code}
            onChange={(value) => {
              setSubmissionValues({
                ...submissionValues,
                code: value,
              });
            }}
          />
          <Box height="40vh">
            <Flex backgroundColor="green.500" height="40px">
              <Button
                leftIcon={<MdPlayArrow size="25px" />}
                colorScheme={
                  submissionValues.codeLanguageId.length === 0
                    ? 'grey'
                    : 'green'
                }
                borderRadius="0"
                onClick={handleRunCode}
              >
                Run Code
              </Button>
              <Select
                color="white"
                border="none"
                value={submissionValues.codeLanguageId}
                onChange={(e) => {
                  setSubmissionValues({
                    ...submissionValues,
                    codeLanguageId: e.target.value,
                  });
                }}
              >
                {codeLanguages
                  ?.filter((language) =>
                    challenge?.allowedCodeLanguageIds.includes(language.id),
                  )
                  .map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.title}
                    </option>
                  ))}
              </Select>
            </Flex>
            <CodeOutput
              isLoading={createChallengeCodeSubmission.isLoading}
              testCaseResults={
                createChallengeCodeSubmission?.data?.testCaseResults
              }
            />
          </Box>
        </Box>
      </Grid>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <ModalContent>
          <ModalHeader>Congratulations!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center color="green.500">
              <RiTrophyFill size="100px" />
            </Center>
            <Center>
              <Text textAlign="center">
                {"You've successfully completed this challenge."}
              </Text>
            </Center>
          </ModalBody>
          <ModalFooter gap="10px" pt="40px">
            <Button onClick={onClose}>Close</Button>
            <Button
              backgroundColor="green.500"
              color="white"
              onClick={() => {
                handleOtherChallengesClick();
                onClose();
              }}
            >
              Other Challenges
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};
export default ChallengePage;
