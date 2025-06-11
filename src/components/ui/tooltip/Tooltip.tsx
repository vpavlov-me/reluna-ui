import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const tooltipVariants = cva(
  'absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white border-neutral-800',
        light: 'bg-white text-neutral-900 border-neutral-200 shadow-lg',
        error: 'bg-error-600 text-white border-error-700',
        success: 'bg-success-600 text-white border-success-700',
        warning: 'bg-warning-600 text-white border-warning-700',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const arrowVariants = cva(
  'absolute w-2 h-2 rotate-45',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 border-neutral-800',
        light: 'bg-white border-neutral-200',
        error: 'bg-error-600 border-error-700',
        success: 'bg-success-600 border-success-700',
        warning: 'bg-warning-600 border-warning-700',
      },
      side: {
        top: 'bottom-[-4px] border-r border-b',
        bottom: 'top-[-4px] border-l border-t',
        left: 'right-[-4px] border-t border-r',
        right: 'left-[-4px] border-b border-l',
      },
    },
    defaultVariants: {
      variant: 'default',
      side: 'top',
    },
  }
)

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'
type TooltipAlign = 'start' | 'center' | 'end'

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode
  side?: TooltipSide
  align?: TooltipAlign
  offset?: number
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
  disabled?: boolean
  children: React.ReactNode
  asChild?: boolean
  arrow?: boolean
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    content,
    side = 'top',
    align = 'center',
    offset = 4,
    delayDuration = 700,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    disabled = false,
    children,
    arrow = true,
    ...props 
  }, _ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const triggerRef = useRef<HTMLElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout>()
    const skipTimeoutRef = useRef<NodeJS.Timeout>()
    const [skipDelay, setSkipDelay] = useState(false)

    // Calculate tooltip position
    const calculatePosition = React.useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      let x = 0
      let y = 0

      // Calculate base position based on side
      switch (side) {
        case 'top':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          y = triggerRect.top - tooltipRect.height - offset
          break
        case 'bottom':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          y = triggerRect.bottom + offset
          break
        case 'left':
          x = triggerRect.left - tooltipRect.width - offset
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          break
        case 'right':
          x = triggerRect.right + offset
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          break
      }

      // Adjust for alignment
      if (side === 'top' || side === 'bottom') {
        switch (align) {
          case 'start':
            x = triggerRect.left
            break
          case 'end':
            x = triggerRect.right - tooltipRect.width
            break
        }
      } else {
        switch (align) {
          case 'start':
            y = triggerRect.top
            break
          case 'end':
            y = triggerRect.bottom - tooltipRect.height
            break
        }
      }

      // Keep tooltip within viewport
      x = Math.max(8, Math.min(x, viewport.width - tooltipRect.width - 8))
      y = Math.max(8, Math.min(y, viewport.height - tooltipRect.height - 8))

      setPosition({ x, y })
    }, [side, align, offset])

    // Show tooltip
    const showTooltip = React.useCallback(() => {
      if (disabled) return

      if (skipDelay) {
        setIsVisible(true)
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(true)
        }, delayDuration)
      }
    }, [disabled, skipDelay, delayDuration])

    // Hide tooltip
    const hideTooltip = React.useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(false)
      
      // Set skip delay for next show
      setSkipDelay(true)
      skipTimeoutRef.current = setTimeout(() => {
        setSkipDelay(false)
      }, skipDelayDuration)
    }, [skipDelayDuration])

    // Update position when visible
    useEffect(() => {
      if (isVisible) {
        calculatePosition()
        
        const handleResize = () => calculatePosition()
        const handleScroll = () => calculatePosition()
        
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll, true)
        
        return () => {
          window.removeEventListener('resize', handleResize)
          window.removeEventListener('scroll', handleScroll, true)
        }
      }
    }, [isVisible, calculatePosition])

    // Cleanup timeouts
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        if (skipTimeoutRef.current) clearTimeout(skipTimeoutRef.current)
      }
    }, [])

    // Clone trigger element to add event handlers
    const triggerElement = React.cloneElement(
      React.Children.only(children) as React.ReactElement,
      {
        ref: triggerRef,
        onMouseEnter: (e: React.MouseEvent) => {
          showTooltip()
          const originalHandler = (children as React.ReactElement).props.onMouseEnter
          originalHandler?.(e)
        },
        onMouseLeave: (e: React.MouseEvent) => {
          if (!disableHoverableContent) {
            hideTooltip()
          }
          const originalHandler = (children as React.ReactElement).props.onMouseLeave
          originalHandler?.(e)
        },
        onFocus: (e: React.FocusEvent) => {
          showTooltip()
          const originalHandler = (children as React.ReactElement).props.onFocus
          originalHandler?.(e)
        },
        onBlur: (e: React.FocusEvent) => {
          hideTooltip()
          const originalHandler = (children as React.ReactElement).props.onBlur
          originalHandler?.(e)
        },
      }
    )

    return (
      <>
        {triggerElement}
        
        {isVisible && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(tooltipVariants({ variant, size }), className)}
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              zIndex: 50,
            }}
            onMouseEnter={disableHoverableContent ? undefined : () => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
              }
            }}
            onMouseLeave={disableHoverableContent ? undefined : hideTooltip}
            {...props}
          >
            {content}
            
            {arrow && (
              <div
                className={cn(arrowVariants({ variant, side }))}
                style={{
                  left: side === 'left' || side === 'right' ? undefined : '50%',
                  top: side === 'top' || side === 'bottom' ? undefined : '50%',
                  transform: 
                    side === 'left' || side === 'right' 
                      ? 'translateY(-50%)' 
                      : 'translateX(-50%)',
                }}
              />
            )}
          </div>
        )}
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export { Tooltip, tooltipVariants } 