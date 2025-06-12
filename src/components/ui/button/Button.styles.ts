import { cva, type VariantProps } from 'class-variance-authority';

// Token-based button variants using CSS custom properties
export const buttonVariants = cva(
  // Base styles using design tokens
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium transition-all duration-[var(--button-transition-duration)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'rounded-[var(--button-border-radius)]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--button-primary-background-default)]',
          'text-[var(--button-primary-text-default)]',
          'border border-[var(--button-primary-border-default)]',
          'shadow-sm',
          'hover:bg-[var(--button-primary-background-hover)]',
          'active:bg-[var(--button-primary-background-pressed)]',
          'disabled:bg-[var(--button-primary-background-disabled)]',
          'disabled:text-[var(--button-primary-text-disabled)]',
        ],
        secondary: [
          'bg-[var(--button-secondary-background-default)]',
          'text-[var(--button-secondary-text-default)]',
          'border border-[var(--button-secondary-border-default)]',
          'hover:bg-[var(--button-secondary-background-hover)]',
          'hover:border-[var(--button-secondary-border-hover)]',
          'active:bg-[var(--button-secondary-background-pressed)]',
          'disabled:text-[var(--button-secondary-text-disabled)]',
        ],
        success: [
          'bg-[var(--button-variants-success-background-default)]',
          'text-[var(--button-variants-success-text-default)]',
          'border border-transparent',
          'shadow-sm',
          'hover:bg-[var(--button-variants-success-background-hover)]',
        ],
        warning: [
          'bg-[var(--button-variants-warning-background-default)]',
          'text-[var(--button-variants-warning-text-default)]',
          'border border-transparent',
          'shadow-sm',
          'hover:bg-[var(--button-variants-warning-background-hover)]',
        ],
        danger: [
          'bg-[var(--button-variants-danger-background-default)]',
          'text-[var(--button-variants-danger-text-default)]',
          'border border-transparent',
          'shadow-sm',
          'hover:bg-[var(--button-variants-danger-background-hover)]',
        ],
      },
      size: {
        small: [
          'h-[var(--button-size-small-height)]',
          'px-[var(--button-size-small-padding-horizontal)]',
          'py-[var(--button-size-small-padding-vertical)]',
          'text-[var(--button-size-small-font-size)]',
        ],
        medium: [
          'h-[var(--button-size-medium-height)]',
          'px-[var(--button-size-medium-padding-horizontal)]',
          'py-[var(--button-size-medium-padding-vertical)]',
          'text-[var(--button-size-medium-font-size)]',
        ],
        large: [
          'h-[var(--button-size-large-height)]',
          'px-[var(--button-size-large-padding-horizontal)]',
          'py-[var(--button-size-large-padding-vertical)]',
          'text-[var(--button-size-large-font-size)]',
        ],
        icon: [
          'h-[var(--button-size-medium-height)]',
          'w-[var(--button-size-medium-height)]',
          'p-0',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

// CSS-in-JS alternative for React Native or styled-components
export const buttonStyles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-2)',
    whiteSpace: 'nowrap',
    fontWeight: 'var(--typography-font-weight-medium)',
    transitionDuration: 'var(--button-transition-duration)',
    transitionTimingFunction: 'var(--button-transition-easing)',
    borderRadius: 'var(--button-border-radius)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  variants: {
    primary: {
      backgroundColor: 'var(--button-primary-background-default)',
      color: 'var(--button-primary-text-default)',
      borderColor: 'var(--button-primary-border-default)',
      '&:hover': {
        backgroundColor: 'var(--button-primary-background-hover)',
      },
      '&:active': {
        backgroundColor: 'var(--button-primary-background-pressed)',
      },
      '&:disabled': {
        backgroundColor: 'var(--button-primary-background-disabled)',
        color: 'var(--button-primary-text-disabled)',
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    secondary: {
      backgroundColor: 'var(--button-secondary-background-default)',
      color: 'var(--button-secondary-text-default)',
      borderColor: 'var(--button-secondary-border-default)',
      '&:hover': {
        backgroundColor: 'var(--button-secondary-background-hover)',
        borderColor: 'var(--button-secondary-border-hover)',
      },
      '&:active': {
        backgroundColor: 'var(--button-secondary-background-pressed)',
      },
    },
  },
  sizes: {
    small: {
      height: 'var(--button-size-small-height)',
      paddingLeft: 'var(--button-size-small-padding-horizontal)',
      paddingRight: 'var(--button-size-small-padding-horizontal)',
      paddingTop: 'var(--button-size-small-padding-vertical)',
      paddingBottom: 'var(--button-size-small-padding-vertical)',
      fontSize: 'var(--button-size-small-font-size)',
    },
    medium: {
      height: 'var(--button-size-medium-height)',
      paddingLeft: 'var(--button-size-medium-padding-horizontal)',
      paddingRight: 'var(--button-size-medium-padding-horizontal)',
      paddingTop: 'var(--button-size-medium-padding-vertical)',
      paddingBottom: 'var(--button-size-medium-padding-vertical)',
      fontSize: 'var(--button-size-medium-font-size)',
    },
    large: {
      height: 'var(--button-size-large-height)',
      paddingLeft: 'var(--button-size-large-padding-horizontal)',
      paddingRight: 'var(--button-size-large-padding-horizontal)',
      paddingTop: 'var(--button-size-large-padding-vertical)',
      paddingBottom: 'var(--button-size-large-padding-vertical)',
      fontSize: 'var(--button-size-large-font-size)',
    },
  },
} as const; 