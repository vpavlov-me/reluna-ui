import React, { forwardRef, createContext, useContext, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const navbarVariants = cva(
  'flex items-center justify-between w-full px-4 py-3 border-b transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white border-neutral-200',
        dark: 'bg-neutral-900 border-neutral-800 text-white',
        ghost: 'bg-transparent border-transparent',
        primary: 'bg-primary-600 border-primary-700 text-white',
      },
      size: {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
      },
      position: {
        static: 'static',
        fixed: 'fixed top-0 left-0 right-0 z-50',
        sticky: 'sticky top-0 z-40',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'static',
    },
  }
)

const navbarItemVariants = cva(
  'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
        dark: 'text-neutral-300 hover:bg-neutral-800 hover:text-white',
        ghost: 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
        primary: 'text-white hover:bg-white/10',
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
        class: 'bg-primary-100 text-primary-900',
      },
      {
        variant: 'dark',
        active: true,
        class: 'bg-primary-900 text-primary-100',
      },
      {
        variant: 'ghost',
        active: true,
        class: 'bg-primary-50 text-primary-900',
      },
      {
        variant: 'primary',
        active: true,
        class: 'bg-white/20 text-white',
      },
    ],
    defaultVariants: {
      variant: 'default',
      active: false,
    },
  }
)

// Context for Navbar
interface NavbarContextValue {
  variant: 'default' | 'dark' | 'ghost' | 'primary'
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const NavbarContext = createContext<NavbarContextValue | undefined>(undefined)

const useNavbar = () => {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error('Navbar components must be used within a Navbar')
  }
  return context
}

// Main Navbar component
export interface NavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'size'>,
    VariantProps<typeof navbarVariants> {
  children: React.ReactNode
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    position = 'static',
    children,
    ...props 
  }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
      <NavbarContext.Provider
        value={{
          variant: variant || 'default',
          mobileMenuOpen,
          setMobileMenuOpen,
        }}
      >
        <nav
          ref={ref}
          className={cn(navbarVariants({ variant, size, position }), className)}
          {...props}
        >
          {children}
        </nav>
      </NavbarContext.Provider>
    )
  }
)

Navbar.displayName = 'Navbar'

// NavbarBrand component
export interface NavbarBrandProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  href?: string
}

const NavbarBrand = forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, children, href, ...props }, ref) => {
    if (href) {
      return (
        <a
          href={href}
          className={cn('flex items-center space-x-2 font-bold text-lg', className)}
        >
          {children}
        </a>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center space-x-2 font-bold text-lg', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

NavbarBrand.displayName = 'NavbarBrand'

// NavbarContent component
export interface NavbarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  justify?: 'start' | 'center' | 'end' | 'between'
}

const NavbarContent = forwardRef<HTMLDivElement, NavbarContentProps>(
  ({ className, children, justify = 'start', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          justify === 'start' && 'justify-start',
          justify === 'center' && 'justify-center',
          justify === 'end' && 'justify-end',
          justify === 'between' && 'justify-between',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

NavbarContent.displayName = 'NavbarContent'

// NavbarNav component
export interface NavbarNavProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const NavbarNav = forwardRef<HTMLDivElement, NavbarNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('hidden md:flex items-center space-x-1', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

NavbarNav.displayName = 'NavbarNav'

// NavbarNavItem component
export interface NavbarNavItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  asChild?: boolean
}

const NavbarNavItem = forwardRef<HTMLAnchorElement, NavbarNavItemProps>(
  ({ 
    className,
    href,
    active = false,
    disabled = false,
    children,
    asChild = false,
    ...props 
  }, ref) => {
    const { variant } = useNavbar()

    if (asChild) {
      return (
        <div
          className={cn(
            navbarItemVariants({ variant, active }),
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            className
          )}
        >
          {children}
        </div>
      )
    }

          if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cn(
            navbarItemVariants({ variant, active }),
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            className
          )}
          {...(props as any)}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref as any}
        type="button"
        className={cn(
          navbarItemVariants({ variant, active }),
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          'border-0 bg-transparent',
          className
        )}
        {...(props as any)}
      >
        {children}
      </button>
    )
  }
)

NavbarNavItem.displayName = 'NavbarNavItem'

// NavbarMobileToggle component
export interface NavbarMobileToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

const NavbarMobileToggle = forwardRef<HTMLButtonElement, NavbarMobileToggleProps>(
  ({ className, children, ...props }, ref) => {
    const { mobileMenuOpen, setMobileMenuOpen } = useNavbar()

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
          className
        )}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        {...props}
      >
        {children || (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        )}
      </button>
    )
  }
)

NavbarMobileToggle.displayName = 'NavbarMobileToggle'

// NavbarMobileMenu component
export interface NavbarMobileMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const NavbarMobileMenu = forwardRef<HTMLDivElement, NavbarMobileMenuProps>(
  ({ className, children, ...props }, ref) => {
    const { mobileMenuOpen, variant } = useNavbar()

    if (!mobileMenuOpen) return null

    return (
      <div
        ref={ref}
        className={cn(
          'md:hidden absolute top-full left-0 right-0 border-b shadow-lg',
          variant === 'default' && 'bg-white border-neutral-200',
          variant === 'dark' && 'bg-neutral-900 border-neutral-800',
          variant === 'ghost' && 'bg-white border-neutral-200',
          variant === 'primary' && 'bg-primary-600 border-primary-700',
          className
        )}
        {...props}
      >
        <div className="px-4 py-3 space-y-1">
          {children}
        </div>
      </div>
    )
  }
)

NavbarMobileMenu.displayName = 'NavbarMobileMenu'

// NavbarMobileNavItem component
export interface NavbarMobileNavItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
}

const NavbarMobileNavItem = forwardRef<HTMLAnchorElement, NavbarMobileNavItemProps>(
  ({ 
    className,
    href,
    active = false,
    disabled = false,
    children,
    ...props 
  }, ref) => {
    const { variant, setMobileMenuOpen } = useNavbar()

    const handleClick = (e: React.MouseEvent) => {
      if (!disabled) {
        setMobileMenuOpen(false)
        props.onClick?.(e as any)
      }
    }

    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cn(
            'block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors',
            variant === 'default' && 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
            variant === 'dark' && 'text-neutral-300 hover:bg-neutral-800 hover:text-white',
            variant === 'ghost' && 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
            variant === 'primary' && 'text-white hover:bg-white/10',
            active && variant === 'default' && 'bg-primary-100 text-primary-900',
            active && variant === 'dark' && 'bg-primary-900 text-primary-100',
            active && variant === 'ghost' && 'bg-primary-50 text-primary-900',
            active && variant === 'primary' && 'bg-white/20 text-white',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            className
          )}
          onClick={handleClick as any}
          {...(props as any)}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref as any}
        type="button"
        className={cn(
          'block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors',
          variant === 'default' && 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
          variant === 'dark' && 'text-neutral-300 hover:bg-neutral-800 hover:text-white',
          variant === 'ghost' && 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
          variant === 'primary' && 'text-white hover:bg-white/10',
          active && variant === 'default' && 'bg-primary-100 text-primary-900',
          active && variant === 'dark' && 'bg-primary-900 text-primary-100',
          active && variant === 'ghost' && 'bg-primary-50 text-primary-900',
          active && variant === 'primary' && 'bg-white/20 text-white',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          'border-0 bg-transparent',
          className
        )}
        onClick={handleClick as any}
        {...(props as any)}
      >
        {children}
      </button>
    )
  }
)

NavbarMobileNavItem.displayName = 'NavbarMobileNavItem'

// NavbarActions component
export interface NavbarActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const NavbarActions = forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center space-x-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

NavbarActions.displayName = 'NavbarActions'

export {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarNav,
  NavbarNavItem,
  NavbarMobileToggle,
  NavbarMobileMenu,
  NavbarMobileNavItem,
  NavbarActions,
  navbarVariants,
  navbarItemVariants,
} 