import React, { forwardRef, createContext, useContext, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const sidebarVariants = cva(
  'flex flex-col bg-white border-r border-neutral-200 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white border-neutral-200',
        dark: 'bg-neutral-900 border-neutral-800 text-white',
        ghost: 'bg-transparent border-transparent',
      },
      size: {
        sm: 'w-16',
        md: 'w-64',
        lg: 'w-80',
        full: 'w-full',
      },
      position: {
        fixed: 'fixed left-0 top-0 h-screen z-40',
        sticky: 'sticky top-0 h-screen',
        relative: 'relative',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'relative',
    },
  }
)

const sidebarItemVariants = cva(
  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
        dark: 'text-neutral-300 hover:bg-neutral-800 hover:text-white',
        ghost: 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        active: true,
        class: 'bg-primary-100 text-primary-900 border-r-2 border-primary-600',
      },
      {
        variant: 'dark',
        active: true,
        class: 'bg-primary-900 text-primary-100 border-r-2 border-primary-400',
      },
      {
        variant: 'ghost',
        active: true,
        class: 'bg-primary-50 text-primary-900',
      },
    ],
    defaultVariants: {
      variant: 'default',
      active: false,
    },
  }
)

// Context for Sidebar
interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  variant: 'default' | 'dark' | 'ghost'
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar')
  }
  return context
}

// Main Sidebar component
export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof sidebarVariants> {
  collapsible?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    position = 'relative',
    collapsible = false,
    defaultCollapsed = false,
    onCollapsedChange,
    children,
    ...props 
  }, ref) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed)
    
    const handleCollapsedChange = (newCollapsed: boolean) => {
      setCollapsed(newCollapsed)
      onCollapsedChange?.(newCollapsed)
    }

    const effectiveSize = collapsed && collapsible ? 'sm' : size

    return (
      <SidebarContext.Provider
        value={{
          collapsed: collapsed && collapsible,
          setCollapsed: handleCollapsedChange,
          variant: variant || 'default',
        }}
      >
        <div
          ref={ref}
          className={cn(
            sidebarVariants({ variant, size: effectiveSize, position }),
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)

Sidebar.displayName = 'Sidebar'

// SidebarHeader component
export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between p-4 border-b border-neutral-200',
          collapsed && 'justify-center px-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SidebarHeader.displayName = 'SidebarHeader'

// SidebarContent component
export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-y-auto p-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SidebarContent.displayName = 'SidebarContent'

// SidebarFooter component
export interface SidebarFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4 border-t border-neutral-200', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SidebarFooter.displayName = 'SidebarFooter'

// SidebarNav component
export interface SidebarNavProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('space-y-1', className)}
        {...props}
      >
        {children}
      </nav>
    )
  }
)

SidebarNav.displayName = 'SidebarNav'

// SidebarNavItem component
export interface SidebarNavItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string
  icon?: React.ReactNode
  active?: boolean
  disabled?: boolean
  badge?: string | number
  children: React.ReactNode
  asChild?: boolean
}

const SidebarNavItem = forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ 
    className,
    href,
    icon,
    active = false,
    disabled = false,
    badge,
    children,
    asChild = false,
    onClick,
    ...props 
  }, ref) => {
    const { collapsed, variant } = useSidebar()

    const content = (
      <>
        {icon && (
          <span className={cn('flex-shrink-0', collapsed ? 'mr-0' : 'mr-3')}>
            {icon}
          </span>
        )}
        {!collapsed && (
          <span className="flex-1 truncate">{children}</span>
        )}
        {!collapsed && badge && (
          <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
            {badge}
          </span>
        )}
      </>
    )

    if (asChild) {
      return (
        <div
          className={cn(
            sidebarItemVariants({ variant, active }),
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            collapsed && 'justify-center',
            className
          )}
        >
          {content}
        </div>
      )
    }

    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cn(
            sidebarItemVariants({ variant, active }),
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            collapsed && 'justify-center',
            className
          )}
          onClick={disabled ? undefined : (onClick as any)}
          {...(props as any)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref as any}
        type="button"
        className={cn(
          sidebarItemVariants({ variant, active }),
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          collapsed && 'justify-center',
          'w-full text-left',
          className
        )}
        onClick={disabled ? undefined : (onClick as any)}
        {...(props as any)}
      >
        {content}
      </button>
    )
  }
)

SidebarNavItem.displayName = 'SidebarNavItem'

// SidebarNavGroup component
export interface SidebarNavGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
}

const SidebarNavGroup = forwardRef<HTMLDivElement, SidebarNavGroupProps>(
  ({ className, title, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <div
        ref={ref}
        className={cn('space-y-1', className)}
        {...props}
      >
        {title && !collapsed && (
          <h3 className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {title}
          </h3>
        )}
        {children}
      </div>
    )
  }
)

SidebarNavGroup.displayName = 'SidebarNavGroup'

// SidebarToggle component
export interface SidebarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed, setCollapsed } = useSidebar()

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
          className
        )}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        {...props}
      >
        {children || (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'}
            />
          </svg>
        )}
      </button>
    )
  }
)

SidebarToggle.displayName = 'SidebarToggle'

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarNavGroup,
  SidebarToggle,
  sidebarVariants,
  sidebarItemVariants,
} 