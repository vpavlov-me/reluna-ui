import React, { forwardRef, useEffect, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'
import { useEscapeKey } from '../../../hooks/useEscapeKey'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { useFocusRing } from '../../../hooks/useFocusRing'
import { useMergedRefs } from '../../../hooks/useMergedRefs'

const modalVariants = cva(
  'fixed inset-0 z-modal flex items-center justify-center p-4',
  {
    variants: {
      size: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const modalContentVariants = cva(
  [
    'relative bg-background rounded-lg shadow-lg max-h-[90vh] overflow-hidden',
    'flex flex-col border border-border',
    'animate-in fade-in-0 zoom-in-95 duration-200'
  ],
  {
    variants: {
      size: {
        xs: 'w-full max-w-xs',
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        '2xl': 'w-full max-w-2xl',
        '3xl': 'w-full max-w-3xl',
        '4xl': 'w-full max-w-4xl',
        '5xl': 'w-full max-w-5xl',
        '6xl': 'w-full max-w-6xl',
        '7xl': 'w-full max-w-7xl',
        full: 'w-full max-w-full m-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const backdropVariants = cva(
  [
    'fixed inset-0 z-modal bg-black/50 backdrop-blur-sm',
    'animate-in fade-in-0 duration-200'
  ]
)

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  preventScroll?: boolean
  restoreFocus?: boolean
  initialFocus?: React.RefObject<HTMLElement>
  'data-testid'?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    className,
    size,
    open,
    onOpenChange,
    children,
    closeOnClickOutside = true,
    closeOnEscape = true,
    preventScroll = true,
    restoreFocus = true,
    initialFocus,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const backdropRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)
    const mergedRef = useMergedRefs(ref, modalRef)

    const onClose = () => onOpenChange(false)

    // Handle escape key
    useEscapeKey(onClose, open && closeOnEscape)

    // Handle click outside
    useClickOutside(modalRef, onClose, open && closeOnClickOutside)

    // Handle body scroll lock
    useEffect(() => {
      if (!open || !preventScroll) return

      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalStyle
      }
    }, [open, preventScroll])

    // Handle focus management
    useEffect(() => {
      if (!open) return

      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement

      // Focus the modal or initial focus element
      const focusElement = initialFocus?.current || modalRef.current
      if (focusElement) {
        // Use setTimeout to ensure the modal is rendered
        setTimeout(() => {
          focusElement.focus()
        }, 0)
      }

      return () => {
        // Restore focus when modal closes
        if (restoreFocus && previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }, [open, restoreFocus, initialFocus])

    // Handle focus trap
    useEffect(() => {
      if (!open) return

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return

        const modal = modalRef.current
        if (!modal) return

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement?.focus()
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    if (!open) return null

    return (
      <>
        {/* Backdrop */}
        <div 
          ref={backdropRef}
          className={cn(backdropVariants())}
          onClick={closeOnClickOutside ? onClose : undefined}
          aria-hidden="true"
        />
        
        {/* Modal */}
        <div 
          ref={mergedRef}
          className={cn(modalVariants({ size }), className)}
          role="dialog"
          aria-modal="true"
          data-testid={testId}
          {...props}
        >
          <div 
            className={cn(modalContentVariants({ size }))}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </>
    )
  }
)

Modal.displayName = 'Modal'

// Modal sub-components
const ModalContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 p-6 overflow-y-auto', className)}
    {...props}
  />
))
ModalContent.displayName = 'ModalContent'

const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 p-6 border-b border-border',
      className
    )}
    {...props}
  />
))
ModalHeader.displayName = 'ModalHeader'

const ModalTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-end space-x-2 p-6 border-t border-border',
      className
    )}
    {...props}
  />
))
ModalFooter.displayName = 'ModalFooter'

interface ModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const { isFocusVisible, focusProps } = useFocusRing()

    if (asChild) {
      return (
        <div className={cn('absolute right-4 top-4', className)}>
          {children}
        </div>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background',
          'transition-opacity hover:opacity-100',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:pointer-events-none',
          isFocusVisible && 'ring-2 ring-ring ring-offset-2',
          className
        )}
        aria-label="Close modal"
        {...focusProps}
        {...props}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="sr-only">Close</span>
      </button>
    )
  }
)
ModalClose.displayName = 'ModalClose'

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
  modalVariants
} 