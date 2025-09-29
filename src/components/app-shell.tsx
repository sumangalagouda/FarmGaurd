
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
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { placeholderImageMap } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/farm-setup', label: 'Farm Setup', icon: Warehouse },
  { href: '/disease-prediction', label: 'Disease Prediction', icon: Stethoscope },
  { href: '/health-calendar', label: 'Health Calendar', icon: CalendarDays },
  { href: '/market-insights', label: 'Market Insights', icon: LineChart },
  { href: '/community-forum', label: 'Community', icon: MessageSquare },
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
            <SidebarMenuItem>
              <div className="flex items-center gap-3 p-2">
                <Avatar>
                  <AvatarImage src={farmerAvatar.imageUrl} data-ai-hint={farmerAvatar.imageHint} />
                  <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="font-semibold text-sm">{user?.displayName || 'Farmer Name'}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.phoneNumber}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="shrink-0">
                    <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden"/>
            <h2 className="text-lg font-semibold capitalize font-headline">
              {menuItems.find(item => item.href === pathname)?.label || pathname.split('/').pop()?.replace('-', ' ')}
            </h2>
          </div>
          <Button>+ Add Health Log</Button>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
