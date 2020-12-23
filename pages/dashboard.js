import { auth } from 'firebase';
import { useAuth } from '../lib/auth';
import { Text, Button, ButtonGroup, Icon, Flex } from '@chakra-ui/react';
import { DiTerminal } from 'react-icons/di';
import { Head } from 'next/head';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';

export default function Dashboard() {
  const auth = useAuth();
  if (!auth.user) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <EmptyState />;
    </DashboardShell>
  );
}
