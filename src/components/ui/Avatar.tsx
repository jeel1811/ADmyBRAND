'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  border?: boolean;
  borderColor?: string;
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
}

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  shape = 'circle',
  border = false,
  borderColor,
  className,
  status = 'none',
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  // Size variations
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  // Shape variations
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  // Border styles
  const borderStyles = border
    ? `border-2 ${borderColor || 'border-white dark:border-neutral-800'}`
    : '';

  // Status indicator styles
  const statusStyles = {
    online: 'bg-green-500',
    offline: 'bg-neutral-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    none: 'hidden',
  };

  // Get initials from fallback text
  const getInitials = () => {
    if (!fallback) return '';
    
    return fallback
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'relative overflow-hidden flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium',
          sizeStyles[size],
          shapeStyles[shape],
          borderStyles,
          className
        )}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`}
          />
        ) : (
          <span>{getInitials()}</span>
        )}
      </div>
      
      {status !== 'none' && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-neutral-800',
            statusStyles[status],
            size === 'xs' ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'
          )}
        />
      )}
    </div>
  );
}

export interface AvatarGroupProps {
  avatars: Array<Omit<AvatarProps, 'size' | 'shape' | 'border'>>;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 3,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  // Overlap offset based on size
  const offsetMap = {
    xs: '-mr-2',
    sm: '-mr-3',
    md: '-mr-4',
    lg: '-mr-5',
    xl: '-mr-6',
  };

  const offset = offsetMap[size];

  return (
    <div className={cn('flex', className)}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className={cn(index !== 0 && offset)}>
          <Avatar
            {...avatar}
            size={size}
            shape="circle"
            border
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className={offset}>
          <div
            className={cn(
              'relative overflow-hidden flex items-center justify-center bg-neutral-300 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium rounded-full border-2 border-white dark:border-neutral-800',
              sizeStyles[size]
            )}
          >
            <span>+{remainingCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const sizeStyles = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};