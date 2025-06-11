import React from 'react';
import { cn } from '../../../utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        white: '',
        yellow: '',
        red: '',
        green: '',
      },
      buttonType: {
        primary: '',
        secondary: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        small: 'h-8 px-3 text-xs',
        medium: 'h-9 px-4 py-2',
        large: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
      buttonState: {
        default: '',
        hover: '',
        pressed: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    compoundVariants: [
      // White Primary
      {
        variant: 'white',
        buttonType: 'primary',
        className: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      },
      // White Secondary
      {
        variant: 'white',
        buttonType: 'secondary',
        className: 'border-border bg-background hover:bg-accent',
      },
      // Yellow Primary
      {
        variant: 'yellow',
        buttonType: 'primary',
        className: 'bg-yellow-500 text-white shadow hover:bg-yellow-600',
      },
      // Yellow Secondary
      {
        variant: 'yellow',
        buttonType: 'secondary',
        className: 'border-yellow-500 text-yellow-500 hover:bg-yellow-50',
      },
      // Red Primary
      {
        variant: 'red',
        buttonType: 'primary',
        className: 'bg-red-500 text-white shadow hover:bg-red-600',
      },
      // Red Secondary
      {
        variant: 'red',
        buttonType: 'secondary',
        className: 'border-red-500 text-red-500 hover:bg-red-50',
      },
      // Green Primary
      {
        variant: 'green',
        buttonType: 'primary',
        className: 'bg-green-500 text-white shadow hover:bg-green-600',
      },
      // Green Secondary
      {
        variant: 'green',
        buttonType: 'secondary',
        className: 'border-green-500 text-green-500 hover:bg-green-50',
      },
      // Pressed states
      {
        buttonState: 'pressed',
        className: 'scale-95',
      },
      // Disabled states
      {
        buttonState: 'disabled',
        className: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    ],
    defaultVariants: {
      variant: 'white',
      buttonType: 'primary',
      size: 'medium',
      buttonState: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    buttonType, 
    size, 
    buttonState,
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    type = 'button',
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading || buttonState === 'disabled';
    const currentState = isDisabled ? 'disabled' : buttonState;

    return (
      <button
        className={cn(buttonVariants({ variant, buttonType, size, buttonState: currentState, className }))}
        ref={ref}
        type={type}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {leftIcon && !loading && leftIcon}
        {children}
        {rightIcon && !loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 