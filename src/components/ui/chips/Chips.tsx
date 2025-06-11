import React from 'react';
import { cn } from '../../../utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

const chipsVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        small: 'h-6 px-2 text-xs',
        medium: 'h-7 px-3 text-xs',
        large: 'h-8 px-4 text-sm',
      },
      active: {
        yes: '',
        no: 'opacity-60',
      },
    },
    compoundVariants: [
      {
        active: 'yes',
        variant: 'default',
        className: 'bg-primary text-primary-foreground',
      },
      {
        active: 'yes',
        variant: 'primary',
        className: 'bg-primary text-primary-foreground',
      },
      {
        active: 'yes',
        variant: 'secondary',
        className: 'bg-secondary text-secondary-foreground',
      },
      {
        active: 'yes',
        variant: 'destructive',
        className: 'bg-destructive text-destructive-foreground',
      },
      {
        active: 'yes',
        variant: 'outline',
        className: 'border-primary bg-primary text-primary-foreground',
      },
      {
        active: 'yes',
        variant: 'ghost',
        className: 'bg-accent text-accent-foreground',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      active: 'no',
    },
  }
);

const colorIndicatorVariants = cva(
  'rounded-full',
  {
    variants: {
      size: {
        small: 'h-2 w-2',
        medium: 'h-2.5 w-2.5',
        large: 'h-3 w-3',
      },
      variant: {
        default: 'bg-primary',
        primary: 'bg-primary-foreground',
        secondary: 'bg-secondary-foreground',
        destructive: 'bg-destructive-foreground',
        outline: 'bg-primary',
        ghost: 'bg-accent-foreground',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  }
);

export interface ChipsProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof chipsVariants> {
  text?: string;
  showColorIndicator?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const Chips = React.forwardRef<HTMLButtonElement, ChipsProps>(
  ({
    className,
    variant,
    size,
    active,
    text = 'Chips',
    showColorIndicator = true,
    removable = false,
    onRemove,
    children,
    onClick,
    ...props
  }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove?.();
    };

    return (
      <button
        ref={ref}
        className={cn(chipsVariants({ variant, size, active }), className)}
        onClick={handleClick}
        {...props}
      >
        {showColorIndicator && (
          <div className={cn(colorIndicatorVariants({ size, variant }))} />
        )}
        
        <span>{children || text}</span>
        
        {removable && (
          <button
            type="button"
            onClick={handleRemove}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Remove"
          >
            <svg
              className="h-3 w-3"
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
      </button>
    );
  }
);

Chips.displayName = 'Chips';

export { Chips, chipsVariants }; 