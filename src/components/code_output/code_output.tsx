import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useMemo } from 'react';
import '@fontsource/source-code-pro';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { TestCaseResult } from 'src/models/http/code_submissions/test_case_result';

interface CodeOutputProps {
  testCaseResults?: TestCaseResult[];
  isLoading?: boolean;
}

const CodeOutput: FC<CodeOutputProps> = ({
  testCaseResults,
  isLoading = false,
}) => {
  const compileError = useMemo(
    () =>
      testCaseResults?.at(0)?.error ??
      testCaseResults?.at(0)?.compileOutput ??
      null,
    [testCaseResults],
  );

  const testCasesOutput = useMemo(() => {
    let result: string[] = [];

    testCaseResults?.forEach((testCase, index) => {
      const line = `${index}: ${
        testCase.status === 0 ? 'PASSED' : 'FAILED'
      } (expected: ${testCase?.expectedOutput} | received: ${
        testCase?.output
      })`;

      result = [...result, line];
    });

    return result;
  }, [testCaseResults]);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Center h="100%">
          <Spinner size="xl" color="green.500" />
        </Center>
      );
    }

    if (compileError) {
      return <Text fontFamily="Source code Pro">{compileError}</Text>;
    }

    if (testCasesOutput.length) {
      return (
        <>
          <Text fontFamily="Source code Pro">TEST CASES:</Text>
          {testCasesOutput.map((line, index) => (
            <Text key={`test-case-${index}`} fontFamily="Source code Pro">
              {line}
            </Text>
          ))}
        </>
      );
    }

    return <></>;
  }, [isLoading, testCasesOutput, compileError, testCaseResults]);

  return (
    <Box
      backgroundColor="black"
      height="calc(100% - 40px)"
      color="white"
      padding="20px"
      overflowY="scroll"
    >
      {content}
    </Box>
  );
};

export default CodeOutput;
