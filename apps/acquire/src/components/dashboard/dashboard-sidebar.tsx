'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, LayoutDashboard, ShoppingBag, Users, X, Heart, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Marketplace', href: '/dashboard/marketplace', icon: ShoppingBag },
  { name: 'My Listings', href: '/dashboard/seller', icon: Building2 },
  { name: 'Buyers', href: '/dashboard/buyers', icon: Users, disabled: true },
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
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <span className="text-xl font-bold text-foreground">ACQUIRE</span>
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

              if (item.disabled) {
                return (
                  <div
                    key={item.name}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                    <span className="ml-auto text-xs">(Soon)</span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-foreground/90 hover:bg-gray-50 hover:text-foreground'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
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
              <a
                href="http://localhost:3002"
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-1.5 rounded text-xs text-foreground/90 hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>TRACE</span>
              </a>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded text-xs bg-blue-50 text-blue-700 font-medium">
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>ACQUIRE</span>
                <span className="ml-auto text-[10px]">●</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="text-xs text-muted-foreground/75">
              <div className="font-medium text-foreground">ACQUIRE</div>
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
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-blue-600" />
            <span className="text-xl font-bold text-foreground">ACQUIRE</span>
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-700">
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

            if (item.disabled) {
              return (
                <div
                  key={item.name}
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                  <span className="ml-auto text-xs">(Soon)</span>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-foreground/90 hover:bg-gray-50 hover:text-foreground'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
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
            <a
              href="http://localhost:3002"
              className="flex items-center gap-2 px-2 py-1.5 rounded text-xs text-foreground/90 hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>TRACE</span>
            </a>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-xs bg-blue-50 text-blue-700 font-medium">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>ACQUIRE</span>
              <span className="ml-auto text-[10px]">●</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="text-xs text-muted-foreground/75">
            <div className="font-medium text-foreground">ACQUIRE</div>
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
