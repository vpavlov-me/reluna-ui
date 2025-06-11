import { useState, useEffect } from 'react'

/**
 * Hook for managing focus ring visibility based on keyboard navigation
 */
export function useFocusRing() {
  const [isFocusVisible, setIsFocusVisible] = useState(false)
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') {
        setIsKeyboardUser(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardUser(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const focusProps = {
    onFocus: () => {
      if (isKeyboardUser) {
        setIsFocusVisible(true)
      }
    },
    onBlur: () => {
      setIsFocusVisible(false)
    }
  }

  return {
    isFocusVisible,
    focusProps
  }
} 