
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LogOut,
  Globe,
  Shield,
  Menu,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/theme-toggle';
import { Footer } from './footer';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const primaryMenuItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/farm-setup', label: 'Farm Setup' },
  { href: '/disease-prediction', label: 'Disease Prediction' },
  { href: '/health-calendar', label: 'Health Calendar' },
  {
    label: 'Market',
    children: [
      { href: '/market/market-insights', label: 'Market Insights' },
      { href: '/market/sell-buy', label: 'Sell/Buy' },
    ],
  },
  { href: '/leaderboard', label: 'LeaderBoard' },
  { href: '/outbreak-reporting', label: 'Outbreak Reporting' },
  { href: '/weather-forecast', label: 'Weather' },
  { href: '/learning-modules', label: 'Learning' },
  {
    label: 'Schemes & Guidelines',
    children: [
      { href: '/government-schemes', label: 'Government Schemes' },
      { href: '/guidelines', label: 'Guidelines' },
    ],
  },
];

const secondaryMenuItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/service', label: 'Service' },
  { href: '/contact', label: 'Contact' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  const isMarketPage = pathname.startsWith('/market');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center gap-4">
             <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0">
                  <div className="flex flex-col gap-4">
                    <Link href="/dashboard" className="font-bold text-lg flex items-center gap-2" onClick={() => setOpen(false)}>
                        <Shield /> FarmGaurd
                    </Link>
                    <nav className="grid gap-2 text-base font-medium">
                       {primaryMenuItems.map(item => (
                         'children' in item ? (
                            <div key={item.label} className="flex flex-col items-start gap-1">
                              <span className="flex items-center gap-4 px-2.5 text-muted-foreground">{item.label}</span>
                              <div className="grid gap-1 pl-6">
                                {item.children.map(child => (
                                   <Link 
                                    key={child.href} 
                                    href={child.href} 
                                    className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", pathname === child.href && "text-foreground bg-accent")}
                                    onClick={() => setOpen(false)}>
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                         ) : (
                          <Link 
                            key={item.href} 
                            href={item.href} 
                            className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", pathname === item.href && "text-foreground bg-accent")}
                            onClick={() => setOpen(false)}>
                            {item.label}
                          </Link>
                         )
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
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
            <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md hidden sm:flex">
                <LogOut className="mr-2 h-4 w-4"/>
                Log Out
            </Button>
             <Button onClick={handleLogout} variant="ghost" size="icon" className="sm:hidden">
                <LogOut className="h-5 w-5"/>
            </Button>
          </div>
        </div>
      </header>

      <div className="bg-secondary-nav text-secondary-nav-foreground shadow-md hidden md:block overflow-x-auto">
        <div className="container flex items-center justify-center h-12">
            <div className="flex items-center space-x-6 text-sm font-medium">
                {primaryMenuItems.map(item => (
                     'children' in item ? (
                        <DropdownMenu key={item.label}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className={cn("text-sm font-medium hover:underline p-0 h-auto data-[state=open]:underline", ((item.label === 'Market' && isMarketPage) || (item.label === 'Schemes & Guidelines' && (pathname.startsWith('/government-schemes') || pathname.startsWith('/guidelines')))) && "font-bold underline")}>
                                    {item.label}
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {item.children.map(child => (
                                    <DropdownMenuItem key={child.href} asChild>
                                        <Link href={child.href}>{child.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                       <Link 
                        key={item.href} 
                        href={item.href} 
                        className={cn("whitespace-nowrap hover:underline", (pathname === item.href) ? "font-bold underline" : "")}>
                        {item.label}
                    </Link>
                    )
                ))}
            </div>
        </div>
      </div>


      <div className="flex-1">
        <main className="p-4 md:p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
