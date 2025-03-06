// File: components/dashboard/sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  BarChart,
  Settings,
  Plus,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  variant: 'default' | 'ghost';
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [studySetsOpen, setStudySetsOpen] = useState(true);
  
  // This would come from an API call in a real app
  const studySets = [
    { id: '1', title: 'React Fundamentals' },
    { id: '2', title: 'Spanish Vocabulary' },
    { id: '3', title: 'Biology 101' },
  ];

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r bg-background">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Revu</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 pt-3">
        <nav className="px-2 space-y-1">
          <SidebarNavLink
            href="/dashboard"
            title="Dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            variant={pathname === '/dashboard' ? 'default' : 'ghost'}
          />
          
          <Collapsible open={studySetsOpen} onOpenChange={setStudySetsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between font-normal px-3"
              >
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>Study Sets</span>
                </div>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform", 
                    studySetsOpen ? "transform rotate-180" : ""
                  )} 
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 space-y-1 pt-1">
              {studySets.map((set) => (
                <SidebarNavLink
                  key={set.id}
                  href={`/study-sets/${set.id}`}
                  title={set.title}
                  variant={pathname === `/study-sets/${set.id}` ? 'default' : 'ghost'}
                  className="ml-6 text-sm"
                />
              ))}
              <Link href="/study-sets/create">
                <Button variant="ghost" className="w-full justify-start px-3 py-2 ml-6 text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Create New</span>
                </Button>
              </Link>
            </CollapsibleContent>
          </Collapsible>
          
          <SidebarNavLink
            href="/stats"
            title="Statistics"
            icon={<BarChart className="h-5 w-5" />}
            variant={pathname === '/stats' ? 'default' : 'ghost'}
          />
          
          <SidebarNavLink
            href="/settings"
            title="Settings"
            icon={<Settings className="h-5 w-5" />}
            variant={pathname === '/settings' ? 'default' : 'ghost'}
          />
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="h-5 w-5 mr-2" />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  );
}

interface SidebarNavLinkProps extends SidebarItem {
  className?: string;
}

function SidebarNavLink({
  href,
  title,
  icon,
  variant,
  className,
}: SidebarNavLinkProps) {
  return (
    <Link href={href} className={cn(className)}>
      <Button 
        variant={variant} 
        className="w-full justify-start px-3 py-2"
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{title}</span>
      </Button>
    </Link>
  );
}
