import React, { FC, useMemo } from 'react';
import { Box, Center, Flex, Heading, Spinner, Divider } from '@chakra-ui/react';
import NavBar from 'src/components/nav/nav_bar/nav_bar';

interface PageWrapperProps {
  bannerContent?: React.ReactNode;
  contentPaddingEnabled?: boolean;
  title?: string;
  isLoading?: boolean;
  isError?: boolean;
  children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({
  bannerContent,
  title,
  contentPaddingEnabled = true,
  isError = false,
  isLoading = false,
  children,
}) => {
  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Center h="80vh" color="green">
          <Spinner size="xl" />
        </Center>
      );
    }

    if (isError) {
      return (
        <Center h="80vh" color="green">
          <Spinner size="xl" />
        </Center>
      );
    }

    return children;
  }, [isLoading, isError, children]);

  return (
    <>
      <NavBar />
      {bannerContent ? (
        <Flex position="sticky" top="80px" zIndex={50}>
          <Center backgroundColor="green.500" p="10px" w="100%" color="white">
            {bannerContent}
          </Center>
        </Flex>
      ) : (
        <></>
      )}
      <Box p={contentPaddingEnabled ? '25px' : '0px'}>
        {title && (
          <>
            <Heading fontSize="25px" pl="15px" color="lightgrey">
              {title}
            </Heading>
            <Divider mb="20px" mt="5px" />
          </>
        )}
        {content}
      </Box>
    </>
  );
};

export default PageWrapper;
