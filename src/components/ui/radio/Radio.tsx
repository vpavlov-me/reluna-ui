import React from 'react';
import { cn } from '../../../utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

const radioVariants = cva(
  'aspect-square rounded-full border-2 text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
        selected: 'border-primary',
        'disabled-default': 'border-muted cursor-not-allowed opacity-50',
        'disabled-selected': 'border-muted cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'default',
    },
  }
);

const radioIndicatorVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      size: {
        small: 'h-4 w-4',
        medium: 'h-5 w-5',
        large: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const radioDotVariants = cva(
  'rounded-full bg-primary',
  {
    variants: {
      size: {
        small: 'h-2 w-2',
        medium: 'h-2.5 w-2.5',
        large: 'h-3 w-3',
      },
    },
    defaultVariants: {
      size: 'medium',
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

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
  showText?: boolean;
  showDescription?: boolean;
  containerClassName?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({
    className,
    size,
    state,
    label = 'Radio',
    description = 'Description',
    showText = true,
    showDescription = false,
    containerClassName,
    id,
    checked,
    disabled,
    ...props
  }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine current state based on props
    const getCurrentState = () => {
      if (disabled) {
        return checked ? 'disabled-selected' : 'disabled-default';
      }
      if (checked) {
        return 'selected';
      }
      return state || 'default';
    };

    const currentState = getCurrentState();

    return (
      <div className={cn('flex items-start space-x-2', containerClassName)}>
        <div className="relative">
          <input
            type="radio"
            ref={ref}
            id={radioId}
            className="sr-only"
            checked={checked}
            disabled={disabled}
            {...props}
          />
          <div
            className={cn(
              radioVariants({ size, state: currentState }),
              'flex items-center justify-center',
              className
            )}
          >
            {checked && (
              <div className={cn(radioIndicatorVariants({ size }))}>
                <div className={cn(radioDotVariants({ size }))} />
              </div>
            )}
          </div>
        </div>
        
        {showText && (
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={radioId}
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

Radio.displayName = 'Radio';

export { Radio, radioVariants }; 