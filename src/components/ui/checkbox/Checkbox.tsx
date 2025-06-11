import React from 'react';
import { cn } from '../../../utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

const checkboxVariants = cva(
  'peer shrink-0 rounded-sm border-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
  {
    variants: {
      size: {
        small: 'h-4 w-4',
        medium: 'h-5 w-5',
        large: 'h-6 w-6',
      },
      state: {
        default: 'border-input',
        hover: 'border-ring',
        selected: 'bg-primary border-primary text-primary-foreground',
        multi: 'bg-primary border-primary text-primary-foreground',
        'disabled-default': 'border-muted cursor-not-allowed opacity-50',
        'disabled-selected': 'bg-muted border-muted cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'default',
    },
  }
);

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const descriptionVariants = cva(
  'text-muted-foreground',
  {
    variants: {
      size: {
        small: 'text-xs',
        medium: 'text-xs',
        large: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  showText?: boolean;
  showDescription?: boolean;
  indeterminate?: boolean;
  containerClassName?: string;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polyline points="20,6 9,17 4,12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    size,
    state,
    label = 'Checkbox',
    description = 'Description',
    showText = true,
    showDescription = false,
    indeterminate = false,
    containerClassName,
    id,
    checked,
    disabled,
    ...props
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine current state based on props
    const getCurrentState = () => {
      if (disabled) {
        return checked ? 'disabled-selected' : 'disabled-default';
      }
      if (checked || indeterminate) {
        return indeterminate ? 'multi' : 'selected';
      }
      return state || 'default';
    };

    const currentState = getCurrentState();

    return (
      <div className={cn('flex items-start space-x-2', containerClassName)}>
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className="sr-only"
            checked={checked}
            disabled={disabled}
            {...props}
          />
          <div
            className={cn(
              checkboxVariants({ size, state: currentState }),
              'flex items-center justify-center',
              className
            )}
          >
            {(checked || indeterminate) && (
              <div className="text-current">
                {indeterminate ? (
                  <MinusIcon className={cn(
                    size === 'small' ? 'h-3 w-3' : 
                    size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
                  )} />
                ) : (
                  <CheckIcon className={cn(
                    size === 'small' ? 'h-3 w-3' : 
                    size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
                  )} />
                )}
              </div>
            )}
          </div>
        </div>
        
        {showText && (
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={checkboxId}
              className={cn(labelVariants({ size }))}
            >
              {label}
            </label>
            {showDescription && (
              <p className={cn(descriptionVariants({ size }))}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants }; 