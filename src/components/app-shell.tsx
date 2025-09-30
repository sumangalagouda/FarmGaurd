

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
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
  User,
  Siren,
  Thermometer,
  Award,
  BookOpen,
  Landmark,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { placeholderImageMap } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/theme-toggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem } from '@/components/ui/menubar';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/farm-setup', label: 'Farm Setup', icon: Warehouse },
  { href: '/disease-prediction', label: 'Disease Prediction', icon: Stethoscope },
  { href: '/health-calendar', label: 'Health Calendar', icon: CalendarDays },
  { href: '/market-insights', label: 'Market Insights', icon: LineChart },
  { href: '/leaderboard', label: 'Leaderboard', icon: Award },
  { href: '/community-forum', label: 'Community', icon: MessageSquare },
  { href: '/outbreak-reporting', label: 'Outbreak Reporting', icon: Siren },
  { href: '/weather-forecast', label: 'Weather', icon: Thermometer },
  { href: '/learning-modules', label: 'Learning', icon: BookOpen },
  { href: '/government-schemes', label: 'Government Schemes', icon: Landmark },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const farmerAvatar = placeholderImageMap['farmer-avatar'];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold font-headline text-primary-foreground/90">FarmGuard</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/settings'}>
                <Link href="/settings">
                  <Cog />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/help'}>
                <Link href="/help">
                  <LifeBuoy />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden"/>
            <div className="hidden md:flex">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Menu</MenubarTrigger>
                  <MenubarContent>
                    {menuItems.map((item) => (
                      <MenubarItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <h2 className="text-lg font-semibold capitalize font-headline md:hidden">
              {menuItems.find(item => item.href === pathname)?.label || pathname.split('/').pop()?.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={farmerAvatar.imageUrl} data-ai-hint={farmerAvatar.imageHint} alt={user?.displayName || "User Avatar"} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.displayName || 'Farmer Name'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.phoneNumber}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings"><User className="mr-2 h-4 w-4" /><span>Profile</span></Link>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
