import { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react'

// Base component props with polymorphic support
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  'data-testid'?: string
}

// Polymorphic component props
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>['ref']

export type PolymorphicComponentProp<C extends ElementType, Props = object> = {
  as?: C
} & Props &
  Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>

export type PolymorphicComponent<DefaultElement extends ElementType, Props = object> = <
  C extends ElementType = DefaultElement
>(
  props: PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }
) => ReactNode

// Form component props
export interface FormFieldProps {
  id?: string
  name?: string
  label?: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

// Size variants
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Color variants
export type ComponentVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'

// Animation variants
export type AnimationVariant = 'none' | 'fade' | 'slide' | 'scale' | 'bounce'

// Loading state
export interface LoadingState {
  loading?: boolean
  loadingText?: string
}

// Accessibility props
export interface AccessibilityProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-selected'?: boolean
  'aria-checked'?: boolean | 'mixed'
  'aria-disabled'?: boolean
  'aria-hidden'?: boolean
  'aria-live'?: 'off' | 'polite' | 'assertive'
  'aria-atomic'?: boolean
  'aria-busy'?: boolean
  'aria-controls'?: string
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  'aria-invalid'?: boolean | 'grammar' | 'spelling'
  'aria-required'?: boolean
  role?: string
}

// Theme context
export interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  resolvedTheme: 'light' | 'dark'
}

// Component state
export interface ComponentState {
  isHovered?: boolean
  isFocused?: boolean
  isPressed?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isError?: boolean
}

// Responsive props
export type ResponsiveValue<T> = T | {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

// Event handlers
export interface ComponentEventHandlers {
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onMouseEnter?: (event: React.MouseEvent) => void
  onMouseLeave?: (event: React.MouseEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onKeyUp?: (event: React.KeyboardEvent) => void
} 