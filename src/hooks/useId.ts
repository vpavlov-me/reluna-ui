import { useId as useReactId } from 'react'

/**
 * Hook for generating unique IDs with optional prefix
 */
export function useId(prefix?: string): string {
  const id = useReactId()
  return prefix ? `${prefix}-${id}` : id
} 