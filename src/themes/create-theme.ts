import { Theme } from '../types'
import { lightTheme } from './light'

/**
 * Creates a custom theme by merging with the base light theme
 * @param customTheme - Partial theme configuration to override defaults
 * @returns Complete theme object
 */
export function createTheme(customTheme: Partial<Theme>): Theme {
  return {
    ...lightTheme,
    ...customTheme,
    colors: {
      ...lightTheme.colors,
      ...customTheme.colors
    },
    typography: {
      ...lightTheme.typography,
      ...customTheme.typography
    },
    spacing: {
      ...lightTheme.spacing,
      ...customTheme.spacing
    },
    borderRadius: {
      ...lightTheme.borderRadius,
      ...customTheme.borderRadius
    },
    shadows: {
      ...lightTheme.shadows,
      ...customTheme.shadows
    }
  }
} 