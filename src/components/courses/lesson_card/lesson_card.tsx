import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback } from 'react';
import {
  Card,
  Text,
  HStack,
  Flex,
  Spacer,
  Button,
  Center,
  Badge,
} from '@chakra-ui/react';
import {
  RiArrowRightSLine,
  RiDeleteBin6Fill,
  RiEdit2Fill,
} from 'react-icons/ri';
import { GrDrag } from 'react-icons/gr';
import CourseLesson from 'src/models/course_lesson';

interface LessonCardProps {
  courseId?: string;
  lesson: CourseLesson;
  isCompletedLesson?: boolean;
  isEditable?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onNavigate?: (courseId: string, lessonId: string) => void;
}

const LessonCard: FC<LessonCardProps> = ({
  courseId,
  lesson,
  isCompletedLesson = false,
  isEditable = false,
  onEdit,
  onDelete,
  onNavigate,
}) => {
  const handleLessonNavigateClick = useCallback(() => {
    if (onNavigate && courseId) {
      onNavigate(courseId, lesson.id);
    }
  }, [onNavigate, courseId, lesson.id]);

  return (
    <Card border="1px solid #EDF2F7" shadow="">
      <Flex>
        {isEditable && (
          <Center p="4px" backgroundColor="gray.100">
            <GrDrag fontSize="16px" color="red" />
          </Center>
        )}
        <Flex w="100%" p="15px">
          <HStack>
            <Text fontSize="lg" fontWeight="bold" color="grey">
              {`#${lesson.lessonNr}`}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              {lesson.title}
            </Text>
          </HStack>
          <Spacer />
          {isCompletedLesson && (
            <Center pr="20px">
              <Badge colorScheme="green">COMPLETED</Badge>
            </Center>
          )}
          {isEditable ? (
            <HStack>
              <Button w="50px" onClick={() => onEdit && onEdit(lesson.id)}>
                <RiEdit2Fill fontSize="22px" />
              </Button>
              <Button
                w="50px"
                colorScheme="red"
                onClick={() => onDelete && onDelete(lesson.id)}
              >
                <RiDeleteBin6Fill fontSize="22px" />
              </Button>
            </HStack>
          ) : (
            <Button
              color="grey"
              _hover={{ backgroundColor: 'green.500', color: 'white ' }}
              onClick={handleLessonNavigateClick}
            >
              <RiArrowRightSLine size="25" />
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default LessonCard;
