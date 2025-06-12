import 'jest-axe/extend-expect'
import { configure } from '@testing-library/react'

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
} as any)

// Global accessibility test configuration
declare global {
  interface Global {
    axeConfig: {
      rules: Record<string, { enabled: boolean }>
      tags: string[]
    }
  }
}

(global as any).axeConfig = {
  rules: {
    // Disable color-contrast rule for tests (can be flaky in jsdom)
    'color-contrast': { enabled: false },
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
} 