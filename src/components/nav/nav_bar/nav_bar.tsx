import { Center, Flex, Heading, Spacer } from '@chakra-ui/react';
import React, { FC } from 'react';
import NavDrawer from 'src/components/nav/nav_drawer/nav_drawer';
import UserMenu from 'src/components/user_menu/user_menu';

import './nav_bar.scss';

const NavBar: FC = () => (
  <Flex
    as="header"
    className="nav-bar"
    backgroundColor="black"
    position="sticky"
    top="0"
    zIndex="100"
    w="100%"
    height="80px"
  >
    <Center>
      <NavDrawer />
    </Center>
    <Center>
      <Heading as="h1" size="xl" color="white">
        PMP.
      </Heading>
    </Center>
    <Spacer />
    <Center>
      <UserMenu />
    </Center>
  </Flex>
);

export default NavBar;
