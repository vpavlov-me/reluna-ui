import { useMemo } from 'react'

type PossibleRef<T> = React.Ref<T> | undefined

/**
 * Hook for merging multiple refs into one
 */
export function useMergedRefs<T = any>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return () => {}
    }
    
    return (value: T) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(value)
        } else if (ref != null) {
          ;(ref as React.MutableRefObject<T | null>).current = value
        }
      })
    }
  }, refs)
} 