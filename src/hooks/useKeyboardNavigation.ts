import { useCallback, useRef } from 'react'

export interface UseKeyboardNavigationProps {
  onEnter?: () => void
  onSpace?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onHome?: () => void
  onEnd?: () => void
}

/**
 * Hook for handling keyboard navigation
 */
export function useKeyboardNavigation({
  onEnter,
  onSpace,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onHome,
  onEnd
}: UseKeyboardNavigationProps) {
  const handlersRef = useRef({
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd
  })

  handlersRef.current = {
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd
  }

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key } = event
    const handlers = handlersRef.current

    switch (key) {
      case 'Enter':
        if (handlers.onEnter) {
          event.preventDefault()
          handlers.onEnter()
        }
        break
      case ' ':
        if (handlers.onSpace) {
          event.preventDefault()
          handlers.onSpace()
        }
        break
      case 'Escape':
        if (handlers.onEscape) {
          event.preventDefault()
          handlers.onEscape()
        }
        break
      case 'ArrowUp':
        if (handlers.onArrowUp) {
          event.preventDefault()
          handlers.onArrowUp()
        }
        break
      case 'ArrowDown':
        if (handlers.onArrowDown) {
          event.preventDefault()
          handlers.onArrowDown()
        }
        break
      case 'ArrowLeft':
        if (handlers.onArrowLeft) {
          event.preventDefault()
          handlers.onArrowLeft()
        }
        break
      case 'ArrowRight':
        if (handlers.onArrowRight) {
          event.preventDefault()
          handlers.onArrowRight()
        }
        break
      case 'Home':
        if (handlers.onHome) {
          event.preventDefault()
          handlers.onHome()
        }
        break
      case 'End':
        if (handlers.onEnd) {
          event.preventDefault()
          handlers.onEnd()
        }
        break
    }
  }, [])

  return { handleKeyDown }
} 