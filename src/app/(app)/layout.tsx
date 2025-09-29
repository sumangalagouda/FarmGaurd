
'use client';
import { AppShell } from '@/components/app-shell';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      !user &&
      typeof window !== 'undefined' &&
      window.location.pathname !== '/setup'
    ) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined' && window.location.pathname === '/setup') {
      return <>{children}</>;
    }
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Redirecting to login...</div>
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
