import { useEffect, useRef } from 'react'

/**
 * Hook for adding event listeners with automatic cleanup
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: Element | Window | null,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = element ?? window
    if (!targetElement?.addEventListener) return

    const eventListener = (event: Event) => savedHandler.current(event as WindowEventMap[K])
    
    targetElement.addEventListener(eventName, eventListener, options)

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, element, options])
} 