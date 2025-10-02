
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine the active tab from the URL
  const activeTab = pathname.includes('sell-buy') ? 'sell-buy' : 'market-insights';

  const handleTabChange = (value: string) => {
    router.push(`/market/${value}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md">
        <TabsTrigger value="market-insights">Market Insights</TabsTrigger>
        <TabsTrigger value="sell-buy">Sell/Buy</TabsTrigger>
      </TabsList>
      <div className="mt-4">
        {children}
      </div>
    </Tabs>
  );
}
