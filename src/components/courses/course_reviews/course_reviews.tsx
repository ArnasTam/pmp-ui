import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Card,
  Input,
  Text,
  InputGroup,
  InputLeftAddon,
  Flex,
  Avatar,
  Center,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useDisclosure,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback, useState } from 'react';
import {
  RiDeleteBin6Fill,
  RiEditBoxFill,
  RiSendPlaneFill,
} from 'react-icons/ri';
import {
  useCreateCourseReviewMutation,
  useDeleteCourseReviewMutation,
  useUpdateCourseReviewMutation,
} from 'src/hooks/mutations/course_reviews_mutations';
import useGetCourseReviewsQuery from 'src/hooks/queries/course_reviews_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

interface CourseReviewsProps {
  courseId: string;
}

const CourseReviews: FC<CourseReviewsProps> = ({ courseId }) => {
  const {
    isOpen: deleteIsOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const { user: currentUser } = useAuth0();
  const [reviewContent, setReviewContent] = useState('');
  const [editReviewContent, setEditReviewContent] = useState('');
  const [editReviewId, setEditReviewId] = useState('');
  const [deleteReviewId, setDeleteReviewId] = useState('');

  const createCourseReviewMutation = useCreateCourseReviewMutation();
  const updateCourseReviewMutation = useUpdateCourseReviewMutation();
  const deleteCourseReviewMutation = useDeleteCourseReviewMutation();

  const {
    data: reviews,
    refetch: refetchReviews,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
  } = useGetCourseReviewsQuery(courseId);

  const handlePostClick = useCallback(() => {
    createCourseReviewMutation
      .mutateAsync({ courseId, content: reviewContent })
      .then(() => {
        refetchReviews().then();
      });
  }, [reviewContent, createCourseReviewMutation]);

  const handleEditSaveClick = useCallback(() => {
    updateCourseReviewMutation
      .mutateAsync({
        id: editReviewId,
        review: { content: editReviewContent },
      })
      .then(() => {
        refetchReviews().then();
      });
  }, [editReviewContent, updateCourseReviewMutation, editReviewId]);

  const handleDeleteClick = useCallback(() => {
    deleteCourseReviewMutation.mutateAsync(deleteReviewId).then(() => {
      refetchReviews().then();
    });
  }, [deleteCourseReviewMutation, deleteReviewId]);

  const handleReviewContentChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setReviewContent(e.target.value);
    },
    [setReviewContent],
  );

  const handleEditReviewContentChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setEditReviewContent(e.target.value);
    },
    [setEditReviewContent],
  );

  const isReviewContentValid = useCallback(
    (content: string) => content.length <= 200,
    [],
  );

  const showOptions = useCallback(
    (authorId: string) => authorId === currentUser?.sub,
    [],
  );

  if (reviewsIsLoading) {
    return <LoadingView />;
  }

  if (reviewsIsError) {
    return <ErrorView />;
  }

  return (
    <Box>
      <InputGroup>
        <InputLeftAddon>New Review</InputLeftAddon>
        <Input
          placeholder="Content"
          isInvalid={!isReviewContentValid(reviewContent)}
          value={reviewContent}
          onChange={handleReviewContentChange}
        />
        <Button
          leftIcon={<RiSendPlaneFill />}
          isDisabled={
            !isReviewContentValid(reviewContent) || reviewContent.length === 0
          }
          onClick={handlePostClick}
          w="120px"
        >
          Post
        </Button>
      </InputGroup>
      <Box>
        {reviews?.map((review) => (
          <Card
            mt="15px"
            p="15px"
            pt={0}
            key={review.id}
            borderLeft="grey 5px solid"
          >
            <Flex direction="row-reverse" h="35px">
              {showOptions(review.author.id) && (
                <>
                  <Button
                    fontSize="20px"
                    color="grey"
                    backgroundColor="white"
                    onClick={() => {
                      setDeleteReviewId(review.id);
                      onDeleteOpen();
                    }}
                  >
                    <RiDeleteBin6Fill />
                  </Button>
                  <Button
                    fontSize="20px"
                    color="grey"
                    backgroundColor="white"
                    onClick={() => {
                      setEditReviewId(review.id);
                      setEditReviewContent(review.content);
                      onEditOpen();
                    }}
                  >
                    <RiEditBoxFill />
                  </Button>
                </>
              )}
            </Flex>
            <Text color="gray.900">{review.content}</Text>
            <Flex direction="row-reverse">
              <Center>
                <Text fontSize="12px" color="gray.600" fontWeight="bold">
                  {`${review.author.email}`}
                </Text>
              </Center>
              <Center>
                <Avatar src={review.author.picture} size="xs" ml={-1} mr={2} />
              </Center>
            </Flex>
          </Card>
        ))}
      </Box>
      <Modal isOpen={editIsOpen} onClose={onEditClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <Center>
          <ModalContent mt="20%">
            <ModalHeader>{'Edit Review'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Content"
                isInvalid={!isReviewContentValid(editReviewContent)}
                value={editReviewContent}
                onChange={handleEditReviewContentChange}
              />
            </ModalBody>

            <ModalFooter gap="10px">
              <Button
                variant="ghost"
                colorScheme="black"
                backgroundColor="gray.100"
                onClick={onEditClose}
              >
                Cancel
              </Button>
              <Button
                color="white"
                backgroundColor="green.500"
                onClick={() => {
                  handleEditSaveClick();
                  onEditClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Center>
      </Modal>
      <Modal isOpen={deleteIsOpen} onClose={onDeleteClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <Center>
          <ModalContent mt="20%">
            <ModalHeader>{'Delete Review'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {
                'Are you sure you want to delete the review? This action cannot be undone.'
              }
            </ModalBody>

            <ModalFooter gap="10px">
              <Button
                variant="ghost"
                colorScheme="black"
                backgroundColor="gray.100"
                onClick={onDeleteClose}
              >
                Cancel
              </Button>
              <Button
                color="white"
                backgroundColor="red.500"
                onClick={() => {
                  handleDeleteClick();
                  onDeleteClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Center>
      </Modal>
    </Box>
  );
};

export default CourseReviews;
