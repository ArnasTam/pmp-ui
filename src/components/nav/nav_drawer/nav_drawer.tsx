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
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { RiBookFill, RiSettings2Fill, RiTrophyFill } from 'react-icons/ri';
import NavDrawerItem, {
  NavDrawerSubItem,
} from 'src/components/nav/nav_drawer_item/nav_drawer_item';
import { useAuthStore, UserRole } from 'src/providers/use_auth_store';

import './nav_drawer.scss';

const NavDrawer: FC = () => {
  const { role } = useAuthStore();
  const toast = useToast();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="menu-button"
        display="contents"
        ref={btnRef}
        onClick={() => {
          toast.closeAll();
          onOpen();
        }}
        color="white"
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
            <NavDrawerItem title="Courses" path="/courses" Icon={RiBookFill} />
            <NavDrawerSubItem title="All Courses" path="/courses" />
            <NavDrawerSubItem title="Owned Courses" path="/courses/owned" />
            <NavDrawerSubItem
              title="Enrolled Courses"
              path="/courses/enrolled"
            />
            <NavDrawerSubItem
              title="Create New Course"
              path="/courses/create-new"
            />
            <NavDrawerItem
              title="Challenges"
              path="/challenges"
              Icon={RiTrophyFill}
            />
            <NavDrawerSubItem title="All Challenges" path="/challenges" />
            <NavDrawerSubItem
              title="Owned Challenges"
              path="/challenges/owned"
            />
            <NavDrawerSubItem
              title="Create New Challenge"
              path="/challenges/create-new"
            />
            {role === UserRole.ADMIN && (
              <NavDrawerItem
                title="Code Languages"
                path="/code-languages"
                Icon={RiSettings2Fill}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
