import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        success: 'border-transparent bg-success text-success-foreground hover:bg-success/90 shadow-sm',
        warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm',
        info: 'border-transparent bg-info text-info-foreground hover:bg-info/90 shadow-sm',
        outline: 'border-2 border-border text-foreground hover:bg-accent hover:text-accent-foreground shadow-sm',
        ghost: 'border-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  dot?: boolean
  removable?: boolean
  onRemove?: () => void
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    children, 
    dot = false,
    removable = false,
    onRemove,
    ...props 
  }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)} 
        {...props}
      >
        {dot && (
          <span 
            className={cn(
              'mr-1 h-1.5 w-1.5 rounded-full',
              variant === 'default' && 'bg-primary-foreground',
              variant === 'secondary' && 'bg-secondary-foreground',
              variant === 'destructive' && 'bg-destructive-foreground',
              variant === 'success' && 'bg-success-foreground',
              variant === 'warning' && 'bg-warning-foreground',
              variant === 'info' && 'bg-info-foreground',
              variant === 'outline' && 'bg-foreground',
              variant === 'ghost' && 'bg-muted-foreground',
            )}
          />
        )}
        
        {children}
        
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'ml-1 inline-flex h-3 w-3 items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current transition-colors',
              size === 'sm' && 'h-2.5 w-2.5 ml-0.5',
              size === 'lg' && 'h-4 w-4 ml-1.5'
            )}
            aria-label="Remove badge"
          >
            <svg
              className={cn(
                'h-2 w-2',
                size === 'sm' && 'h-1.5 w-1.5',
                size === 'lg' && 'h-2.5 w-2.5'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

// Notification Badge (for counts)
export interface NotificationBadgeProps
  extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
  showZero?: boolean
  children: React.ReactElement
}

const NotificationBadge = forwardRef<HTMLDivElement, NotificationBadgeProps>(
  ({ 
    count, 
    max = 99, 
    showZero = false, 
    children, 
    className,
    variant = 'destructive',
    size = 'sm',
    ...props 
  }, ref) => {
    const shouldShow = count > 0 || showZero
    const displayCount = count > max ? `${max}+` : count.toString()

    return (
      <div className="relative inline-flex">
        {children}
        {shouldShow && (
          <Badge
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
              'absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 flex items-center justify-center',
              size === 'sm' && 'text-[10px] min-w-4 h-4',
              size === 'lg' && 'text-xs min-w-6 h-6',
              className
            )}
            {...props}
          >
            {displayCount}
          </Badge>
        )}
      </div>
    )
  }
)

NotificationBadge.displayName = 'NotificationBadge'

// Status Badge (with predefined colors for status)
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning'
}

const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const variantMap = {
      active: 'success' as const,
      inactive: 'secondary' as const,
      pending: 'warning' as const,
      error: 'destructive' as const,
      success: 'success' as const,
      warning: 'warning' as const,
    }

    return (
      <Badge
        ref={ref}
        variant={variantMap[status]}
        dot
        {...props}
      />
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

export { Badge, NotificationBadge, StatusBadge, badgeVariants } 