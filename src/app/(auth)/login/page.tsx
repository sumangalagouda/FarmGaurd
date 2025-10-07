'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LoginClient = dynamic(() => import('./LoginClient'));

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-lg font-semibold text-primary">Loading Login Page...</div>}>
      <LoginClient />
    </Suspense>
  );
}
