# Advanced React Native Integration with Reluna Design System

## Overview

This guide demonstrates how to effectively integrate Reluna Design System tokens and patterns into React Native applications, including theming, responsive design, and platform-specific adaptations.

## Installation & Setup

### 1. Install Dependencies

```bash
npm install @reluna/ui
# React Native specific dependencies
npm install react-native-vector-icons
npm install react-native-svg
npm install @react-native-async-storage/async-storage
```

### 2. Token Integration

```typescript
// src/tokens/index.ts
import { tokens } from '@reluna/ui/tokens/build/react-native/tokens.json';

// Transform tokens for React Native StyleSheet
export const designTokens = {
  colors: tokens.color,
  spacing: tokens.spacing,
  typography: tokens.typography,
  radius: tokens.radius,
  shadows: tokens.shadow,
  breakpoints: tokens.breakpoint,
};

// Create theme-aware token access
export const createThemeTokens = (theme: 'light' | 'dark') => ({
  ...designTokens,
  // Override with theme-specific tokens
  colors: {
    ...designTokens.colors,
    ...(theme === 'dark' ? tokens.themes?.dark?.color || {} : {}),
  },
});

export type DesignTokens = typeof designTokens;
```

### 3. Theme Provider Setup

```typescript
// src/providers/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createThemeTokens, DesignTokens } from '../tokens';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  tokens: DesignTokens;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'reluna-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  const resolvedTheme = theme === 'auto' 
    ? (systemTheme === 'dark' ? 'dark' : 'light')
    : theme;

  const tokens = createThemeTokens(resolvedTheme);

  useEffect(() => {
    // Load saved theme
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((savedTheme) => {
      if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
        setThemeState(savedTheme as Theme);
      }
    });

    // Listen to system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, tokens, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

## Token-Based Component Development

### 1. Button Component with Design Tokens

```typescript
// src/components/Button/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onPress,
  children,
  style,
  textStyle,
}) => {
  const { tokens } = useTheme();

  const buttonStyles = createButtonStyles(tokens);
  
  const containerStyle = [
    buttonStyles.base,
    buttonStyles.variants[variant],
    buttonStyles.sizes[size],
    disabled && buttonStyles.disabled,
    style,
  ];

  const textStyles = [
    buttonStyles.text,
    buttonStyles.textVariants[variant],
    buttonStyles.textSizes[size],
    disabled && buttonStyles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={buttonStyles.textVariants[variant].color} 
        />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const createButtonStyles = (tokens: any) => StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.button?.borderRadius || tokens.radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  variants: {
    primary: {
      backgroundColor: tokens.button?.primary?.background?.default || tokens.colors.primitive.blue[500],
      borderColor: tokens.button?.primary?.border?.default || 'transparent',
    },
    secondary: {
      backgroundColor: tokens.button?.secondary?.background?.default || 'transparent',
      borderColor: tokens.button?.secondary?.border?.default || tokens.colors.primitive.gray[300],
    },
    success: {
      backgroundColor: tokens.button?.variants?.success?.background?.default || tokens.colors.primitive.green[500],
    },
    warning: {
      backgroundColor: tokens.button?.variants?.warning?.background?.default || tokens.colors.primitive.yellow[500],
    },
    danger: {
      backgroundColor: tokens.button?.variants?.danger?.background?.default || tokens.colors.primitive.red[500],
    },
  },
  sizes: {
    small: {
      paddingHorizontal: tokens.button?.size?.small?.padding?.horizontal || tokens.spacing[3],
      paddingVertical: tokens.button?.size?.small?.padding?.vertical || tokens.spacing[1],
      minHeight: tokens.button?.size?.small?.height || tokens.spacing[8],
    },
    medium: {
      paddingHorizontal: tokens.button?.size?.medium?.padding?.horizontal || tokens.spacing[4],
      paddingVertical: tokens.button?.size?.medium?.padding?.vertical || tokens.spacing[2],
      minHeight: tokens.button?.size?.medium?.height || tokens.spacing[10],
    },
    large: {
      paddingHorizontal: tokens.button?.size?.large?.padding?.horizontal || tokens.spacing[6],
      paddingVertical: tokens.button?.size?.large?.padding?.vertical || tokens.spacing[3],
      minHeight: tokens.button?.size?.large?.height || tokens.spacing[12],
    },
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: tokens.typography?.fontWeight?.medium || '500',
    textAlign: 'center',
  },
  textVariants: {
    primary: {
      color: tokens.button?.primary?.text?.default || tokens.colors.primitive.white,
    },
    secondary: {
      color: tokens.button?.secondary?.text?.default || tokens.colors.primitive.gray[700],
    },
    success: {
      color: tokens.button?.variants?.success?.text?.default || tokens.colors.primitive.white,
    },
    warning: {
      color: tokens.button?.variants?.warning?.text?.default || tokens.colors.primitive.white,
    },
    danger: {
      color: tokens.button?.variants?.danger?.text?.default || tokens.colors.primitive.white,
    },
  },
  textSizes: {
    small: {
      fontSize: tokens.button?.size?.small?.fontSize || tokens.typography.fontSize.xs,
    },
    medium: {
      fontSize: tokens.button?.size?.medium?.fontSize || tokens.typography.fontSize.sm,
    },
    large: {
      fontSize: tokens.button?.size?.large?.fontSize || tokens.typography.fontSize.base,
    },
  },
  textDisabled: {
    opacity: 0.7,
  },
});
```

### 2. Input Component with Token Integration

```typescript
// src/components/Input/Input.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'error';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  size = 'medium',
  variant = 'default',
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const { tokens } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  
  const styles = createInputStyles(tokens);
  const currentVariant = error ? 'error' : variant;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, styles.labelSizes[size], labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        {...textInputProps}
        style={[
          styles.input,
          styles.inputSizes[size],
          styles.inputVariants[currentVariant],
          isFocused && styles.inputFocused,
          inputStyle,
        ]}
        onFocus={(e) => {
          setIsFocused(true);
          textInputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          textInputProps.onBlur?.(e);
        }}
        placeholderTextColor={tokens.colors?.primitive?.gray?.[400] || '#9CA3AF'}
      />
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {hint && !error && (
        <Text style={styles.hintText}>{hint}</Text>
      )}
    </View>
  );
};

const createInputStyles = (tokens: any) => StyleSheet.create({
  container: {
    marginBottom: tokens.spacing[4] || 16,
  },
  label: {
    fontWeight: tokens.typography?.fontWeight?.medium || '500',
    color: tokens.colors?.semantic?.text?.primary || tokens.colors?.primitive?.gray?.[700] || '#374151',
    marginBottom: tokens.spacing[1] || 4,
  },
  labelSizes: {
    small: {
      fontSize: tokens.typography?.fontSize?.xs || 12,
    },
    medium: {
      fontSize: tokens.typography?.fontSize?.sm || 14,
    },
    large: {
      fontSize: tokens.typography?.fontSize?.base || 16,
    },
  },
  input: {
    borderWidth: 1,
    borderRadius: tokens.radius?.md || 6,
    paddingHorizontal: tokens.spacing[3] || 12,
    backgroundColor: tokens.colors?.semantic?.background?.primary || tokens.colors?.primitive?.white || '#FFFFFF',
    color: tokens.colors?.semantic?.text?.primary || tokens.colors?.primitive?.gray?.[900] || '#111827',
    fontSize: tokens.typography?.fontSize?.base || 16,
  },
  inputSizes: {
    small: {
      paddingVertical: tokens.spacing[2] || 8,
      fontSize: tokens.typography?.fontSize?.sm || 14,
    },
    medium: {
      paddingVertical: tokens.spacing[3] || 12,
      fontSize: tokens.typography?.fontSize?.base || 16,
    },
    large: {
      paddingVertical: tokens.spacing[4] || 16,
      fontSize: tokens.typography?.fontSize?.lg || 18,
    },
  },
  inputVariants: {
    default: {
      borderColor: tokens.colors?.primitive?.gray?.[300] || '#D1D5DB',
    },
    error: {
      borderColor: tokens.colors?.primitive?.red?.[500] || '#EF4444',
    },
  },
  inputFocused: {
    borderColor: tokens.colors?.primitive?.blue?.[500] || '#3B82F6',
    borderWidth: 2,
  },
  errorText: {
    color: tokens.colors?.primitive?.red?.[500] || '#EF4444',
    fontSize: tokens.typography?.fontSize?.sm || 14,
    marginTop: tokens.spacing[1] || 4,
  },
  hintText: {
    color: tokens.colors?.primitive?.gray?.[500] || '#6B7280',
    fontSize: tokens.typography?.fontSize?.sm || 14,
    marginTop: tokens.spacing[1] || 4,
  },
});
```

### 3. Responsive Design Hook

```typescript
// src/hooks/useResponsive.ts
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useResponsive = () => {
  const { tokens } = useTheme();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const getCurrentBreakpoint = (): Breakpoint => {
    const { width } = dimensions;
    const breakpoints = tokens.breakpoints || {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    };

    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const isBreakpoint = (breakpoint: Breakpoint): boolean => {
    return getCurrentBreakpoint() === breakpoint;
  };

  const isBreakpointUp = (breakpoint: Breakpoint): boolean => {
    const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpoints.indexOf(getCurrentBreakpoint());
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  };

  const isBreakpointDown = (breakpoint: Breakpoint): boolean => {
    const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpoints.indexOf(getCurrentBreakpoint());
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex <= targetIndex;
  };

  return {
    dimensions,
    currentBreakpoint: getCurrentBreakpoint(),
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    isMobile: isBreakpointDown('sm'),
    isTablet: isBreakpoint('md') || isBreakpoint('lg'),
    isDesktop: isBreakpointUp('xl'),
  };
};
```

### 4. Platform-Specific Adaptations

```typescript
// src/components/Card/Card.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  const { tokens } = useTheme();
  const styles = createCardStyles(tokens);

  return (
    <View style={[styles.base, styles.variants[variant], style]}>
      {children}
    </View>
  );
};

const createCardStyles = (tokens: any) => {
  const baseShadow = Platform.select({
    ios: {
      shadowColor: tokens.shadows?.sm?.color || '#000000',
      shadowOffset: {
        width: tokens.shadows?.sm?.offsetX || 0,
        height: tokens.shadows?.sm?.offsetY || 1,
      },
      shadowOpacity: tokens.shadows?.sm?.opacity || 0.1,
      shadowRadius: tokens.shadows?.sm?.blur || 3,
    },
    android: {
      elevation: tokens.shadows?.sm?.elevation || 2,
    },
  });

  const elevatedShadow = Platform.select({
    ios: {
      shadowColor: tokens.shadows?.lg?.color || '#000000',
      shadowOffset: {
        width: tokens.shadows?.lg?.offsetX || 0,
        height: tokens.shadows?.lg?.offsetY || 4,
      },
      shadowOpacity: tokens.shadows?.lg?.opacity || 0.15,
      shadowRadius: tokens.shadows?.lg?.blur || 12,
    },
    android: {
      elevation: tokens.shadows?.lg?.elevation || 8,
    },
  });

  return StyleSheet.create({
    base: {
      backgroundColor: tokens.colors?.semantic?.background?.primary || 
                     tokens.colors?.primitive?.white || '#FFFFFF',
      borderRadius: tokens.radius?.lg || 8,
      padding: tokens.spacing[4] || 16,
    },
    variants: {
      default: {
        ...baseShadow,
      },
      elevated: {
        ...elevatedShadow,
      },
      outlined: {
        borderWidth: 1,
        borderColor: tokens.colors?.primitive?.gray?.[200] || '#E5E7EB',
      },
    },
  });
};
```

### 5. Typography System

```typescript
// src/components/Typography/Typography.tsx
import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  color?: 'primary' | 'secondary' | 'disabled' | 'error';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'primary',
  align = 'left',
  children,
  style,
}) => {
  const { tokens } = useTheme();
  const styles = createTypographyStyles(tokens);

  return (
    <Text
      style={[
        styles.base,
        styles.variants[variant],
        styles.colors[color],
        { textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const createTypographyStyles = (tokens: any) => StyleSheet.create({
  base: {
    fontFamily: tokens.typography?.fontFamily?.primary || 'System',
  },
  variants: {
    h1: {
      fontSize: tokens.typography?.fontSize?.['5xl'] || 48,
      fontWeight: tokens.typography?.fontWeight?.bold || '700',
      lineHeight: tokens.typography?.lineHeight?.tight || 56,
    },
    h2: {
      fontSize: tokens.typography?.fontSize?.['4xl'] || 36,
      fontWeight: tokens.typography?.fontWeight?.bold || '700',
      lineHeight: tokens.typography?.lineHeight?.tight || 42,
    },
    h3: {
      fontSize: tokens.typography?.fontSize?.['3xl'] || 30,
      fontWeight: tokens.typography?.fontWeight?.semibold || '600',
      lineHeight: tokens.typography?.lineHeight?.snug || 36,
    },
    h4: {
      fontSize: tokens.typography?.fontSize?.['2xl'] || 24,
      fontWeight: tokens.typography?.fontWeight?.semibold || '600',
      lineHeight: tokens.typography?.lineHeight?.snug || 30,
    },
    h5: {
      fontSize: tokens.typography?.fontSize?.xl || 20,
      fontWeight: tokens.typography?.fontWeight?.semibold || '600',
      lineHeight: tokens.typography?.lineHeight?.normal || 28,
    },
    h6: {
      fontSize: tokens.typography?.fontSize?.lg || 18,
      fontWeight: tokens.typography?.fontWeight?.semibold || '600',
      lineHeight: tokens.typography?.lineHeight?.normal || 26,
    },
    body1: {
      fontSize: tokens.typography?.fontSize?.base || 16,
      fontWeight: tokens.typography?.fontWeight?.normal || '400',
      lineHeight: tokens.typography?.lineHeight?.relaxed || 24,
    },
    body2: {
      fontSize: tokens.typography?.fontSize?.sm || 14,
      fontWeight: tokens.typography?.fontWeight?.normal || '400',
      lineHeight: tokens.typography?.lineHeight?.relaxed || 20,
    },
    caption: {
      fontSize: tokens.typography?.fontSize?.xs || 12,
      fontWeight: tokens.typography?.fontWeight?.normal || '400',
      lineHeight: tokens.typography?.lineHeight?.normal || 16,
    },
  },
  colors: {
    primary: {
      color: tokens.colors?.semantic?.text?.primary || 
             tokens.colors?.primitive?.gray?.[900] || '#111827',
    },
    secondary: {
      color: tokens.colors?.semantic?.text?.secondary || 
             tokens.colors?.primitive?.gray?.[600] || '#4B5563',
    },
    disabled: {
      color: tokens.colors?.semantic?.text?.disabled || 
             tokens.colors?.primitive?.gray?.[400] || '#9CA3AF',
    },
    error: {
      color: tokens.colors?.primitive?.red?.[500] || '#EF4444',
    },
  },
});
```

## Best Practices

### 1. Token Usage Patterns

```typescript
// ✅ Good: Use semantic tokens when available
const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.semantic.background.primary,
    padding: tokens.spacing[4],
  },
});

// ⚠️ Fallback: Use primitive tokens with fallbacks
const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors?.semantic?.background?.primary || 
                     tokens.colors.primitive.white,
    padding: tokens.spacing[4] || 16,
  },
});

// ❌ Avoid: Hardcoded values
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
});
```

### 2. Performance Optimization

```typescript
// Create styles outside component to avoid recreation
const createStyles = (tokens: any) => StyleSheet.create({
  // styles here
});

// Use useMemo for complex style calculations
const MyComponent = () => {
  const { tokens } = useTheme();
  
  const styles = useMemo(() => createStyles(tokens), [tokens]);
  
  return <View style={styles.container} />;
};
```

### 3. Accessibility Integration

```typescript
// src/components/AccessibleButton/AccessibleButton.tsx
import React from 'react';
import { TouchableOpacity, Text, AccessibilityRole } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface AccessibleButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  disabled?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  disabled = false,
}) => {
  const { tokens } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled }}
      style={{
        backgroundColor: disabled 
          ? tokens.colors.primitive.gray[300]
          : tokens.colors.primitive.blue[500],
        padding: tokens.spacing[3],
        borderRadius: tokens.radius.md,
        minHeight: 44, // iOS accessibility guideline
        minWidth: 44,  // iOS accessibility guideline
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: disabled 
            ? tokens.colors.primitive.gray[500]
            : tokens.colors.primitive.white,
          fontSize: tokens.typography.fontSize.base,
          fontWeight: tokens.typography.fontWeight.medium,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
```

## Testing with Design Tokens

```typescript
// __tests__/Button.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '../src/components/Button/Button';
import { ThemeProvider } from '../src/providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  it('renders with correct token-based styles', () => {
    const { getByText } = renderWithTheme(
      <Button variant="primary">Test Button</Button>
    );
    
    const button = getByText('Test Button').parent;
    // Test that token-based styles are applied
    expect(button).toHaveStyle({
      backgroundColor: expect.any(String), // Token value
      borderRadius: expect.any(Number),   // Token value
    });
  });

  it('adapts to theme changes', () => {
    // Test light theme
    const { rerender, getByText } = renderWithTheme(
      <Button variant="primary">Test Button</Button>,
      'light'
    );
    
    // Test dark theme
    rerender(
      <ThemeProvider>
        <Button variant="primary">Test Button</Button>
      </ThemeProvider>
    );
    
    // Verify theme-specific token values are applied
  });
});
```

This comprehensive React Native integration guide ensures that mobile applications can fully leverage the Reluna Design System's token architecture while following React Native best practices for performance, accessibility, and platform-specific adaptations. 