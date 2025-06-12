# Component Patterns & Architecture Guide

## Overview

This guide establishes consistent component patterns across all platforms (React, Angular, React Native, Browser Extensions) using the Reluna Design System. These patterns ensure maintainability, scalability, and consistency.

## Core Principles

### 1. Token-First Approach
- **Always use design tokens** instead of hardcoded values
- **Semantic tokens over primitive tokens** when available
- **Fallback gracefully** to primitive tokens when semantic tokens are unavailable

### 2. Platform Agnostic Design
- **Shared component logic** across platforms
- **Platform-specific styling** implementations
- **Consistent API** regardless of platform

### 3. Accessibility by Default
- **WCAG 2.1 AA compliance** as minimum standard
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** patterns

## Component Architecture Pattern

### Standard Component Structure

```
src/components/ui/[component-name]/
├── index.ts                    # Public API exports
├── [Component].tsx             # Main component (React)
├── [Component].types.ts        # TypeScript interfaces
├── [Component].styles.ts       # Token-based styling
├── [Component].test.tsx        # Unit tests
├── [Component].stories.tsx     # Storybook stories
├── [Component].a11y.test.tsx   # Accessibility tests
└── platforms/                  # Platform-specific implementations
    ├── angular/
    │   ├── [component].component.ts
    │   ├── [component].component.scss
    │   └── [component].module.ts
    ├── react-native/
    │   ├── [Component].native.tsx
    │   └── [Component].native.styles.ts
    └── browser-extension/
        ├── [Component].extension.tsx
        └── [Component].extension.styles.ts
```

## Token Integration Patterns

### 1. CSS Custom Properties (React, Angular, Browser Extensions)

```typescript
// Component.styles.ts
import { cva } from 'class-variance-authority';

export const componentVariants = cva(
  // Base styles using CSS custom properties
  [
    'inline-flex items-center justify-center',
    'transition-all duration-[var(--transition-duration-fast)]',
    'border-radius-[var(--radius-md)]',
    'font-weight-[var(--typography-font-weight-medium)]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--component-primary-background)]',
          'text-[var(--component-primary-text)]',
          'border-[var(--component-primary-border)]',
          'hover:bg-[var(--component-primary-background-hover)]',
        ],
        secondary: [
          'bg-[var(--component-secondary-background)]',
          'text-[var(--component-secondary-text)]',
          'border-[var(--component-secondary-border)]',
          'hover:bg-[var(--component-secondary-background-hover)]',
        ],
      },
      size: {
        small: [
          'h-[var(--component-size-small-height)]',
          'px-[var(--component-size-small-padding-x)]',
          'text-[var(--component-size-small-font-size)]',
        ],
        medium: [
          'h-[var(--component-size-medium-height)]',
          'px-[var(--component-size-medium-padding-x)]',
          'text-[var(--component-size-medium-font-size)]',
        ],
        large: [
          'h-[var(--component-size-large-height)]',
          'px-[var(--component-size-large-padding-x)]',
          'text-[var(--component-size-large-font-size)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);
```

### 2. StyleSheet Objects (React Native)

```typescript
// Component.native.styles.ts
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export const createComponentStyles = (tokens: any) => StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.component?.borderRadius || tokens.radius.md,
    fontWeight: tokens.typography?.fontWeight?.medium || '500',
  },
  variants: {
    primary: {
      backgroundColor: tokens.component?.primary?.background || tokens.colors.primitive.blue[500],
      color: tokens.component?.primary?.text || tokens.colors.primitive.white,
    },
    secondary: {
      backgroundColor: tokens.component?.secondary?.background || 'transparent',
      color: tokens.component?.secondary?.text || tokens.colors.primitive.gray[700],
      borderWidth: 1,
      borderColor: tokens.component?.secondary?.border || tokens.colors.primitive.gray[300],
    },
  },
  sizes: {
    small: {
      height: tokens.component?.size?.small?.height || tokens.spacing[8],
      paddingHorizontal: tokens.component?.size?.small?.paddingX || tokens.spacing[3],
      fontSize: tokens.component?.size?.small?.fontSize || tokens.typography.fontSize.sm,
    },
    medium: {
      height: tokens.component?.size?.medium?.height || tokens.spacing[10],
      paddingHorizontal: tokens.component?.size?.medium?.paddingX || tokens.spacing[4],
      fontSize: tokens.component?.size?.medium?.fontSize || tokens.typography.fontSize.base,
    },
    large: {
      height: tokens.component?.size?.large?.height || tokens.spacing[12],
      paddingHorizontal: tokens.component?.size?.large?.paddingX || tokens.spacing[6],
      fontSize: tokens.component?.size?.large?.fontSize || tokens.typography.fontSize.lg,
    },
  },
});
```

### 3. SCSS Variables (Angular)

```scss
// component.component.scss
.rl-component {
  // Base styles using SCSS variables
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition-duration: var(--transition-duration-fast);
  border-radius: var(--radius-md);
  font-weight: var(--typography-font-weight-medium);
  
  // Variants
  &--primary {
    background-color: var(--component-primary-background);
    color: var(--component-primary-text);
    border: 1px solid var(--component-primary-border);
    
    &:hover:not(:disabled) {
      background-color: var(--component-primary-background-hover);
    }
  }
  
  &--secondary {
    background-color: var(--component-secondary-background);
    color: var(--component-secondary-text);
    border: 1px solid var(--component-secondary-border);
    
    &:hover:not(:disabled) {
      background-color: var(--component-secondary-background-hover);
    }
  }
  
  // Sizes
  &--small {
    height: var(--component-size-small-height);
    padding: 0 var(--component-size-small-padding-x);
    font-size: var(--component-size-small-font-size);
  }
  
  &--medium {
    height: var(--component-size-medium-height);
    padding: 0 var(--component-size-medium-padding-x);
    font-size: var(--component-size-medium-font-size);
  }
  
  &--large {
    height: var(--component-size-large-height);
    padding: 0 var(--component-size-large-padding-x);
    font-size: var(--component-size-large-font-size);
  }
  
  // States
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-semantic-focus);
    outline-offset: 2px;
  }
}
```

## Component Interface Patterns

### 1. Base Component Props

```typescript
// Component.types.ts
import { ReactNode, HTMLAttributes } from 'react';

// Base props that all components should extend
export interface BaseComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles (use sparingly) */
  style?: React.CSSProperties;
  /** Test ID for automated testing */
  testId?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Accessibility description */
  'aria-describedby'?: string;
}

// Variant props pattern
export interface VariantProps {
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /** Size variant of the component */
  size?: 'small' | 'medium' | 'large';
}

// State props pattern
export interface StateProps {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Whether the component is in error state */
  error?: boolean;
}

// Complete component props
export interface ComponentProps 
  extends BaseComponentProps, 
          VariantProps, 
          StateProps,
          Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  /** Component content */
  children?: ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
}
```

### 2. Platform-Specific Props

```typescript
// React Native specific props
export interface ComponentPropsNative 
  extends Omit<ComponentProps, 'className' | 'style'> {
  /** React Native ViewStyle */
  style?: ViewStyle;
  /** React Native TextStyle for text elements */
  textStyle?: TextStyle;
}

// Angular specific props
export interface ComponentPropsAngular {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
}
```

## Accessibility Patterns

### 1. Focus Management

```typescript
// useFocusManagement.ts
import { useRef, useEffect } from 'react';

export const useFocusManagement = (autoFocus?: boolean) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (autoFocus && elementRef.current) {
      elementRef.current.focus();
    }
  }, [autoFocus]);

  const focusElement = () => {
    elementRef.current?.focus();
  };

  const blurElement = () => {
    elementRef.current?.blur();
  };

  return {
    elementRef,
    focusElement,
    blurElement,
  };
};
```

### 2. Keyboard Navigation

```typescript
// useKeyboardNavigation.ts
import { KeyboardEvent } from 'react';

export const useKeyboardNavigation = (
  onEnter?: () => void,
  onSpace?: () => void,
  onEscape?: () => void,
  onArrowKeys?: (direction: 'up' | 'down' | 'left' | 'right') => void
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        onEnter?.();
        break;
      case ' ':
        event.preventDefault();
        onSpace?.();
        break;
      case 'Escape':
        event.preventDefault();
        onEscape?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        onArrowKeys?.('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        onArrowKeys?.('down');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        onArrowKeys?.('left');
        break;
      case 'ArrowRight':
        event.preventDefault();
        onArrowKeys?.('right');
        break;
    }
  };

  return { handleKeyDown };
};
```

### 3. ARIA Patterns

```typescript
// useAriaAttributes.ts
import { useMemo } from 'react';

export const useAriaAttributes = ({
  role,
  label,
  describedBy,
  expanded,
  selected,
  disabled,
  required,
  invalid,
}: {
  role?: string;
  label?: string;
  describedBy?: string;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
}) => {
  return useMemo(() => ({
    role,
    'aria-label': label,
    'aria-describedby': describedBy,
    'aria-expanded': expanded,
    'aria-selected': selected,
    'aria-disabled': disabled,
    'aria-required': required,
    'aria-invalid': invalid,
  }), [role, label, describedBy, expanded, selected, disabled, required, invalid]);
};
```

## Testing Patterns

### 1. Component Testing Template

```typescript
// Component.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Component } from './Component';
import { ThemeProvider } from '../../../providers/ThemeProvider';

expect.extend(toHaveNoViolations);

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Component', () => {
  // Basic rendering tests
  it('renders correctly with default props', () => {
    renderWithTheme(<Component>Test Content</Component>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // Variant tests
  it('applies correct styles for each variant', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    variants.forEach(variant => {
      const { rerender } = renderWithTheme(
        <Component variant={variant}>Test</Component>
      );
      
      const element = screen.getByText('Test');
      expect(element).toHaveClass(`component--${variant}`);
    });
  });

  // Size tests
  it('applies correct styles for each size', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      const { rerender } = renderWithTheme(
        <Component size={size}>Test</Component>
      );
      
      const element = screen.getByText('Test');
      expect(element).toHaveClass(`component--${size}`);
    });
  });

  // State tests
  it('handles disabled state correctly', () => {
    renderWithTheme(<Component disabled>Test</Component>);
    const element = screen.getByText('Test');
    
    expect(element).toBeDisabled();
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  // Interaction tests
  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Component onClick={handleClick}>Test</Component>);
    
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Keyboard navigation tests
  it('handles keyboard navigation', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Component onClick={handleClick}>Test</Component>);
    
    const element = screen.getByText('Test');
    fireEvent.keyDown(element, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(element, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // Accessibility tests
  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Theme tests
  it('adapts to theme changes', () => {
    const { rerender } = render(
      <ThemeProvider theme="light">
        <Component>Test</Component>
      </ThemeProvider>
    );
    
    // Test light theme styles
    let element = screen.getByText('Test');
    expect(element).toHaveStyle({
      backgroundColor: expect.any(String),
    });
    
    // Test dark theme styles
    rerender(
      <ThemeProvider theme="dark">
        <Component>Test</Component>
      </ThemeProvider>
    );
    
    element = screen.getByText('Test');
    expect(element).toHaveStyle({
      backgroundColor: expect.any(String),
    });
  });
});
```

### 2. Accessibility Testing Template

```typescript
// Component.a11y.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component Accessibility', () => {
  it('meets WCAG 2.1 AA standards', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Component onClick={handleClick}>Test</Component>);
    
    const element = screen.getByText('Test');
    
    // Tab to element
    await user.tab();
    expect(element).toHaveFocus();
    
    // Activate with Enter
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Activate with Space
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('provides proper ARIA attributes', () => {
    render(
      <Component 
        aria-label="Test button"
        aria-describedby="description"
        disabled
      >
        Test
      </Component>
    );
    
    const element = screen.getByText('Test');
    expect(element).toHaveAttribute('aria-label', 'Test button');
    expect(element).toHaveAttribute('aria-describedby', 'description');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  it('has sufficient color contrast', () => {
    // This would typically use a color contrast testing library
    // or be tested manually with tools like axe-core
    render(<Component>Test</Component>);
    const element = screen.getByText('Test');
    
    // Verify element exists and is visible
    expect(element).toBeVisible();
    
    // In a real implementation, you would test:
    // - Text contrast ratios meet WCAG AA standards (4.5:1 for normal text)
    // - Focus indicators have sufficient contrast
    // - Interactive elements meet contrast requirements
  });

  it('supports screen readers', () => {
    render(
      <Component role="button" aria-label="Submit form">
        Submit
      </Component>
    );
    
    const element = screen.getByRole('button', { name: 'Submit form' });
    expect(element).toBeInTheDocument();
  });
});
```

## Storybook Integration Pattern

```typescript
// Component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible component that follows the Reluna Design System patterns.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Visual variant of the component',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the component',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the component is in loading state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Component',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Component',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Component',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Component',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Component',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Component',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="success">Success</Component>
      <Component variant="warning">Warning</Component>
      <Component variant="danger">Danger</Component>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Component size="small">Small</Component>
      <Component size="medium">Medium</Component>
      <Component size="large">Large</Component>
    </div>
  ),
};

// Dark theme story
export const DarkTheme: Story = {
  args: {
    children: 'Dark Theme Component',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};
```

## Migration Checklist

When creating or updating components, ensure:

### ✅ Token Integration
- [ ] Uses semantic tokens when available
- [ ] Falls back to primitive tokens gracefully
- [ ] No hardcoded values in styles
- [ ] Supports theme switching

### ✅ Cross-Platform Compatibility
- [ ] Consistent API across platforms
- [ ] Platform-specific styling implementations
- [ ] Responsive design considerations
- [ ] Performance optimizations per platform

### ✅ Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Proper ARIA attributes
- [ ] Focus management
- [ ] Color contrast compliance

### ✅ Testing
- [ ] Unit tests for all variants and states
- [ ] Accessibility tests
- [ ] Cross-browser testing
- [ ] Theme switching tests
- [ ] Performance tests

### ✅ Documentation
- [ ] Storybook stories for all variants
- [ ] TypeScript interfaces documented
- [ ] Usage examples provided
- [ ] Migration guide if updating existing component

This comprehensive component pattern guide ensures consistency, maintainability, and accessibility across all platforms while leveraging the full power of the Reluna Design System's token architecture. 