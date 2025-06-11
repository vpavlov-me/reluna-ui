import { lazy } from 'react'

// Design Tokens
export * from './tokens'

// Theme System
export * from './themes'
export { ThemeProvider } from './themes/theme-provider'

// Utilities
export * from './utils'
export { cn } from './utils/cn'

// Typography Components
export * from './components/ui/typography'

// Enhanced Components
export { Button, buttonVariants } from './components/ui/button/Button'
export type { ButtonProps } from './components/ui/button/Button'

export { Input, inputVariants } from './components/ui/input/Input'
export type { InputProps } from './components/ui/input/Input'

export { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription, 
  ModalFooter, 
  ModalClose,
  modalVariants 
} from './components/ui/modal/Modal'
export type { ModalProps } from './components/ui/modal/Modal'

export { Checkbox, checkboxVariants } from './components/ui/checkbox/Checkbox'
export type { CheckboxProps } from './components/ui/checkbox/Checkbox'

export { Form, FormField, FormGroup, FormActions, useFormContext } from './components/ui/form/Form'
export type { FormProps, FormFieldProps, FormGroupProps, FormActionsProps } from './components/ui/form/Form'

// Other Form Components
export * from './components/ui/select/Select'
export * from './components/ui/radio/Radio'
export * from './components/ui/switch/Switch'
export * from './components/ui/textarea/Textarea'

// Feedback Components - Lazy loaded
export const Notification = lazy(() => import('./components/ui/notification/Notification').then(m => ({ default: m.Notification })))
export const Tooltip = lazy(() => import('./components/ui/tooltip/Tooltip').then(m => ({ default: m.Tooltip })))
export * from './components/ui/badge/Badge'
export * from './components/ui/loader/Loader'

// Layout Components
export * from './components/ui/card/Card'
export * from './components/ui/accordion/Accordion'

// Navigation Components
export * from './components/ui/tabs/Tabs'
export const Sidebar = lazy(() => import('./components/ui/sidebar/Sidebar').then(m => ({ default: m.Sidebar })))
export const Navbar = lazy(() => import('./components/ui/navbar/Navbar').then(m => ({ default: m.Navbar })))

// Data Components - Lazy loaded
export const Table = lazy(() => import('./components/ui/table/Table').then(m => ({ default: m.Table })))

// Hooks
export {
  useId,
  useControllableState,
  useEventListener,
  useFocusRing,
  useKeyboardNavigation,
  useMediaQuery,
  useLocalStorage,
  useDebounce,
  useClickOutside,
  useEscapeKey,
  useMergedRefs
} from './hooks'

// Theme hook
export { useTheme } from './hooks/useTheme'

// Media query hooks
export { 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop, 
  useIsLargeScreen, 
  usePrefersDarkMode, 
  usePrefersReducedMotion 
} from './hooks/useMediaQuery'

// Types
export type {
  BaseComponentProps,
  PolymorphicRef,
  PolymorphicComponentProp,
  PolymorphicComponent,
  FormFieldProps as BaseFormFieldProps,
  ComponentSize,
  ComponentVariant,
  AnimationVariant,
  LoadingState,
  AccessibilityProps,
  ThemeContextValue,
  ComponentState,
  ResponsiveValue,
  ComponentEventHandlers
} from './types/component'

export type {
  ButtonVariant,
  ButtonSize,
  InputVariant,
  InputSize,
  CardVariant,
  Size,
  Variant
} from './types' 