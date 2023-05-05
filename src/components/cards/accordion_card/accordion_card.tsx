import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Heading,
} from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import React, { FC } from 'react';

interface AccordionCardProps {
  title?: string;
  isExpandable?: boolean;
  children: React.ReactNode;
}
const AccordionCard: FC<AccordionCardProps> = ({
  title,
  children,
  isExpandable = true,
}) =>
  isExpandable ? (
    <Card>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size="md">{title}</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{children}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  ) : (
    <Card>
      <Box as="span" flex="1" textAlign="left" p="8px 16px">
        <Heading size="md">{title}</Heading>
      </Box>
      <Box p="8px 16px 16px">{children}</Box>
    </Card>
  );
export default AccordionCard;
