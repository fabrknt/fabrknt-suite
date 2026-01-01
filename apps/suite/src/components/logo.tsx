import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
  className?: string;
}

export function Logo({ size = 'md', variant = 'default', className }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconSizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-foreground';

  return (
    <Link href="/" className={cn('flex items-center gap-2 group', className)}>
      <div className="relative">
        <Sparkles className={cn(iconSizeClasses[size], 'text-purple-600 group-hover:text-purple-700 transition-colors')} />
        <div className="absolute inset-0 bg-purple-600/20 blur-lg group-hover:bg-purple-600/30 transition-all" />
      </div>
      <span className={cn('font-bold tracking-tight group-hover:text-purple-600 transition-colors', sizeClasses[size], textColor)}>
        FABRKNT
      </span>
    </Link>
  );
}
