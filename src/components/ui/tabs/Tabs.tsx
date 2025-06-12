import React, { forwardRef, createContext, useContext, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const tabsListVariants = cva(
  'inline-flex items-center justify-center rounded-md p-1',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-500',
        underline: 'border-b border-neutral-200',
        pills: 'bg-neutral-100 p-1',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 rounded-none',
        pills: 'data-[state=active]:bg-primary-500 data-[state=active]:text-white hover:bg-neutral-200 data-[state=active]:hover:bg-primary-600',
      },
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

// Context for managing tab state
interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  variant: 'default' | 'underline' | 'pills'
  size: 'sm' | 'md' | 'lg'
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

// Main Tabs component
export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    value,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    children,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '')
    const currentValue = value !== undefined ? value : internalValue
    
    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <TabsContext.Provider 
        value={{ 
          value: currentValue, 
          onValueChange: handleValueChange,
          variant: variant || 'default',
          size: size || 'md'
        }}
      >
        <div
          ref={ref}
          className={cn(
            'w-full',
            orientation === 'vertical' && 'flex gap-4',
            className
          )}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = 'Tabs'

// TabsList component
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    const { variant, size } = useTabsContext()
    
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

TabsList.displayName = 'TabsList'

// TabsTrigger component
export interface TabsTriggerProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, variant, size } = useTabsContext()
    const isActive = selectedValue === value

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(tabsTriggerVariants({ variant, size }), className)}
        onClick={() => onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'

// TabsContent component
export interface TabsContentProps 
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext()
    const isActive = selectedValue === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsContent.displayName = 'TabsContent'

export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants 
} 