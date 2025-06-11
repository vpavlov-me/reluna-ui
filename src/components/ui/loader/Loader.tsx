import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const loaderVariants = cva(
  'animate-spin',
  {
    variants: {
      variant: {
        spinner: 'rounded-full border-2 border-current border-t-transparent',
        dots: 'flex space-x-1',
        pulse: 'rounded-full bg-current animate-pulse',
        bars: 'flex space-x-1',
      },
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        primary: 'text-primary-600',
        secondary: 'text-secondary-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
        error: 'text-error-600',
        neutral: 'text-neutral-600',
        white: 'text-white',
      },
    },
    defaultVariants: {
      variant: 'spinner',
      size: 'md',
      color: 'primary',
    },
  }
)

export interface LoaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof loaderVariants> {
  label?: string
  overlay?: boolean
}

const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ 
    className, 
    variant = 'spinner', 
    size = 'md', 
    color = 'primary',
    label,
    overlay = false,
    ...props 
  }, ref) => {
    const renderLoader = () => {
      switch (variant) {
        case 'spinner':
          return (
            <div
              className={cn(loaderVariants({ variant, size, color }), className)}
              role="status"
              aria-label={label || 'Loading'}
            />
          )

        case 'dots':
          return (
            <div
              className={cn('flex space-x-1', className)}
              role="status"
              aria-label={label || 'Loading'}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full bg-current animate-bounce',
                    size === 'xs' && 'h-1 w-1',
                    size === 'sm' && 'h-1.5 w-1.5',
                    size === 'md' && 'h-2 w-2',
                    size === 'lg' && 'h-3 w-3',
                    size === 'xl' && 'h-4 w-4',
                    color === 'primary' && 'text-primary-600',
                    color === 'secondary' && 'text-secondary-600',
                    color === 'success' && 'text-success-600',
                    color === 'warning' && 'text-warning-600',
                    color === 'error' && 'text-error-600',
                    color === 'neutral' && 'text-neutral-600',
                    color === 'white' && 'text-white'
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )

        case 'pulse':
          return (
            <div
              className={cn(
                'rounded-full bg-current animate-pulse',
                size === 'xs' && 'h-3 w-3',
                size === 'sm' && 'h-4 w-4',
                size === 'md' && 'h-6 w-6',
                size === 'lg' && 'h-8 w-8',
                size === 'xl' && 'h-12 w-12',
                color === 'primary' && 'text-primary-600',
                color === 'secondary' && 'text-secondary-600',
                color === 'success' && 'text-success-600',
                color === 'warning' && 'text-warning-600',
                color === 'error' && 'text-error-600',
                color === 'neutral' && 'text-neutral-600',
                color === 'white' && 'text-white',
                className
              )}
              role="status"
              aria-label={label || 'Loading'}
            />
          )

        case 'bars':
          return (
            <div
              className={cn('flex space-x-1', className)}
              role="status"
              aria-label={label || 'Loading'}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'bg-current animate-pulse',
                    size === 'xs' && 'h-3 w-0.5',
                    size === 'sm' && 'h-4 w-0.5',
                    size === 'md' && 'h-6 w-1',
                    size === 'lg' && 'h-8 w-1',
                    size === 'xl' && 'h-12 w-1.5',
                    color === 'primary' && 'text-primary-600',
                    color === 'secondary' && 'text-secondary-600',
                    color === 'success' && 'text-success-600',
                    color === 'warning' && 'text-warning-600',
                    color === 'error' && 'text-error-600',
                    color === 'neutral' && 'text-neutral-600',
                    color === 'white' && 'text-white'
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
          )

        default:
          return null
      }
    }

    if (overlay) {
      return (
        <div
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          {...props}
        >
          <div className="flex flex-col items-center space-y-4">
            {renderLoader()}
            {label && (
              <p className="text-sm text-white font-medium">{label}</p>
            )}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className="flex items-center justify-center"
        {...props}
      >
        <div className="flex flex-col items-center space-y-2">
          {renderLoader()}
          {label && (
            <p className={cn(
              'text-sm font-medium',
              color === 'primary' && 'text-primary-600',
              color === 'secondary' && 'text-secondary-600',
              color === 'success' && 'text-success-600',
              color === 'warning' && 'text-warning-600',
              color === 'error' && 'text-error-600',
              color === 'neutral' && 'text-neutral-600',
              color === 'white' && 'text-white'
            )}>
              {label}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Loader.displayName = 'Loader'

// Loading Button Component
export interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loaderVariant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  children: React.ReactNode
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    loading = false,
    loadingText,
    loaderSize = 'sm',
    loaderVariant = 'spinner',
    disabled,
    children,
    className,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-md border border-transparent bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {loading && (
          <Loader
            variant={loaderVariant}
            size={loaderSize}
            color="white"
            className="mr-2"
          />
        )}
        <span>{loading && loadingText ? loadingText : children}</span>
      </button>
    )
  }
)

LoadingButton.displayName = 'LoadingButton'

// Loading Overlay Component
export interface LoadingOverlayProps {
  loading: boolean
  children: React.ReactNode
  label?: string
  loaderVariant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  children,
  label,
  loaderVariant = 'spinner',
  loaderSize = 'lg',
}) => {
  return (
    <div className="relative">
      {children}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader
            variant={loaderVariant}
            size={loaderSize}
            color="primary"
            {...(label && { label })}
          />
        </div>
      )}
    </div>
  )
}

LoadingOverlay.displayName = 'LoadingOverlay'

export { Loader, LoadingButton, LoadingOverlay, loaderVariants } 