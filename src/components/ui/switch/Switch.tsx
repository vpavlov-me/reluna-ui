import React from 'react';
import { cn } from '../../../utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        off: 'bg-input',
        on: 'bg-primary',
        'off-disabled': 'bg-muted cursor-not-allowed opacity-50',
        'on-disabled': 'bg-muted cursor-not-allowed opacity-50',
      },
      size: {
        small: 'h-5 w-9',
        medium: 'h-6 w-11',
        large: 'h-7 w-12',
      },
    },
    defaultVariants: {
      state: 'off',
      size: 'medium',
    },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      state: {
        off: 'translate-x-0',
        on: '',
        'off-disabled': 'translate-x-0',
        'on-disabled': '',
      },
      size: {
        small: 'h-4 w-4',
        medium: 'h-5 w-5',
        large: 'h-6 w-6',
      },
    },
    compoundVariants: [
      {
        state: 'on',
        size: 'small',
        className: 'translate-x-4',
      },
      {
        state: 'on',
        size: 'medium',
        className: 'translate-x-5',
      },
      {
        state: 'on',
        size: 'large',
        className: 'translate-x-5',
      },
      {
        state: 'on-disabled',
        size: 'small',
        className: 'translate-x-4',
      },
      {
        state: 'on-disabled',
        size: 'medium',
        className: 'translate-x-5',
      },
      {
        state: 'on-disabled',
        size: 'large',
        className: 'translate-x-5',
      },
    ],
    defaultVariants: {
      state: 'off',
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

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  showText?: boolean;
  showDescription?: boolean;
  position?: 'left' | 'right';
  containerClassName?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className,
    size,
    label = 'Switcher',
    description = 'Description',
    showText = true,
    showDescription = false,
    position = 'left',
    containerClassName,
    id,
    checked,
    disabled,
    ...props
  }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine current state based on props
    const getCurrentState = () => {
      if (disabled) {
        return checked ? 'on-disabled' : 'off-disabled';
      }
      return checked ? 'on' : 'off';
    };

    const currentState = getCurrentState();

    const switchElement = (
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          id={switchId}
          className="sr-only"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <div
          className={cn(
            switchVariants({ state: currentState, size }),
            className
          )}
        >
          <div className={cn(switchThumbVariants({ state: currentState, size }))} />
        </div>
      </div>
    );

    const textElement = showText && (
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={switchId}
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
    );

    return (
      <div className={cn('flex items-start space-x-2', containerClassName)}>
        {position === 'left' && textElement}
        {switchElement}
        {position === 'right' && textElement}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch, switchVariants }; 