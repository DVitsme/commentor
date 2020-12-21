import React from 'react';
import { Heading, Box, Button, Text } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Box
      width="100%"
      backgroundColor="white"
      borderRadius={8}
      height="100%"
      p={8}
    >
      <Heading size="md">Get feedback on your site instantly</Heading>
      <Text>Start today, then grow with us</Text>
      <Button>Upgrade to Starter</Button>
    </Box>
  </DashboardShell>
);

export default FreePlanEmptyState;
