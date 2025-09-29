
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
    // We want to allow access to /setup for logged in users to complete registration
    if (!loading && !user && window.location.pathname !== '/setup') {
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
  
  // If user is not present and they are not on the setup page,
  // we redirect, so we can show a loading state until redirect happens.
  if (!user && typeof window !== 'undefined' && window.location.pathname !== '/setup') {
     return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Redirecting to login...</div>
      </div>
    );
  }

  // Allow access to /setup page even if user is not fully logged in.
  if (typeof window !== 'undefined' && window.location.pathname === '/setup') {
      return <>{children}</>;
  }
  
  if (!user) {
    // This should ideally not be reached due to the useEffect redirect,
    // but it's a fallback.
     return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Redirecting to login...</div>
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
