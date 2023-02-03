import React, { FC } from 'react';
import { Flex, Center, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface NavDrawerItemProps {
  path: string;
  title: string;
  Icon: React.ElementType;
}

const NavDrawerItem: FC<NavDrawerItemProps> = ({ path, title, Icon }) => (
  <Link to={path}>
    <Flex gap="20px">
      <Center>
        <Icon size="25px" />
      </Center>
      <Text fontWeight="300">{title}</Text>
    </Flex>
  </Link>
);

export default NavDrawerItem;
