import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import NavBar from 'src/components/nav/nav_bar/nav_bar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <>
    <NavBar />
    <Box>{children}</Box>
  </>
);
export default PageLayout;
