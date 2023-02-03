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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  RiBookFill,
  RiFilePaper2Fill,
  RiHome2Fill,
  RiTrophyFill,
} from 'react-icons/ri';
import NavDrawerItem from 'src/components/nav/nav_drawer_item/nav_drawer_item';

import './nav_drawer.scss';

const NavDrawer: FC = () => {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <NavDrawerItem title="Home" path="/" Icon={RiHome2Fill} />
            <NavDrawerItem title="Courses" path="/courses" Icon={RiBookFill} />
            <NavDrawerItem
              title="Challenges"
              path="/challenges"
              Icon={RiTrophyFill}
            />
            <NavDrawerItem
              title="Exams"
              path="/exams"
              Icon={RiFilePaper2Fill}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
