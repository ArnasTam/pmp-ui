import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC, useCallback, useState } from 'react';
import { RiDeleteBin6Fill, RiEditBoxFill } from 'react-icons/ri';
import PageWrapper from 'src/components/page_layout/page_layout';
import {
  useCreateCodeLanguageMutation,
  useDeleteCodeLanguageMutation,
  useUpdateCodeLanguageMutation,
} from 'src/hooks/mutations/code_languages_mutations';
import useGetCodeLanguagesQuery from 'src/hooks/queries/code_languages_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const CodeLanguagesPage: FC = () => {
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

  const createCodeLanguageMutation = useCreateCodeLanguageMutation();
  const updateCodeLanguageMutation = useUpdateCodeLanguageMutation();
  const deleteCodeLanguageMutation = useDeleteCodeLanguageMutation();

  const [editContent, setEditContent] = useState({
    id: '',
    title: '',
    compilerId: 0,
  });
  const [deleteId, setDeleteId] = useState('');

  const {
    data: codeLanguages,
    isLoading: codeLanguagesIsLoading,
    isError: codeLanguagesIsError,
    refetch: refetchCodeLanguages,
  } = useGetCodeLanguagesQuery();

  const handleTitleChange = useCallback(
    (e: { target: { value: string } }) => {
      setEditContent({ ...editContent, title: e.target.value });
    },
    [editContent],
  );

  const handleCompilerIdChange = useCallback(
    (valueAsString: string, valueAsNumber: number) => {
      setEditContent({ ...editContent, compilerId: valueAsNumber });
    },
    [editContent],
  );

  const handleSaveClick = useCallback(() => {
    const data = {
      title: editContent.title,
      compilerId: editContent.compilerId,
    };

    if (editContent.id) {
      updateCodeLanguageMutation
        .mutateAsync({
          id: editContent.id,
          codeLanguage: data,
        })
        .then(() => refetchCodeLanguages());
    } else {
      createCodeLanguageMutation
        .mutateAsync(data)
        .then(() => refetchCodeLanguages());
    }
  }, [editContent]);

  const handleDeleteClick = useCallback(() => {
    deleteCodeLanguageMutation
      .mutateAsync(deleteId)
      .then(() => refetchCodeLanguages());
  }, [deleteId]);

  if (codeLanguagesIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (codeLanguagesIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper>
      <Button
        mb="30px"
        fontSize="18px"
        w="100%"
        onClick={() => {
          setEditContent({ title: '', compilerId: 0, id: '' });
          onEditOpen();
        }}
      >
        Add New Language
      </Button>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Compiler ID</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {codeLanguages?.map((language) => (
              <Tr key={language.id}>
                <Td>{language.title}</Td>
                <Td>{language.compilerId}</Td>
                <Td isNumeric>
                  {
                    <>
                      <Button
                        fontSize="20px"
                        color="grey"
                        backgroundColor="white"
                        onClick={() => {
                          setEditContent({ ...language });
                          onEditOpen();
                        }}
                      >
                        <RiEditBoxFill />
                      </Button>
                      <Button
                        fontSize="20px"
                        color="grey"
                        backgroundColor="white"
                        onClick={() => {
                          setDeleteId(language.id);
                          onDeleteOpen();
                        }}
                      >
                        <RiDeleteBin6Fill />
                      </Button>
                    </>
                  }
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={editIsOpen} onClose={onEditClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <Center>
          <ModalContent mt="20%">
            <ModalHeader>
              {`${editContent.id ? 'Edit' : 'Create'} Code Language`}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text pl="5px" fontWeight="bold">
                Title:
              </Text>
              <Input
                mb="20px"
                placeholder="Title"
                value={editContent.title}
                onChange={handleTitleChange}
              />
              <Text pl="5px" fontWeight="bold">
                Compiler Id:
              </Text>
              <NumberInput
                placeholder="Compiler ID"
                value={editContent.compilerId}
                onChange={handleCompilerIdChange}
              >
                <NumberInputField />
              </NumberInput>
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
                  handleSaveClick();
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
            <ModalHeader>{'Delete Code Language'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {
                'Are you sure you want to delete the code language? This action cannot be undone.'
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
    </PageWrapper>
  );
};
export default CodeLanguagesPage;
