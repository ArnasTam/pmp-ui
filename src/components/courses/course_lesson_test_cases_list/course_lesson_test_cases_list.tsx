import { Box, Button } from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import CourseLessonTestCaseInput from 'src/components/courses/course_lesson_test_case_input/course_lesson_test_case_input';
import TestCase from 'src/models/course_lesson_test_case';

interface CourseLessonTestCasesListProps {
  testCases: TestCase[];
  onChange: (testCases: TestCase[]) => void;
}

const CourseLessonTestCasesList: FC<CourseLessonTestCasesListProps> = ({
  testCases,
  onChange,
}) => {
  const [testCasesList, setTestCasesList] = useState(
    testCases.length
      ? testCases
      : [{ id: uuid(), input: '', expectedResult: '' }],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setTestCasesList(testCasesList.filter((item) => item.id !== id));
    },
    [testCasesList],
  );

  const handleTestCaseChange = useCallback(
    (updatedTestCase: TestCase) => {
      const index = testCasesList.findIndex(
        (testCase) => testCase.id === updatedTestCase.id,
      );
      if (index !== -1) {
        const updatedList = [...testCasesList];
        updatedList[index] = updatedTestCase;
        setTestCasesList(updatedList);
      }
    },
    [testCasesList],
  );

  useEffect(() => {
    onChange(testCasesList);
  }, [testCasesList]);

  return (
    <Box>
      {testCasesList.map((item) => (
        <CourseLessonTestCaseInput
          key={item.id}
          initialTestCase={item}
          onDelete={handleDelete}
          onChange={handleTestCaseChange}
        />
      ))}
      <Button
        mt="15px"
        p="10px"
        w="100%"
        onClick={() => {
          setTestCasesList([
            ...testCasesList,
            {
              id: uuid(),
              input: '',
              expectedResult: '',
            },
          ]);
        }}
      >
        Add Test Case
      </Button>
    </Box>
  );
};

export default CourseLessonTestCasesList;
