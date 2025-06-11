import { ReactNode } from 'react'

// Base component props
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

// Theme types
export interface ThemeColors {
  primary: ColorScale
  secondary: ColorScale
  destructive: ColorScale
  success: ColorScale
  warning: ColorScale
  error: ColorScale
  info: ColorScale
  muted: ColorScale
  accent: ColorScale
  border: string
  input: string
  ring: string
  background: string
  foreground: string
  card: string
  'card-foreground': string
  popover: string
  'popover-foreground': string
}

export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
  DEFAULT?: string
  foreground?: string
}

export interface ThemeTypography {
  fontFamily: {
    sans: string[]
    mono: string[]
  }
  fontSize: Record<string, [string, { lineHeight: string }]>
  fontWeight: Record<string, string>
}

export interface ThemeSpacing {
  [key: string]: string
}

export interface ThemeBorderRadius {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  full: string
}

export interface ThemeShadows {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
  none: string
}

export interface Theme {
  name: string
  colors: ThemeColors
  typography: ThemeTypography
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  shadows: ThemeShadows
}

// Component variant types
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export type InputVariant = 'default' | 'destructive'
export type InputSize = 'default' | 'sm' | 'lg'

export type CardVariant = 'default' | 'outlined' | 'elevated'

// Utility types
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' 