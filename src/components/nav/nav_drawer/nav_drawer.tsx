import React, { FC } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Flex,
  Center,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';

import './nav_drawer.scss';

const NavDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        aria-label="menu-button"
        display="contents"
        ref={btnRef}
        onClick={onOpen}
      >
        <HamburgerIcon w="7" h="7" />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody className="drawer-body">
            <Link to="/">
              <Flex gap="20px">
                <Center>
                  <RiHome2Line size="25px" />
                </Center>
                <Text fontWeight="300">Home</Text>
              </Flex>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
