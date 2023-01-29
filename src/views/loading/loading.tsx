import React, { FC } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const Loading: FC = () => (
  <Center h="100vh" color="green">
    <Spinner size="xl" />
  </Center>
);

export default Loading;
