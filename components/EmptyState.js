import React from 'react';
import { Heading, Box, Button, Text, Flex } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
  <Flex
    width="100%"
    backgroundColor="white"
    borderRadius={8}
    justifyContent="center"
    align="center"
    direction="column"
    p={16}
  >
    <Heading size="md" mb={4}>
      You haven't added any sites yet.
    </Heading>
    <Text mb={6}>Welcome lets get started.</Text>
    <AddSiteModal />
  </Flex>
);

export default EmptyState;
