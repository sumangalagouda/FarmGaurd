
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MarketPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default tab
    router.replace('/market/market-insights');
  }, [router]);

  // Render nothing or a loader while redirecting
  return null;
}
