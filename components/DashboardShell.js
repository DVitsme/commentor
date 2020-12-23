import React from 'react';
import {
  Flex,
  Stack,
  Icon,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Button,
  Text,
  SkeletonCircle,
} from '@chakra-ui/react';
import { DiTerminal } from 'react-icons/di';
import { useAuth } from '@/lib/auth';

import NextLink from 'next/link';
import AddSiteModal from './AddSiteModal';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  const { user, signOut } = auth;
  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <Stack spacing={4} isInline alignItems="center">
          <Icon as={DiTerminal} color="cyan.500" boxSize="14" />
          <NextLink href="/">
            <Link>Home</Link>
          </NextLink>
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center">
          {user && (
            <Button variant="ghost" mr={2} onClick={() => signOut()}>
              Log Out
            </Button>
          )}
          {user !== null ? (
            <Avatar size="sm" src={user.photoURL} />
          ) : (
            <SkeletonCircle size="9" />
          )}
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} height="90vh">
        <Flex
          maxWidth="800px"
          width="100%"
          ml="auto"
          mr="auto"
          direction="column"
        >
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent="space-between">
            <Heading size="2xl" marginBottom={6}>
              Sites
            </Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
