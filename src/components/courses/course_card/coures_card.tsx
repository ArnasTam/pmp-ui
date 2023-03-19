import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Avatar,
} from '@chakra-ui/react';
import { BiHourglass } from 'react-icons/bi';
import CourseTag from 'src/models/course_tag';
import User from 'src/models/user';
import CourseDifficulty from 'src/types/course_difficulty';
import {
  getColorByCourseDifficulty,
  getTitleByCourseDifficulty,
} from 'src/utils/course_difficuly_util';
import { getIconByTagId } from 'src/utils/tag_icon_util';

interface CourseCardProps {
  courseId: string;
  title: string;
  participantsCount: number;
  rating: number;
  estimatedHoursNeeded: number;
  difficulty: CourseDifficulty;
  tags: CourseTag[];
  author: User;
}

const CourseCard: FC<CourseCardProps> = ({
  courseId,
  title,
  participantsCount,
  rating,
  estimatedHoursNeeded,
  difficulty,
  tags,
  author,
}) => {
  const navigate = useNavigate();

  const handleStartClick = useCallback(() => {
    navigate(`/courses/${courseId}`);
  }, [courseId]);

  return (
    <Card maxW="325" minW="325">
      <CardBody p="10px 25px">
        <Stack mt="6" spacing="3">
          <HStack spacing={3}>
            <Tag
              size="md"
              variant="subtle"
              colorScheme={getColorByCourseDifficulty(difficulty)}
            >
              <TagLabel>{getTitleByCourseDifficulty(difficulty)}</TagLabel>
            </Tag>
            <Tag size="md" variant="subtle" colorScheme="blackAlpha">
              <TagLeftIcon boxSize="12px" as={BiHourglass} />
              <TagLabel>{`~${estimatedHoursNeeded} hours`}</TagLabel>
            </Tag>
          </HStack>
          <HStack spacing={3}>
            {tags.map((tag) => (
              <Tag size="md" variant="outline" colorScheme="orange">
                <TagLeftIcon boxSize="12px" as={getIconByTagId(tag.id)} />
                <TagLabel>{tag.title}</TagLabel>
              </Tag>
            ))}
          </HStack>
          <Heading size="md">{title}</Heading>
          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" color="gray.600" fontSize="sm">
              {`${participantsCount} participants | ${rating}/5 rating`}
            </Box>
          </Box>
          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" color="gray.600" fontSize="sm" mr="10px">
              {`By: ${author.userName}`}
            </Box>
            <Avatar
              src="https://bit.ly/sage-adebayo"
              size="xs"
              name="ArnasTam"
              ml={-1}
              mr={2}
            />
          </Box>
        </Stack>
      </CardBody>
      <Box m="10px 25px 20px 25px">
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="orange"
            onClick={handleStartClick}
          >
            Start
          </Button>
          <Button variant="ghost" colorScheme="orange">
            Details
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

export default CourseCard;
