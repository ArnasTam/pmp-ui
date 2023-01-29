import { Center, Flex, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import NavDrawer from 'src/components/nav/nav_drawer/nav_drawer';
import UserMenu from 'src/components/user_menu/user_menu';

import './nav_bar.scss';

const NavBar: FC = () => (
  <Flex className="nav-bar">
    <Center>
      <NavDrawer />
    </Center>
    <Center w="100%">
      <Link to="/">
        <Heading as="h1" size="xl">
          App
        </Heading>
      </Link>
    </Center>
    <Center>
      <UserMenu />
    </Center>
  </Flex>
);

export default NavBar;
