import { useCallback, useRef, useState } from 'react'

export interface UseControllableStateProps<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

/**
 * Hook for managing controlled/uncontrolled state
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange
}: UseControllableStateProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const setter = nextValue as (prev: T) => T
      const nextValueUnwrapped = typeof nextValue === 'function' ? setter(currentValue as T) : nextValue

      if (!isControlled) {
        setUncontrolledValue(nextValueUnwrapped)
      }

      onChangeRef.current?.(nextValueUnwrapped)
    },
    [isControlled, currentValue]
  )

  return [currentValue, setValue] as const
} 