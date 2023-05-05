import {
  Avatar,
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
  useDisclosure,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback } from 'react';
import { RiDeleteBin6Fill, RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import useCreateCourseProgressMutation from 'src/hooks/mutations/course_progress_mutations';
import User from 'src/models/user';
import Difficulty from 'src/types/course_difficulty';
import {
  getColorByCourseDifficulty,
  getTitleByCourseDifficulty,
} from 'src/utils/course_difficuly_util';

interface ChallengeCardProps {
  challengeId: string;
  title: string;
  difficulty: Difficulty;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  author: User;
}

const ChallengeCard: FC<ChallengeCardProps> = ({
  challengeId,
  title,
  difficulty,
  onDelete,
  onEdit,
  author,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createCourseProgressMutation = useCreateCourseProgressMutation();
  const navigate = useNavigate();

  const handleSolveClick = useCallback(() => {
    navigate(`/challenges/${challengeId}`);
  }, [challengeId]);

  return (
    <>
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
            </HStack>
            <Heading size="md">{title}</Heading>
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
                  onClick={() => (onEdit ? onEdit(challengeId) : null)}
                >
                  <RiEditBoxFill />
                </Button>
              )}
              <Button
                variant="solid"
                backgroundColor="black"
                color="white"
                isLoading={createCourseProgressMutation.isLoading}
                onClick={handleSolveClick}
              >
                Solve
              </Button>
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
              {`Are you sure you want to delete the challenge "${title}"? This action cannot be undone.`}
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
                onClick={() => (onDelete ? onDelete(challengeId) : null)}
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

export default ChallengeCard;
