# Using Reluna Design System in React

## Overview

The Reluna Design System provides comprehensive React components and design tokens that can be used in any React application. This guide covers installation, basic usage, theming, and best practices.

## Installation

### Install the Package

```bash
npm install @reluna/ui
# or
yarn add @reluna/ui
```

### Import Styles

Import the CSS tokens in your main application file:

```tsx
// In your main App.tsx or index.tsx
import '@reluna/ui/tokens/css/tokens.css';
import '@reluna/ui/styles'; // Component styles
```

## Basic Usage

### Using Components

```tsx
import { Button, Input, Card, Modal } from '@reluna/ui';

function MyApp() {
  return (
    <div>
      <Card>
        <h2>Welcome to Reluna</h2>
        <Input placeholder="Enter your name" />
        <Button variant="primary">Get Started</Button>
      </Card>
    </div>
  );
}
```

### Using Design Tokens Directly

```tsx
import { tokens } from '@reluna/ui/tokens';

const CustomComponent = () => {
  return (
    <div
      style={{
        backgroundColor: tokens.color.semantic.background.primary,
        color: tokens.color.semantic.text.primary,
        padding: tokens.spacing[4],
        borderRadius: tokens.radius.md,
      }}
    >
      Custom styled component using tokens
    </div>
  );
};
```

### Using CSS Custom Properties

```tsx
const CustomComponent = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-semantic-background-primary)',
        color: 'var(--color-semantic-text-primary)',
        padding: 'var(--spacing-4)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      Custom styled component using CSS variables
    </div>
  );
};
```

## Theming

### Theme Provider Setup

```tsx
import { ThemeProvider } from '@reluna/ui';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### Using Theme Hook

```tsx
import { useTheme } from '@reluna/ui';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </Button>
  );
}
```

### Manual Theme Switching

```tsx
// Set theme programmatically
document.documentElement.setAttribute('data-theme', 'dark');

// Or use CSS classes
document.documentElement.className = 'theme-dark';
```

## Styling with Tailwind CSS

If you're using Tailwind CSS in your project, you can extend your configuration to use Reluna tokens:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-semantic-background-primary)',
        secondary: 'var(--color-semantic-background-secondary)',
        text: {
          primary: 'var(--color-semantic-text-primary)',
          secondary: 'var(--color-semantic-text-secondary)',
        }
      },
      spacing: {
        'xs': 'var(--spacing-1)',
        'sm': 'var(--spacing-2)',
        'md': 'var(--spacing-4)',
        'lg': 'var(--spacing-6)',
        'xl': 'var(--spacing-8)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
      }
    }
  }
}
```

## TypeScript Support

The Reluna Design System includes full TypeScript support:

```tsx
import type { ButtonProps, InputProps } from '@reluna/ui';

interface MyComponentProps {
  buttonProps?: ButtonProps;
  inputProps?: InputProps;
}

const MyComponent: React.FC<MyComponentProps> = ({ buttonProps, inputProps }) => {
  return (
    <div>
      <Input {...inputProps} />
      <Button {...buttonProps}>Submit</Button>
    </div>
  );
};
```

## Custom Components with Tokens

### Creating Token-Based Components

```tsx
import { tokens } from '@reluna/ui/tokens';
import { cn } from '@reluna/ui/utils';

interface CustomCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  className?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ 
  children, 
  variant = 'default',
  className 
}) => {
  const baseStyles = {
    backgroundColor: 'var(--color-component-card-background)',
    border: '1px solid var(--color-component-card-border)',
    borderRadius: 'var(--radius-component-card-border-radius)',
    padding: 'var(--spacing-component-card-padding)',
  };

  const elevatedStyles = variant === 'elevated' ? {
    boxShadow: 'var(--shadow-component-card-shadow)',
  } : {};

  return (
    <div 
      className={cn('custom-card', className)}
      style={{ ...baseStyles, ...elevatedStyles }}
    >
      {children}
    </div>
  );
};
```

### Using Class Variance Authority (CVA)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@reluna/ui/utils';

const cardVariants = cva(
  // Base styles using CSS custom properties
  [
    'bg-[var(--color-component-card-background)]',
    'border border-[var(--color-component-card-border)]',
    'rounded-[var(--radius-component-card-border-radius)]',
    'p-[var(--spacing-component-card-padding)]',
  ],
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-[var(--shadow-component-card-shadow)]',
      },
      size: {
        sm: 'p-[var(--spacing-4)]',
        md: 'p-[var(--spacing-6)]',
        lg: 'p-[var(--spacing-8)]',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    }
  }
);

interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card: React.FC<CardProps> = ({ 
  className, 
  variant, 
  size, 
  ...props 
}) => {
  return (
    <div
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  );
};
```

## Best Practices

### 1. Always Use Design Tokens

❌ **Don't:**
```tsx
<div style={{ color: '#3b82f6', padding: '16px' }}>
  Hardcoded values
</div>
```

✅ **Do:**
```tsx
<div style={{ 
  color: 'var(--color-primitive-blue-500)', 
  padding: 'var(--spacing-4)' 
}}>
  Token-based values
</div>
```

### 2. Prefer Semantic Tokens

❌ **Don't:**
```tsx
<div style={{ color: 'var(--color-primitive-gray-900)' }}>
  Using primitive tokens directly
</div>
```

✅ **Do:**
```tsx
<div style={{ color: 'var(--color-semantic-text-primary)' }}>
  Using semantic tokens
</div>
```

### 3. Use Component Tokens for Components

❌ **Don't:**
```tsx
<button style={{ 
  backgroundColor: 'var(--color-primitive-blue-500)',
  color: 'var(--color-primitive-white)' 
}}>
  Button
</button>
```

✅ **Do:**
```tsx
<button style={{ 
  backgroundColor: 'var(--color-component-button-primary-background)',
  color: 'var(--color-component-button-primary-text)' 
}}>
  Button
</button>
```

### 4. Theme-Aware Components

```tsx
// Components automatically adapt to theme changes
const ThemeAwareComponent = () => {
  return (
    <div className="bg-[var(--color-semantic-background-primary)] text-[var(--color-semantic-text-primary)]">
      This component adapts to light/dark themes automatically
    </div>
  );
};
```

## Performance Considerations

### 1. CSS Custom Properties vs JavaScript Tokens

- **CSS Custom Properties**: Better for runtime theme switching, smaller bundle size
- **JavaScript Tokens**: Better for build-time optimizations, type safety

### 2. Bundle Optimization

```tsx
// Import only what you need
import { Button } from '@reluna/ui/button';
import { Input } from '@reluna/ui/input';

// Instead of importing everything
import { Button, Input } from '@reluna/ui'; // This might import more than needed
```

## Troubleshooting

### Common Issues

1. **Tokens not loading**: Make sure you've imported the CSS file
2. **Theme not switching**: Check that `data-theme` attribute is set correctly
3. **TypeScript errors**: Ensure you're using the latest version with proper types

### Debug Mode

```tsx
import { tokens } from '@reluna/ui/tokens';

// Log all available tokens
console.log('Available tokens:', tokens);

// Check current theme
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
```

## Migration from Other Systems

### From Tailwind CSS

```tsx
// Before (Tailwind)
<div className="bg-blue-500 text-white p-4 rounded-md">
  Content
</div>

// After (Reluna)
<div className="bg-[var(--color-component-button-primary-background)] text-[var(--color-component-button-primary-text)] p-[var(--spacing-4)] rounded-[var(--radius-md)]">
  Content
</div>
```

### From Material-UI

```tsx
// Before (Material-UI)
<Box sx={{ 
  bgcolor: 'primary.main', 
  color: 'primary.contrastText',
  p: 2 
}}>
  Content
</Box>

// After (Reluna)
<div style={{
  backgroundColor: 'var(--color-component-button-primary-background)',
  color: 'var(--color-component-button-primary-text)',
  padding: 'var(--spacing-4)'
}}>
  Content
</div>
```

## Examples

Check out our [example repository](https://github.com/reluna/ui-examples) for complete React applications using the Reluna Design System.

## Support

- [GitHub Issues](https://github.com/reluna/ui/issues)
- [Documentation](https://reluna-ui.dev)
- [Discord Community](https://discord.gg/reluna) 