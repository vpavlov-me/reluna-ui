import React, { forwardRef, createContext, useContext, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const accordionVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'border border-neutral-200 rounded-lg',
        ghost: '',
        separated: 'space-y-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const accordionItemVariants = cva(
  'border-b border-neutral-200 last:border-b-0',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'border-b border-neutral-200 last:border-b-0',
        separated: 'border border-neutral-200 rounded-lg border-b',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 px-4 font-medium transition-all hover:underline text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'hover:bg-neutral-50',
        ghost: 'px-0 hover:no-underline',
        separated: 'hover:bg-neutral-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const accordionContentVariants = cva(
  'overflow-hidden text-sm transition-all',
  {
    variants: {
      variant: {
        default: 'px-4 pb-4',
        ghost: 'px-0 pb-4',
        separated: 'px-4 pb-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Context for Accordion
interface AccordionContextValue {
  type: 'single' | 'multiple'
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  collapsible?: boolean
  variant: 'default' | 'ghost' | 'separated'
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion')
  }
  return context
}

// Single Accordion Props
export interface AccordionSingleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  collapsible?: boolean
}

// Multiple Accordion Props
export interface AccordionMultipleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type, variant, className, children, ...props }, ref) => {
    // Always call hooks at the top level
    const [singleInternalValue, setSingleInternalValue] = useState('')
    const [multipleInternalValue, setMultipleInternalValue] = useState<string[]>([])

    // Effects for both types - always called
    React.useEffect(() => {
      if (type === 'single') {
        const { defaultValue } = props as AccordionSingleProps
        if (defaultValue && singleInternalValue === '') {
          setSingleInternalValue(defaultValue)
        }
      }
    }, [type, props, singleInternalValue])

    React.useEffect(() => {
      if (type === 'multiple') {
        const { defaultValue } = props as AccordionMultipleProps
        if (defaultValue && multipleInternalValue.length === 0) {
          setMultipleInternalValue(defaultValue)
        }
      }
    }, [type, props, multipleInternalValue.length])

    // Handle single accordion
    if (type === 'single') {
      const {
        value,
        defaultValue,
        onValueChange,
        collapsible = false,
        ...singleProps
      } = props as AccordionSingleProps

      const currentValue = value !== undefined ? value : (singleInternalValue || defaultValue || '')

      const handleValueChange = (itemValue: string) => {
        const newValue = currentValue === itemValue && collapsible ? '' : itemValue
        
        if (value === undefined) {
          setSingleInternalValue(newValue)
        }
        onValueChange?.(newValue)
      }

      return (
        <AccordionContext.Provider
          value={{
            type: 'single',
            value: currentValue,
            onValueChange: handleValueChange as (value: string | string[]) => void,
            collapsible,
            variant: variant || 'default',
          }}
        >
          <div
            ref={ref}
            className={cn(accordionVariants({ variant }), className)}
            {...singleProps}
          >
            {children}
          </div>
        </AccordionContext.Provider>
      )
    }

    // Handle multiple accordion
    const {
      value,
      defaultValue,
      onValueChange,
      ...multipleProps
    } = props as AccordionMultipleProps

    const currentValue = value !== undefined ? value : (multipleInternalValue.length > 0 ? multipleInternalValue : defaultValue || [])

    const handleValueChange = (itemValue: string) => {
      const newValue = currentValue.includes(itemValue)
        ? currentValue.filter(v => v !== itemValue)
        : [...currentValue, itemValue]
      
      if (value === undefined) {
        setMultipleInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <AccordionContext.Provider
        value={{
          type: 'multiple',
          value: currentValue,
          onValueChange: handleValueChange as (value: string | string[]) => void,
          variant: variant || 'default',
        }}
      >
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
          {...multipleProps}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = 'Accordion'

// AccordionItem component
export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, value: _value, ...props }, ref) => {
    const { variant } = useAccordion()

    return (
      <div
        ref={ref}
        className={cn(
          accordionItemVariants({ variant }),
          props.disabled && 'opacity-50 pointer-events-none',
          className
        )}
        data-state={props.disabled ? 'disabled' : 'enabled'}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

// AccordionTrigger component
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { type, value, onValueChange, variant } = useAccordion()
    const itemValue = React.useContext(AccordionItemContext)
    
    if (!itemValue) {
      throw new Error('AccordionTrigger must be used within AccordionItem')
    }

    const isOpen = type === 'single' 
      ? value === itemValue
      : Array.isArray(value) && value.includes(itemValue)

    const handleClick = () => {
      if (type === 'single') {
        ;(onValueChange as (value: string) => void)?.(itemValue)
      } else {
        ;(onValueChange as (value: string) => void)?.(itemValue)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(accordionTriggerVariants({ variant }), className)}
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        {...props}
      >
        {children}
        <svg
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )
  }
)

AccordionTrigger.displayName = 'AccordionTrigger'

// Context for AccordionItem
const AccordionItemContext = createContext<string | undefined>(undefined)

// AccordionContent component
export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { type, value, variant } = useAccordion()
    const itemValue = React.useContext(AccordionItemContext)
    
    if (!itemValue) {
      throw new Error('AccordionContent must be used within AccordionItem')
    }

    const isOpen = type === 'single' 
      ? value === itemValue
      : Array.isArray(value) && value.includes(itemValue)

    return (
      <div
        ref={ref}
        className={cn(
          accordionContentVariants({ variant }),
          !isOpen && 'hidden',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AccordionContent.displayName = 'AccordionContent'

// Enhanced AccordionItem that provides context
const EnhancedAccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={value}>
        <AccordionItem ref={ref} value={value} {...props}>
          {children}
        </AccordionItem>
      </AccordionItemContext.Provider>
    )
  }
)

EnhancedAccordionItem.displayName = 'AccordionItem'

export { 
  Accordion, 
  EnhancedAccordionItem as AccordionItem, 
  AccordionTrigger, 
  AccordionContent,
  accordionVariants 
} 