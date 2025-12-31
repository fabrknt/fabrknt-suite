'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Activity,
  Target,
  Zap,
  X,
  Heart,
  BarChart3,
  ShoppingBag,
} from 'lucide-react';
import { cn } from '@fabrknt/ui';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Activity',
    href: '/dashboard/activity',
    icon: Activity,
  },
  {
    name: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: Target,
  },
  {
    name: 'Conversions',
    href: '/dashboard/conversions',
    icon: Zap,
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-muted border-r border-border transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Header with Close Button */}
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-600" />
              <h1 className="text-xl font-bold text-foreground">TRACE</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-foreground/90 hover:bg-gray-50 hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Suite Switcher */}
          <div className="border-t border-border p-4">
            <div className="text-xs font-medium text-foreground mb-2">Switch App</div>
            <div className="space-y-1">
              <a
                href="http://localhost:3001"
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-1.5 rounded text-xs text-foreground/90 hover:bg-gray-50 transition-colors"
              >
                <Heart className="h-3.5 w-3.5" />
                <span>PULSE</span>
              </a>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded text-xs bg-amber-50 text-amber-700 font-medium">
                <BarChart3 className="h-3.5 w-3.5" />
                <span>TRACE</span>
                <span className="ml-auto text-[10px]">●</span>
              </div>
              <a
                href="http://localhost:3003"
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-1.5 rounded text-xs text-foreground/90 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>ACQUIRE</span>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-sm font-medium">
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">User</p>
                <p className="text-xs text-muted-foreground/75 truncate">Connected</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground/75 pt-2 border-t border-border">
              <div className="font-medium text-foreground">TRACE</div>
              <div className="mt-1">
                Part of <span className="font-semibold text-foreground">Fabrknt Suite</span>
              </div>
              <div className="mt-1 text-gray-600">Preview Only</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full w-64 flex-col bg-muted border-r border-border">
        {/* Brand Header */}
        <div className="flex h-16 items-center px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <h1 className="text-xl font-bold text-foreground">TRACE</h1>
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-xs font-semibold text-amber-700">
              PREVIEW
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-foreground/90 hover:bg-gray-50 hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Suite Switcher */}
        <div className="border-t border-border p-4">
          <div className="text-xs font-medium text-foreground mb-2">Switch App</div>
          <div className="space-y-1">
            <a
              href="http://localhost:3001"
              className="flex items-center gap-2 px-2 py-1.5 rounded text-xs text-foreground/90 hover:bg-gray-50 transition-colors"
            >
              <Heart className="h-3.5 w-3.5" />
              <span>PULSE</span>
            </a>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-xs bg-orange-50 text-orange-700 font-medium">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>TRACE</span>
              <span className="ml-auto text-[10px]">●</span>
            </div>
            <a
              href="http://localhost:3003"
              className="flex items-center gap-2 px-2 py-1.5 rounded text-xs text-foreground/90 hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>ACQUIRE</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">User</p>
              <p className="text-xs text-muted-foreground/75 truncate">Connected</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground/75 pt-2 border-t border-border">
            <div className="font-medium text-foreground">TRACE</div>
            <div className="mt-1">
              Part of <span className="font-semibold text-foreground">Fabrknt Suite</span>
            </div>
            <div className="mt-1 text-gray-600">Preview Only</div>
          </div>
        </div>
      </div>
    </>
  );
}
