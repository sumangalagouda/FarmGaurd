
'use client';
import favicon from '../../public/favicon.jpg';
import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LogOut,
  Globe,
  Shield,
  Menu,
  ChevronDown,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from './theme-toggle';
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
import { useTranslation } from '@/hooks/use-translation';

const farmerPrimaryMenuItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/disease-prediction', label: 'Disease Prediction' },
  { href: '/health-calendar', label: 'Health Calendar' },
  {
    label: 'Market',
    children: [
      { href: '/market/market-insights', label: 'Market Insights' },
      { href: '/market/sell-buy', label: 'FarmMart' },
    ],
  },
  { href: '/leaderboard', label: 'LeaderBoard' },
  { href: '/outbreak-reporting', label: 'Outbreak Reporting' },
  { href: '/weather-forecast', label: 'Weather' },
  { href: '/learning-modules', label: 'Learning' },
  {
    label: 'More',
    children: [
      { href: '/government-schemes', label: 'Government Schemes' },
      { href: '/guidelines', label: 'Farming Guidelines' },
      { href: '/help', label: 'Help' },
    ],
  },
];

const companyPrimaryMenuItems = [
    { href: '/market/market-insights', label: 'Market Insights' },
    { href: '/market/sell-buy', label: 'FarmMart' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/learning-modules', label: 'Top Performers' },
];

const veterinarianPrimaryMenuItems = [
    { href: '/outbreak-alerts', label: 'Outbreak Alerts' },
    { href: '/farmer-reports', label: 'Farmer Reports' },
    { href: '/share-resources', label: 'Share Resources' },
    { href: '/guidelines', label: 'Biosecurity Guidelines' },
]

const secondaryMenuItems = [
  { translationKey: 'navHome', href: '/' },
  { translationKey: 'navAbout', href: '/about' },
  { translationKey: 'navService', href: '/service' },
  { translationKey: 'navContact', href: '/contact' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t, setLanguage } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  const isCompany = user?.role === 'company';
  const isVeterinarian = user?.role === 'veterinarian';
  
  const primaryMenuItems = isCompany 
    ? companyPrimaryMenuItems 
    : isVeterinarian
    ? veterinarianPrimaryMenuItems
    : farmerPrimaryMenuItems;

  const profileLink = isCompany ? '/company-profile' : isVeterinarian ? '/veterinarian-profile' : '/farm-setup';
  const homeLink = isCompany ? '/leaderboard' : '/dashboard';

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
                    <Link href={homeLink} className="font-bold text-lg flex items-center gap-2" onClick={() => setOpen(false)}>
                        <Shield /> 
                        FarmGuard
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
            <Link href={homeLink} className="font-bold text-lg flex items-center gap-2">
                <Shield /> FarmGuard
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {secondaryMenuItems.map(item => (
                <Link key={item.href} href={item.href} className="hover:underline">{t[item.translationKey as keyof typeof t]}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>Hindi</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('kn')}>Kannada</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />

            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href={profileLink}>
                  <User className="mr-2 h-4 w-4"/>
                  Profile
              </Link>
            </Button>
             <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md hidden sm:flex">
                <LogOut className="mr-2 h-4 w-4"/>
                Log Out
            </Button>

            <Button asChild variant="ghost" size="icon" className="sm:hidden">
              <Link href={profileLink}><User className="h-5 w-5"/></Link>
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
                                <Button variant="ghost" className={cn("text-sm font-medium hover:underline p-0 h-auto data-[state=open]:underline", item.children.some(c => pathname.startsWith(c.href)) && "font-bold underline")}>
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
                        className={cn("whitespace-nowrap hover:underline", (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) ? "font-bold underline" : "")}>
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
