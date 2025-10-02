

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Warehouse,
  Stethoscope,
  CalendarDays,
  LineChart,
  MessageSquare,
  LifeBuoy,
  Cog,
  Shield,
  LogOut,
  Globe,
  Siren,
  Thermometer,
  Award,
  BookOpen,
  Landmark,
  Home,
  Info,
  ConciergeBell,
  Contact,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/theme-toggle';
import { Footer } from './footer';
import { cn } from '@/lib/utils';

const primaryMenuItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/farm-setup', label: 'Farm Setup' },
  { href: '/disease-prediction', label: 'Disease Prediction' },
  { href: '/health-calendar', label: 'Health Calendar' },
  { href: '/market-insights', label: 'Market Insights' },
  { href: '/leaderboard', label: 'LeaderBoard' },
  { href: '/community-forum', label: 'Community' },
  { href: '/outbreak-reporting', label: 'Outbreak Reporting' },
  { href: '/weather-forecast', label: 'Weather' },
  { href: '/learning-modules', label: 'Learning' },
  { href: '/government-schemes', label: 'Government Schemes' },
];

const secondaryMenuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/service', label: 'Service', icon: ConciergeBell },
  { href: '/contact', label: 'Contact', icon: Contact },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center gap-4">
            <Link href="/dashboard" className="font-bold text-lg flex items-center gap-2">
                <Shield /> FarmGaurd
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {secondaryMenuItems.map(item => (
                <Link key={item.href} href={item.href} className="hover:underline">{item.label}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                <LogOut className="mr-2 h-4 w-4"/>
                Log Out
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-secondary-nav text-secondary-nav-foreground shadow-md">
        <div className="container flex items-center justify-center h-12 overflow-x-auto">
            <div className="flex items-center space-x-6 text-sm font-medium">
                {primaryMenuItems.map(item => (
                    <Link 
                        key={item.href} 
                        href={item.href} 
                        className={cn("whitespace-nowrap hover:underline", pathname === item.href ? "font-bold underline" : "")}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
      </nav>

      <div className="flex-1">
        <main className="p-4 md:p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
