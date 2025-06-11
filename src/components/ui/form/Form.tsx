import React, { createContext, useContext, forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import { useId } from '../../../hooks/useId'

// Form context for managing form state
interface FormContextValue {
  formId: string
  disabled: boolean
  size: 'sm' | 'default' | 'lg'
}

const FormContext = createContext<FormContextValue | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('Form components must be used within a Form')
  }
  return context
}

// Form component
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean
  size?: 'sm' | 'default' | 'lg'
  'data-testid'?: string
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, disabled, size = 'default', children, id, 'data-testid': testId, ...props }, ref) => {
    const formId = useId(id)

    const contextValue: FormContextValue = {
      formId,
      disabled: disabled || false,
      size
    }

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          id={formId}
          className={cn('space-y-6', className)}
          data-testid={testId}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    )
  }
)

Form.displayName = 'Form'

// Form Field component
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  label?: string
  description?: string
  error?: string
  success?: string
  warning?: string
  required?: boolean
  disabled?: boolean
  'data-testid'?: string
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({
    className,
    name,
    label,
    description,
    error,
    success,
    warning,
    required,
    disabled,
    children,
    'data-testid': testId,
    ...props
  }, ref) => {
    const { formId, disabled: formDisabled, size } = useFormContext()
    const fieldId = `${formId}-${name}`
    const isDisabled = disabled || formDisabled

    const errorId = error ? `${fieldId}-error` : undefined
    const descriptionId = description ? `${fieldId}-description` : undefined
    const successId = success ? `${fieldId}-success` : undefined
    const warningId = warning ? `${fieldId}-warning` : undefined

    const renderLabel = () => {
      if (!label) return null

      return (
        <label
          htmlFor={fieldId}
          className={cn(
            'text-sm font-medium leading-none',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            error && 'text-destructive',
            success && 'text-success',
            warning && 'text-warning',
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
        </label>
      )
    }

    const renderHelperText = () => {
      if (error) {
        return (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )
      }

      if (success) {
        return (
          <p id={successId} className="text-sm text-success">
            {success}
          </p>
        )
      }

      if (warning) {
        return (
          <p id={warningId} className="text-sm text-warning">
            {warning}
          </p>
        )
      }

      if (description) {
        return (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )
      }

      return null
    }

    // Clone children to pass form context props
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          id: fieldId,
          name,
          disabled: isDisabled,
          size,
          'aria-invalid': error ? 'true' : 'false',
          'aria-describedby': cn(errorId, successId, warningId, descriptionId),
          'aria-required': required,
          ...child.props
        })
      }
      return child
    })

    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        data-testid={testId}
        {...props}
      >
        {renderLabel()}
        {enhancedChildren}
        {renderHelperText()}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

// Form Group component for grouping related fields
export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string
  description?: string
  disabled?: boolean
  'data-testid'?: string
}

const FormGroup = forwardRef<HTMLFieldSetElement, FormGroupProps>(
  ({ className, legend, description, disabled, children, 'data-testid': testId, ...props }, ref) => {
    const { disabled: formDisabled } = useFormContext()
    const isDisabled = disabled || formDisabled

    return (
      <fieldset
        ref={ref}
        className={cn('space-y-4', className)}
        disabled={isDisabled}
        data-testid={testId}
        {...props}
      >
        {legend && (
          <legend className="text-base font-semibold text-foreground">
            {legend}
          </legend>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </fieldset>
    )
  }
)

FormGroup.displayName = 'FormGroup'

// Form Actions component for form buttons
export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'between'
  'data-testid'?: string
}

const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align = 'right', children, 'data-testid': testId, ...props }, ref) => {
    const alignmentClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 pt-4',
          alignmentClasses[align],
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FormActions.displayName = 'FormActions'

export { Form, FormField, FormGroup, FormActions } 