import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useEffect, useState } from 'react';
import { Card, HStack, Flex, Spacer, Button, Input } from '@chakra-ui/react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import TestCase from 'src/models/course_lesson_test_case';

interface CourseLessonTestCaseInputProps {
  initialTestCase: TestCase;
  onChange: (testCase: TestCase) => void;
  onDelete: (id: string) => void;
}

const CourseLessonTestCaseInput: FC<CourseLessonTestCaseInputProps> = ({
  initialTestCase,
  onChange,
  onDelete,
}) => {
  const [testCase, setTestCase] = useState(initialTestCase);

  useEffect(() => {
    onChange(testCase);
  }, [testCase]);

  return (
    <Card border="1px solid #EDF2F7" shadow="">
      <Flex>
        <Flex w="100%" p="15px">
          <HStack w="100%" pr="20px">
            <Input
              variant="filled"
              placeholder="Input"
              value={testCase.input}
              onChange={(event) => {
                setTestCase({ ...testCase, input: event.target.value });
              }}
            />
            <Input
              variant="filled"
              placeholder="Expected Result"
              value={testCase.expectedResult}
              onChange={(event) => {
                setTestCase({
                  ...testCase,
                  expectedResult: event.target.value,
                });
              }}
            />
          </HStack>
          <Spacer />
          <HStack>
            <Button
              w="50px"
              colorScheme="red"
              onClick={() => onDelete(testCase.id)}
            >
              <RiDeleteBin6Fill fontSize="22px" />
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CourseLessonTestCaseInput;
