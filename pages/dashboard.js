import { auth } from 'firebase';
import useSWR from 'swr';

import { useAuth } from '../lib/auth';

import fetcher from '@/utils/fetcher';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';

export default function Dashboard() {
  const auth = useAuth();
  const { data, error } = useSWR('/api/sites', fetcher);

  console.log(data);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
