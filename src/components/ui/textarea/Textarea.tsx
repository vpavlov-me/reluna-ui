import React, { forwardRef, useEffect, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 focus:border-primary-500',
        error: 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
        success: 'border-success-500 focus:border-success-500 focus:ring-success-500/20',
      },
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        md: 'min-h-[80px] px-3 py-2 text-sm',
        lg: 'min-h-[100px] px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  autoResize?: boolean
  maxLength?: number
  showCharacterCount?: boolean
  minRows?: number
  maxRows?: number
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
    variant,
    size,
    label,
    error,
    helperText,
    required,
    autoResize = false,
    maxLength,
    showCharacterCount = false,
    minRows = 3,
    maxRows = 10,
    value,
    defaultValue,
    onChange,
    id,
    ...props 
  }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    const currentValue = value !== undefined ? value : internalValue
    const characterCount = String(currentValue).length

    // Merge refs
    React.useImperativeHandle(ref, () => textareaRef.current!, [])

    const textareaId = id || `textarea-${React.useId()}`
    const errorId = error ? `${textareaId}-error` : undefined
    const helperTextId = helperText ? `${textareaId}-helper` : undefined
    const characterCountId = showCharacterCount ? `${textareaId}-count` : undefined

    // Auto-resize functionality
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current
      if (!textarea || !autoResize) return

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto'
      
      // Calculate the new height
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10)
      const minHeight = lineHeight * minRows
      const maxHeight = lineHeight * maxRows
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
      
      textarea.style.height = `${newHeight}px`
    }, [autoResize, minRows, maxRows])

    // Adjust height on value change
    useEffect(() => {
      adjustHeight()
    }, [currentValue, adjustHeight])

    // Adjust height on mount
    useEffect(() => {
      adjustHeight()
    }, [adjustHeight])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value
      
      // Enforce maxLength if specified
      if (maxLength && newValue.length > maxLength) {
        return
      }
      
      if (value === undefined) {
        setInternalValue(newValue)
      }
      
      onChange?.(event)
      
      // Adjust height after state update
      setTimeout(adjustHeight, 0)
    }

    const isOverLimit = maxLength ? characterCount > maxLength : false
    const finalVariant = error ? 'error' : variant

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={textareaRef}
            id={textareaId}
            className={cn(textareaVariants({ variant: finalVariant, size }), className)}
            value={currentValue}
            onChange={handleChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              error && errorId,
              helperText && helperTextId,
              showCharacterCount && characterCountId
            )}
            style={autoResize ? { overflow: 'hidden' } : undefined}
            {...props}
          />
          
          {showCharacterCount && (
            <div 
              id={characterCountId}
              className={cn(
                'absolute bottom-2 right-2 text-xs',
                isOverLimit ? 'text-error-600' : 'text-neutral-500'
              )}
            >
              {characterCount}{maxLength && `/${maxLength}`}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperTextId} className="text-sm text-neutral-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants } 