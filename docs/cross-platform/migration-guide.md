# Migration Guide to Reluna Design System

## Overview

This guide helps teams migrate from existing design systems or custom implementations to the Reluna Design System. It covers token migration, component updates, and platform-specific considerations.

## Pre-Migration Assessment

### 1. Current State Analysis

Before starting the migration, assess your current implementation:

```bash
# Run this assessment script to analyze your codebase
npx @reluna/migration-analyzer ./src
```

**Manual Assessment Checklist:**

- [ ] **Hardcoded Values**: Count instances of hardcoded colors, spacing, typography
- [ ] **Inconsistent Patterns**: Identify components with different implementations
- [ ] **Accessibility Gaps**: Review current accessibility compliance
- [ ] **Platform Coverage**: Document which platforms you're currently supporting
- [ ] **Theme Support**: Assess current theming capabilities

### 2. Migration Scope Planning

**Phase 1: Foundation (Weeks 1-2)**
- [ ] Install Reluna Design System
- [ ] Set up token infrastructure
- [ ] Implement basic theming

**Phase 2: Core Components (Weeks 3-6)**
- [ ] Migrate buttons, inputs, cards
- [ ] Update typography system
- [ ] Implement spacing system

**Phase 3: Complex Components (Weeks 7-10)**
- [ ] Migrate navigation, modals, tables
- [ ] Update form components
- [ ] Implement responsive patterns

**Phase 4: Polish & Optimization (Weeks 11-12)**
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Documentation updates

## Token Migration

### 1. From Hardcoded Values

**Before:**
```css
.button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
}
```

**After:**
```css
.button {
  background-color: var(--button-primary-background-default);
  color: var(--button-primary-text-default);
  padding: var(--button-size-medium-padding-vertical) var(--button-size-medium-padding-horizontal);
  border-radius: var(--button-border-radius);
  font-size: var(--button-size-medium-font-size);
}
```

### 2. From CSS Variables

**Before:**
```css
:root {
  --primary-color: #3b82f6;
  --text-color: #1f2937;
  --spacing-sm: 8px;
  --spacing-md: 16px;
}
```

**After:**
```css
/* Import Reluna tokens */
@import '@reluna/ui/tokens/build/css/tokens.css';

/* Map your existing variables to Reluna tokens */
:root {
  --primary-color: var(--color-primitive-blue-500);
  --text-color: var(--color-semantic-text-primary);
  --spacing-sm: var(--spacing-2);
  --spacing-md: var(--spacing-4);
}
```

### 3. From SCSS Variables

**Before:**
```scss
$primary-color: #3b82f6;
$text-color: #1f2937;
$border-radius: 6px;
```

**After:**
```scss
@import '@reluna/ui/tokens/build/scss/tokens';

// Use Reluna tokens directly
.component {
  background-color: $color-primitive-blue-500;
  color: $color-semantic-text-primary;
  border-radius: $radius-md;
}
```

## Component Migration Patterns

### 1. React Component Migration

**Before:**
```tsx
// Old button component
interface ButtonProps {
  color?: 'blue' | 'red' | 'green';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ color = 'blue', size = 'md', children }) => {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const colorClasses = {
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
  };
  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]}`}>
      {children}
    </button>
  );
};
```

**After:**
```tsx
// Migrated to Reluna Button
import { Button } from '@reluna/ui';

// Usage
<Button variant="primary" size="medium">Click me</Button>
<Button variant="danger" size="medium">Delete</Button>
<Button variant="success" size="medium">Save</Button>

// If you need custom styling, use the token-based approach
import { buttonVariants } from '@reluna/ui/components/button/Button.styles';

const CustomButton = ({ variant, size, children, ...props }) => {
  return (
    <button 
      className={buttonVariants({ variant, size })}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 2. Angular Component Migration

**Before:**
```typescript
// old-button.component.ts
@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .button {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
    .button-primary { background: #3b82f6; color: white; }
    .button-secondary { background: #6b7280; color: white; }
  `]
})
export class OldButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;

  get buttonClasses(): string {
    return `button button-${this.variant}`;
  }
}
```

**After:**
```typescript
// Use Reluna Button component
import { RelunaButtonModule } from '@reluna/ui/angular';

@NgModule({
  imports: [RelunaButtonModule],
  // ...
})

// In template:
// <rl-button variant="primary">Click me</rl-button>
// <rl-button variant="secondary">Cancel</rl-button>
```

### 3. React Native Component Migration

**Before:**
```tsx
// Old React Native button
const CustomButton = ({ title, onPress, variant = 'primary' }) => {
  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: '#3b82f6',
    },
    secondary: {
      backgroundColor: '#6b7280',
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
  });

  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

**After:**
```tsx
// Use Reluna React Native Button
import { Button } from '@reluna/ui/react-native';

// Usage
<Button variant="primary" onPress={handlePress}>
  Click me
</Button>
```

## Platform-Specific Migration

### 1. React/Next.js Migration

**Step 1: Install Dependencies**
```bash
npm install @reluna/ui
npm install class-variance-authority clsx tailwind-merge
```

**Step 2: Update Tailwind Config**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@reluna/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map to Reluna tokens
        primary: 'var(--color-primitive-blue-500)',
        secondary: 'var(--color-primitive-gray-500)',
        // ... other mappings
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 3: Import Tokens**
```tsx
// app/layout.tsx or pages/_app.tsx
import '@reluna/ui/tokens/build/css/tokens.css';
import '@reluna/ui/styles/globals.css';
```

**Step 4: Set up Theme Provider**
```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from '@reluna/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="reluna-theme">
      {children}
    </ThemeProvider>
  );
}
```

### 2. Angular Migration

**Step 1: Install Dependencies**
```bash
npm install @reluna/ui
ng add @angular/cdk
```

**Step 2: Import Styles**
```scss
// src/styles.scss
@import '@reluna/ui/tokens/build/scss/tokens';
@import '@reluna/ui/styles/angular';

// Apply tokens to root
:root {
  @include reluna-tokens;
}

[data-theme='dark'] {
  @include reluna-tokens-dark;
}
```

**Step 3: Configure Module**
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { RelunaModule } from '@reluna/ui/angular';

@NgModule({
  imports: [
    RelunaModule.forRoot({
      theme: 'light',
      prefix: 'rl-',
    }),
  ],
  // ...
})
export class AppModule {}
```

### 3. React Native Migration

**Step 1: Install Dependencies**
```bash
npm install @reluna/ui
npm install react-native-vector-icons
npm install @react-native-async-storage/async-storage
```

**Step 2: Set up Theme Provider**
```tsx
// App.tsx
import { ThemeProvider } from '@reluna/ui/react-native';

export default function App() {
  return (
    <ThemeProvider>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

**Step 3: Configure Metro**
```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add Reluna UI to resolver
config.resolver.alias = {
  '@reluna/ui': require.resolve('@reluna/ui/react-native'),
};

module.exports = config;
```

## Migration Tools & Scripts

### 1. Automated Token Replacement

```javascript
// scripts/migrate-tokens.js
const fs = require('fs');
const path = require('path');

const tokenMappings = {
  '#3b82f6': 'var(--color-primitive-blue-500)',
  '#1f2937': 'var(--color-semantic-text-primary)',
  '8px': 'var(--spacing-2)',
  '16px': 'var(--spacing-4)',
  // Add more mappings
};

function replaceTokensInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  Object.entries(tokenMappings).forEach(([oldValue, newValue]) => {
    const regex = new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, newValue);
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Usage: node scripts/migrate-tokens.js
```

### 2. Component Usage Analyzer

```javascript
// scripts/analyze-components.js
const fs = require('fs');
const glob = require('glob');

function analyzeComponentUsage() {
  const files = glob.sync('src/**/*.{tsx,jsx,ts,js}');
  const componentUsage = {};
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Look for common patterns
    const buttonMatches = content.match(/<button|Button/g);
    const inputMatches = content.match(/<input|Input/g);
    
    if (buttonMatches) {
      componentUsage.buttons = (componentUsage.buttons || 0) + buttonMatches.length;
    }
    if (inputMatches) {
      componentUsage.inputs = (componentUsage.inputs || 0) + inputMatches.length;
    }
  });
  
  console.log('Component Usage Analysis:', componentUsage);
  return componentUsage;
}

analyzeComponentUsage();
```

### 3. Accessibility Audit Script

```javascript
// scripts/a11y-audit.js
const { execSync } = require('child_process');

function runAccessibilityAudit() {
  try {
    // Run axe-core audit
    execSync('npx @axe-core/cli http://localhost:3000 --tags wcag2a,wcag2aa', {
      stdio: 'inherit'
    });
    
    // Run lighthouse accessibility audit
    execSync('npx lighthouse http://localhost:3000 --only-categories=accessibility --output=json --output-path=./audit-results.json', {
      stdio: 'inherit'
    });
    
    console.log('Accessibility audit completed. Check audit-results.json for details.');
  } catch (error) {
    console.error('Audit failed:', error.message);
  }
}

runAccessibilityAudit();
```

## Testing During Migration

### 1. Visual Regression Testing

```javascript
// tests/visual-regression.test.js
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('button components match design', async ({ page }) => {
    await page.goto('/components/button');
    
    // Test different button variants
    await expect(page.locator('[data-testid="button-primary"]')).toHaveScreenshot('button-primary.png');
    await expect(page.locator('[data-testid="button-secondary"]')).toHaveScreenshot('button-secondary.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto('/components/button');
    await page.click('[data-testid="theme-toggle"]');
    
    await expect(page.locator('[data-testid="button-primary"]')).toHaveScreenshot('button-primary-dark.png');
  });
});
```

### 2. Token Validation Tests

```typescript
// tests/token-validation.test.ts
import { TokenValidator } from '@reluna/ui/utils/tokens';
import tokens from '@reluna/ui/tokens/build/js/tokens';

describe('Token Validation', () => {
  it('should have no unresolved token references', () => {
    const errors = TokenValidator.validateTokenReferences(tokens);
    expect(errors).toHaveLength(0);
  });

  it('should meet color contrast requirements', () => {
    const isValid = TokenValidator.validateColorContrast(
      tokens.color.semantic.text.primary,
      tokens.color.semantic.background.primary
    );
    expect(isValid).toBe(true);
  });
});
```

## Common Migration Challenges & Solutions

### 1. **Challenge**: Existing CSS conflicts with Reluna styles

**Solution**: Use CSS specificity or CSS-in-JS to scope styles
```css
/* Scope existing styles */
.legacy-app {
  /* Your existing styles */
}

/* Reluna components outside legacy scope */
.reluna-components {
  /* Reluna styles take precedence */
}
```

### 2. **Challenge**: Custom component variants not available in Reluna

**Solution**: Extend Reluna components with custom variants
```tsx
import { Button, buttonVariants } from '@reluna/ui';
import { cva } from 'class-variance-authority';

const customButtonVariants = cva(
  buttonVariants.base,
  {
    variants: {
      ...buttonVariants.variants,
      custom: 'bg-purple-500 text-white hover:bg-purple-600',
    },
  }
);

const CustomButton = ({ variant, ...props }) => {
  return <Button className={customButtonVariants({ variant })} {...props} />;
};
```

### 3. **Challenge**: Performance impact during migration

**Solution**: Implement progressive migration
```tsx
// Use feature flags to gradually roll out components
import { useFeatureFlag } from './hooks/useFeatureFlag';
import { Button as RelunaButton } from '@reluna/ui';
import { LegacyButton } from './components/LegacyButton';

const Button = (props) => {
  const useRelunaButton = useFeatureFlag('reluna-button');
  
  return useRelunaButton ? 
    <RelunaButton {...props} /> : 
    <LegacyButton {...props} />;
};
```

## Post-Migration Checklist

### ✅ **Functionality**
- [ ] All components render correctly
- [ ] Interactive elements work as expected
- [ ] Forms submit and validate properly
- [ ] Navigation functions correctly

### ✅ **Design Consistency**
- [ ] Colors match design system
- [ ] Typography is consistent
- [ ] Spacing follows token system
- [ ] Components align with design specs

### ✅ **Accessibility**
- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility tested
- [ ] Color contrast meets requirements

### ✅ **Performance**
- [ ] Bundle size impact assessed
- [ ] Runtime performance maintained
- [ ] No memory leaks introduced
- [ ] Loading times acceptable

### ✅ **Cross-Platform**
- [ ] Components work on all target platforms
- [ ] Responsive design functions correctly
- [ ] Touch interactions work on mobile
- [ ] Browser compatibility verified

### ✅ **Documentation**
- [ ] Component usage documented
- [ ] Migration notes recorded
- [ ] Team training completed
- [ ] Style guide updated

## Rollback Plan

In case issues arise during migration:

1. **Immediate Rollback**: Use feature flags to disable Reluna components
2. **Partial Rollback**: Revert specific components while keeping others
3. **Full Rollback**: Restore from pre-migration backup

```bash
# Emergency rollback script
git checkout pre-migration-backup
npm install
npm run build
npm run deploy
```

## Support & Resources

- **Documentation**: [docs.reluna.design](https://docs.reluna.design)
- **Migration Support**: migration@reluna.design
- **Community**: [Discord](https://discord.gg/reluna)
- **Issues**: [GitHub Issues](https://github.com/reluna/ui/issues)

Remember: Migration is a gradual process. Take it step by step, test thoroughly, and don't hesitate to reach out for support when needed. 