import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  useDisclosure,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback } from 'react';
import { BiHourglass } from 'react-icons/bi';
import { RiDeleteBin6Fill, RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import useCreateCourseProgressMutation from 'src/hooks/mutations/course_progress_mutations';
import { CourseProgressStatus } from 'src/models/course_progress';
import CourseTag from 'src/models/course_tag';
import User from 'src/models/user';
import Difficulty from 'src/types/course_difficulty';
import {
  getColorByCourseDifficulty,
  getTitleByCourseDifficulty,
} from 'src/utils/course_difficuly_util';
import { getIconByTag } from 'src/utils/tag_icon_util';

interface CourseCardProps {
  courseId: string;
  title: string;
  participantsCount: number;
  estimatedHoursNeeded: number;
  difficulty: Difficulty;
  status?: CourseProgressStatus;
  tags: CourseTag[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  author: User;
  showComplexityBar?: boolean;
  showStartButton?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({
  courseId,
  title,
  participantsCount,
  estimatedHoursNeeded,
  difficulty,
  status,
  onDelete,
  onEdit,
  tags,
  author,
  showStartButton = false,
  showComplexityBar = true,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createCourseProgressMutation = useCreateCourseProgressMutation();
  const { user: currentUser } = useAuth0();
  const navigate = useNavigate();

  const handleDetailsClick = useCallback(() => {
    navigate(`/courses/${courseId}`);
  }, [courseId]);

  const handleStartClick = useCallback(() => {
    if (currentUser?.sub) {
      createCourseProgressMutation
        .mutateAsync({
          courseId,
          userId: currentUser?.sub,
        })
        .then(() => navigate(`/courses/${courseId}`));
    }
  }, [courseId]);

  return (
    <>
      <Card maxW="325" minW="325">
        <CardBody p="10px 25px">
          <Stack mt="6" spacing="3">
            <Flex>
              {status === CourseProgressStatus.COMPLETED && (
                <Badge colorScheme="purple">COMPLETED</Badge>
              )}
              {status === CourseProgressStatus.IN_PROGRESS && (
                <Badge colorScheme="green">IN PROGRESS</Badge>
              )}
            </Flex>
            {showComplexityBar && (
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
            )}
            <HStack spacing={3}>
              {tags.map((tag) => (
                <Tag
                  key={tag.id}
                  size="md"
                  variant="outline"
                  colorScheme="green"
                >
                  {getIconByTag(tag.title) && (
                    <TagLeftIcon boxSize="12px" as={getIconByTag(tag.title)} />
                  )}
                  <TagLabel>{tag.title}</TagLabel>
                </Tag>
              ))}
            </HStack>
            <Heading size="md">{title}</Heading>
            <Box display="flex" mt="2" alignItems="center">
              <Box as="span" color="gray.600" fontSize="sm">
                {`${participantsCount} participants`}
              </Box>
            </Box>
            <Box display="flex" mt="2" alignItems="center">
              <Box
                as="span"
                color="gray.600"
                fontSize="sm"
                mr="10px"
                maxW="90%"
              >
                {`By:${author.email}`}
              </Box>
              <Avatar src={author.picture} size="xs" ml={-1} mr={2} />
            </Box>
          </Stack>
        </CardBody>
        <Box m="10px 25px 20px 25px">
          <Flex direction="row-reverse">
            <ButtonGroup spacing="2">
              {onDelete && (
                <Button
                  fontSize="20px"
                  color="grey"
                  backgroundColor="white"
                  onClick={onOpen}
                >
                  <RiDeleteBin6Fill />
                </Button>
              )}
              {onEdit && (
                <Button
                  fontSize="20px"
                  color="grey"
                  backgroundColor="white"
                  onClick={() => (onEdit ? onEdit(courseId) : null)}
                >
                  <RiEditBoxFill />
                </Button>
              )}
              <Button
                variant="ghost"
                colorScheme="black"
                backgroundColor="gray.100"
                onClick={handleDetailsClick}
              >
                Details
              </Button>
              {showStartButton && (
                <Button
                  variant="solid"
                  backgroundColor="black"
                  color="white"
                  isLoading={createCourseProgressMutation.isLoading}
                  onClick={handleStartClick}
                >
                  Start
                </Button>
              )}
            </ButtonGroup>
          </Flex>
        </Box>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <Center>
          <ModalContent mt="20%">
            <ModalHeader>{`Delete ${title}`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {`Are you sure you want to delete the course "${title}"? This action cannot be undone.`}
            </ModalBody>

            <ModalFooter gap="10px">
              <Button
                variant="ghost"
                colorScheme="black"
                backgroundColor="gray.100"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                color="white"
                backgroundColor="red.500"
                onClick={() => (onDelete ? onDelete(courseId) : null)}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Center>
      </Modal>
    </>
  );
};

export default CourseCard;
