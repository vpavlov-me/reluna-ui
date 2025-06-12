# Using Reluna Design System in React Native

## Overview

The Reluna Design System provides design tokens that can be used in React Native applications to maintain visual consistency across web and mobile platforms. This guide covers installation, usage, and best practices for React Native development.

## Installation

### Install Tokens Package

```bash
npm install @reluna/tokens
# or
yarn add @reluna/tokens
```

## Basic Usage

### Import Tokens

```tsx
import { tokens } from '@reluna/tokens/react-native';

// Or import specific token categories
import { 
  colorTokens, 
  spacingTokens, 
  typographyTokens 
} from '@reluna/tokens/react-native';
```

### Using Tokens in StyleSheet

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Reluna</Text>
      <Text style={styles.subtitle}>Design System for React Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.color.semantic.background.primary,
    padding: tokens.spacing[4],
    borderRadius: tokens.radius.md,
  },
  title: {
    color: tokens.color.semantic.text.primary,
    fontSize: tokens.typography.fontSize.xl,
    fontWeight: tokens.typography.fontWeight.bold,
    marginBottom: tokens.spacing[2],
  },
  subtitle: {
    color: tokens.color.semantic.text.secondary,
    fontSize: tokens.typography.fontSize.base,
    fontWeight: tokens.typography.fontWeight.normal,
  },
});

export default MyComponent;
```

## Building Components

### Button Component Example

```tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onPress,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`],
    disabled && styles.buttonDisabled,
  ];

  const textStyle = [
    styles.text,
    styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}`],
    disabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.component.button.primary.borderRadius,
    borderWidth: 1,
  },
  
  // Variants
  buttonPrimary: {
    backgroundColor: tokens.component.button.primary.background,
    borderColor: tokens.component.button.primary.border,
  },
  buttonSecondary: {
    backgroundColor: tokens.component.button.secondary.background,
    borderColor: tokens.component.button.secondary.border,
  },
  buttonGhost: {
    backgroundColor: tokens.component.button.ghost.background,
    borderColor: tokens.component.button.ghost.border,
  },
  
  // Sizes
  buttonSmall: {
    paddingHorizontal: tokens.spacing[3],
    paddingVertical: tokens.spacing[1],
    minHeight: 32,
  },
  buttonMedium: {
    paddingHorizontal: tokens.component.button.primary.paddingX,
    paddingVertical: tokens.component.button.primary.paddingY,
    minHeight: 40,
  },
  buttonLarge: {
    paddingHorizontal: tokens.spacing[6],
    paddingVertical: tokens.spacing[3],
    minHeight: 48,
  },
  
  // Disabled state
  buttonDisabled: {
    backgroundColor: tokens.component.button.primary.backgroundDisabled,
    borderColor: tokens.component.button.primary.backgroundDisabled,
  },
  
  // Text styles
  text: {
    fontFamily: tokens.typography.fontFamily.sans,
    fontWeight: tokens.typography.fontWeight.medium,
  },
  textPrimary: {
    color: tokens.component.button.primary.text,
  },
  textSecondary: {
    color: tokens.component.button.secondary.text,
  },
  textGhost: {
    color: tokens.component.button.ghost.text,
  },
  textSmall: {
    fontSize: tokens.typography.fontSize.sm,
  },
  textMedium: {
    fontSize: tokens.typography.fontSize.base,
  },
  textLarge: {
    fontSize: tokens.typography.fontSize.lg,
  },
  textDisabled: {
    color: tokens.component.button.primary.textDisabled,
  },
});

export default Button;
```

### Input Component Example

```tsx
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet,
  TextInputProps 
} from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled = false,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = [
    styles.input,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    disabled && styles.inputDisabled,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={inputStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        placeholderTextColor={tokens.component.input.textPlaceholder}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing[3],
  },
  label: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.color.semantic.text.primary,
    marginBottom: tokens.spacing[1],
  },
  input: {
    backgroundColor: tokens.component.input.background,
    borderWidth: 1,
    borderColor: tokens.component.input.border,
    borderRadius: tokens.component.input.borderRadius,
    paddingHorizontal: tokens.component.input.paddingX,
    paddingVertical: tokens.component.input.paddingY,
    fontSize: tokens.typography.fontSize.base,
    color: tokens.component.input.text,
    fontFamily: tokens.typography.fontFamily.sans,
  },
  inputFocused: {
    borderColor: tokens.component.input.borderFocus,
    shadowColor: tokens.component.input.borderFocus,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  inputError: {
    borderColor: tokens.component.input.borderError,
  },
  inputDisabled: {
    backgroundColor: tokens.component.input.backgroundDisabled,
    color: tokens.color.semantic.text.tertiary,
  },
  error: {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.color.semantic.status.error,
    marginTop: tokens.spacing[1],
  },
});

export default Input;
```

## Theming Support

### Theme Context

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  tokens: typeof tokens;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('auto');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === 'auto') {
        const systemTheme = Appearance.getColorScheme() || 'light';
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    if (theme === 'auto') {
      const subscription = Appearance.addChangeListener(updateResolvedTheme);
      return () => subscription?.remove();
    }
  }, [theme]);

  // Get theme-specific tokens
  const getThemedTokens = () => {
    // In a real implementation, you would merge base tokens with theme-specific overrides
    return tokens;
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        resolvedTheme, 
        setTheme, 
        tokens: getThemedTokens() 
      }}
    >
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

### Using Theme in Components

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

const ThemedComponent = () => {
  const { tokens, resolvedTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: tokens.color.semantic.background.primary }]}>
      <Text style={[styles.text, { color: tokens.color.semantic.text.primary }]}>
        Current theme: {resolvedTheme}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});
```

## Platform-Specific Considerations

### Typography

```tsx
import { Platform } from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

const getTypographyStyle = (size: keyof typeof tokens.typography.fontSize) => ({
  fontSize: tokens.typography.fontSize[size],
  fontFamily: Platform.select({
    ios: tokens.typography.fontFamily.sans,
    android: tokens.typography.fontFamily.sans,
    default: tokens.typography.fontFamily.sans,
  }),
  // Platform-specific adjustments
  ...(Platform.OS === 'android' && {
    includeFontPadding: false,
    textAlignVertical: 'center',
  }),
});
```

### Shadows

```tsx
import { Platform } from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

const getShadowStyle = (shadowToken: string) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    };
  } else {
    return {
      elevation: 4,
    };
  }
};
```

## Best Practices

### 1. Use Tokens Consistently

```tsx
// ✅ Good
const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing[4],
    backgroundColor: tokens.color.semantic.background.primary,
  },
});

// ❌ Avoid
const styles = StyleSheet.create({
  container: {
    padding: 16, // Hardcoded value
    backgroundColor: '#ffffff', // Hardcoded color
  },
});
```

### 2. Create Reusable Style Functions

```tsx
import { tokens } from '@reluna/tokens/react-native';

export const createSpacing = (value: keyof typeof tokens.spacing) => ({
  padding: tokens.spacing[value],
});

export const createMargin = (value: keyof typeof tokens.spacing) => ({
  margin: tokens.spacing[value],
});

// Usage
const styles = StyleSheet.create({
  container: {
    ...createSpacing(4),
    ...createMargin(2),
  },
});
```

### 3. Component Composition

```tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  style, 
  ...props 
}) => {
  const cardStyle = [
    {
      backgroundColor: tokens.component.card.background,
      borderRadius: tokens.component.card.borderRadius,
      padding: tokens.component.card.padding,
      borderWidth: 1,
      borderColor: tokens.component.card.border,
    },
    variant === 'elevated' && getShadowStyle('sm'),
    style,
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};
```

## Performance Considerations

### 1. Memoize Styles

```tsx
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { tokens } from '@reluna/tokens/react-native';

const MyComponent = ({ variant }: { variant: string }) => {
  const styles = useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: tokens.color.semantic.background[variant] || tokens.color.semantic.background.primary,
      padding: tokens.spacing[4],
    },
  }), [variant]);

  return <View style={styles.container} />;
};
```

### 2. Use StyleSheet.create

```tsx
// ✅ Good - Optimized
const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.color.semantic.background.primary,
  },
});

// ❌ Avoid - Creates new object on each render
const containerStyle = {
  backgroundColor: tokens.color.semantic.background.primary,
};
```

## Testing

### Unit Testing with Tokens

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { tokens } from '@reluna/tokens/react-native';
import Button from './Button';

describe('Button', () => {
  it('applies correct token-based styles', () => {
    const { getByText } = render(<Button title="Test" variant="primary" />);
    const button = getByText('Test').parent;
    
    // Test that component uses design tokens
    expect(button.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: tokens.component.button.primary.background,
      })
    );
  });
});
```

## Migration from Hardcoded Values

### Before (Hardcoded)

```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
});
```

### After (Token-based)

```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.color.semantic.background.primary,
    padding: tokens.spacing[4],
    borderRadius: tokens.radius.md,
    ...getShadowStyle('sm'),
  },
});
```

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Reluna Design System](https://reluna-ui.dev)
- [React Native Styling Guide](https://reactnative.dev/docs/style) 