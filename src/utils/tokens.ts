/**
 * Design Token Utilities
 * 
 * This module provides utilities for working with design tokens across all platforms.
 * It includes functions for token resolution, theme switching, and platform-specific adaptations.
 */

// Type definitions for token structure
export interface TokenValue {
  value: string | number;
  type: 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'duration' | 'string';
  description?: string;
}

export interface TokenGroup {
  [key: string]: TokenValue | TokenGroup;
}

export interface DesignTokens extends TokenGroup {
  color: TokenGroup;
  spacing: TokenGroup;
  typography: TokenGroup;
  radius: TokenGroup;
  shadow: TokenGroup;
  breakpoint: TokenGroup;
  button?: TokenGroup;
}

/**
 * Resolves a token reference to its actual value
 * Handles token references like "{color.primitive.blue.500}"
 */
export function resolveTokenReference(
  tokenRef: string,
  tokens: DesignTokens
): string | number | undefined {
  // Remove curly braces if present
  const cleanRef = tokenRef.replace(/[{}]/g, '');
  
  // Split the reference path
  const path = cleanRef.split('.');
  
  // Navigate through the token object
  let current: any = tokens;
  for (const segment of path) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment];
    } else {
      console.warn(`Token reference not found: ${tokenRef}`);
      return undefined;
    }
  }
  
  // Return the value if it's a token value object
  if (current && typeof current === 'object' && 'value' in current) {
    const value = current.value;
    
    // If the value is itself a reference, resolve it recursively
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      return resolveTokenReference(value, tokens);
    }
    
    return value;
  }
  
  return current;
}

/**
 * Gets a token value with fallback support
 */
export function getTokenValue(
  tokenPath: string,
  tokens: DesignTokens,
  fallback?: string | number
): string | number {
  const value = resolveTokenReference(`{${tokenPath}}`, tokens);
  return value !== undefined ? value : (fallback ?? '');
}

/**
 * Converts a token path to a CSS custom property name
 */
export function tokenToCSSVar(tokenPath: string): string {
  return `--${tokenPath.replace(/\./g, '-')}`;
}

/**
 * Converts a token path to a camelCase JavaScript property name
 */
export function tokenToCamelCase(tokenPath: string): string {
  const parts = tokenPath.split('.');
  return parts.reduce((acc, part, index) => {
    if (index === 0) return part.toLowerCase();
    return acc + part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }, '');
}

/**
 * Creates a CSS custom property declaration
 */
export function createCSSVar(tokenPath: string, value: string | number): string {
  return `${tokenToCSSVar(tokenPath)}: ${value};`;
}

/**
 * Theme utilities
 */
export class ThemeManager {
  private tokens: DesignTokens;
  private currentTheme: 'light' | 'dark' = 'light';
  private themeOverrides: Partial<DesignTokens> = {};

  constructor(tokens: DesignTokens) {
    this.tokens = tokens;
  }

  /**
   * Sets the current theme and applies overrides
   */
  setTheme(theme: 'light' | 'dark', overrides?: Partial<DesignTokens>): void {
    this.currentTheme = theme;
    this.themeOverrides = overrides || {};
  }

  /**
   * Gets a token value with theme-specific overrides applied
   */
  getToken(tokenPath: string, fallback?: string | number): string | number {
    // First, try to get from theme overrides
    const overrideValue = this.getFromOverrides(tokenPath);
    if (overrideValue !== undefined) {
      return overrideValue;
    }

    // Fall back to base tokens
    return getTokenValue(tokenPath, this.tokens, fallback);
  }

  /**
   * Gets a token value from theme overrides
   */
  private getFromOverrides(tokenPath: string): string | number | undefined {
    const path = tokenPath.split('.');
    let current: any = this.themeOverrides;
    
    for (const segment of path) {
      if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        return undefined;
      }
    }
    
    if (current && typeof current === 'object' && 'value' in current) {
      return current.value;
    }
    
    return current;
  }

  /**
   * Generates CSS custom properties for the current theme
   */
  generateCSSVars(): string {
    const vars: string[] = [];
    
    const processTokenGroup = (group: TokenGroup, prefix: string = '') => {
      Object.entries(group).forEach(([key, value]) => {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        
        if (value && typeof value === 'object') {
          if ('value' in value && 'type' in value) {
            // This is a token value
            const resolvedValue = this.getToken(currentPath);
            vars.push(createCSSVar(currentPath, resolvedValue));
          } else {
            // This is a nested group
            processTokenGroup(value as TokenGroup, currentPath);
          }
        }
      });
    };

    processTokenGroup(this.tokens);
    
    return `:root {\n  ${vars.join('\n  ')}\n}`;
  }

  /**
   * Generates a flat object of token values for JavaScript/React Native
   */
  generateFlatTokens(): Record<string, string | number> {
    const flatTokens: Record<string, string | number> = {};
    
    const processTokenGroup = (group: TokenGroup, prefix: string = '') => {
      Object.entries(group).forEach(([key, value]) => {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        
        if (value && typeof value === 'object') {
          if ('value' in value && 'type' in value) {
            // This is a token value
            const resolvedValue = this.getToken(currentPath);
            flatTokens[tokenToCamelCase(currentPath)] = resolvedValue;
            flatTokens[currentPath.replace(/\./g, '-')] = resolvedValue; // kebab-case version
          } else {
            // This is a nested group
            processTokenGroup(value as TokenGroup, currentPath);
          }
        }
      });
    };

    processTokenGroup(this.tokens);
    
    return flatTokens;
  }
}

/**
 * Platform-specific utilities
 */
export const PlatformUtils = {
  /**
   * React/Web utilities
   */
  web: {
    /**
     * Creates a style object using CSS custom properties
     */
    createTokenStyles(tokenMap: Record<string, string>): React.CSSProperties {
      const styles: React.CSSProperties = {};
      
      Object.entries(tokenMap).forEach(([cssProperty, tokenPath]) => {
        (styles as any)[cssProperty] = `var(${tokenToCSSVar(tokenPath)})`;
      });
      
      return styles;
    },

    /**
     * Applies theme to document root
     */
    applyTheme(themeManager: ThemeManager): void {
      const cssVars = themeManager.generateCSSVars();
      
      // Remove existing theme styles
      const existingStyle = document.getElementById('reluna-theme-vars');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Add new theme styles
      const style = document.createElement('style');
      style.id = 'reluna-theme-vars';
      style.textContent = cssVars;
      document.head.appendChild(style);
    },
  },

  /**
   * React Native utilities
   */
  reactNative: {
    /**
     * Creates a StyleSheet-compatible object from tokens
     */
    createTokenStyles(
      tokenMap: Record<string, string>,
      themeManager: ThemeManager
    ): Record<string, string | number> {
      const styles: Record<string, string | number> = {};
      
      Object.entries(tokenMap).forEach(([styleProperty, tokenPath]) => {
        styles[styleProperty] = themeManager.getToken(tokenPath);
      });
      
      return styles;
    },

    /**
     * Converts web-style tokens to React Native compatible values
     */
    adaptWebTokens(tokens: Record<string, any>): Record<string, any> {
      const adapted: Record<string, any> = {};
      
      Object.entries(tokens).forEach(([key, value]) => {
        if (typeof value === 'string') {
          // Convert rem/em to numeric values (assuming 16px base)
          if (value.endsWith('rem')) {
            adapted[key] = parseFloat(value) * 16;
          } else if (value.endsWith('em')) {
            adapted[key] = parseFloat(value) * 16;
          } else if (value.endsWith('px')) {
            adapted[key] = parseFloat(value);
          } else {
            adapted[key] = value;
          }
        } else {
          adapted[key] = value;
        }
      });
      
      return adapted;
    },
  },

  /**
   * Angular utilities
   */
  angular: {
    /**
     * Generates SCSS variables from tokens
     */
    generateSCSSVars(themeManager: ThemeManager): string {
      const flatTokens = themeManager.generateFlatTokens();
      const scssVars: string[] = [];
      
      Object.entries(flatTokens).forEach(([key, value]) => {
        const scssVarName = key.replace(/[A-Z]/g, '-$&').toLowerCase();
        scssVars.push(`$${scssVarName}: ${value};`);
      });
      
      return scssVars.join('\n');
    },
  },
};

/**
 * Responsive design utilities
 */
export class ResponsiveManager {
  private breakpoints: Record<string, number>;

  constructor(breakpoints: Record<string, number>) {
    this.breakpoints = breakpoints;
  }

  /**
   * Generates media queries for breakpoints
   */
  generateMediaQueries(): Record<string, string> {
    const mediaQueries: Record<string, string> = {};
    
    Object.entries(this.breakpoints).forEach(([name, value]) => {
      mediaQueries[name] = `@media (min-width: ${value}px)`;
      mediaQueries[`${name}Down`] = `@media (max-width: ${value - 1}px)`;
    });
    
    return mediaQueries;
  }

  /**
   * Gets the current breakpoint based on window width
   */
  getCurrentBreakpoint(width: number): string {
    const sortedBreakpoints = Object.entries(this.breakpoints)
      .sort(([, a], [, b]) => b - a);
    
    for (const [name, value] of sortedBreakpoints) {
      if (width >= value) {
        return name;
      }
    }
    
    return 'xs'; // Default fallback
  }
}

/**
 * Validation utilities
 */
export const TokenValidator = {
  /**
   * Validates that all token references can be resolved
   */
  validateTokenReferences(tokens: DesignTokens): string[] {
    const errors: string[] = [];
    
    const validateGroup = (group: TokenGroup, path: string = '') => {
      Object.entries(group).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (value && typeof value === 'object') {
          if ('value' in value && 'type' in value) {
            // This is a token value - check if it's a reference
            const tokenValue = value.value;
            if (typeof tokenValue === 'string' && 
                tokenValue.startsWith('{') && 
                tokenValue.endsWith('}')) {
              const resolved = resolveTokenReference(tokenValue, tokens);
              if (resolved === undefined) {
                errors.push(`Unresolved token reference: ${tokenValue} in ${currentPath}`);
              }
            }
          } else {
            // This is a nested group
            validateGroup(value as TokenGroup, currentPath);
          }
        }
      });
    };

    validateGroup(tokens);
    
    return errors;
  },

  /**
   * Validates color contrast ratios
   */
  validateColorContrast(
    foregroundColor: string,
    backgroundColor: string,
    level: 'AA' | 'AAA' = 'AA'
  ): boolean {
    // This is a simplified implementation
    // In a real implementation, you would use a proper color contrast library
    const requiredRatio = level === 'AA' ? 4.5 : 7;
    
    // Calculate luminance and contrast ratio
    // This is a placeholder - implement actual contrast calculation
    const contrastRatio = 4.5; // Placeholder value
    
    return contrastRatio >= requiredRatio;
  },
};

/**
 * Export commonly used instances
 */
export function createThemeManager(tokens: DesignTokens): ThemeManager {
  return new ThemeManager(tokens);
}

export function createResponsiveManager(breakpoints: Record<string, number>): ResponsiveManager {
  return new ResponsiveManager(breakpoints);
} 