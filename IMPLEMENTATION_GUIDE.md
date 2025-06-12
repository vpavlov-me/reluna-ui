# Reluna UI Cross-Platform Implementation Guide

## 🚀 Quick Start

This guide provides step-by-step instructions to implement the cross-platform architecture for Reluna UI. Follow these phases to evolve your design system without breaking existing functionality.

## Phase 1: Enhanced Token System (Week 1-2)

### Step 1: Restructure Token Files

1. **Create new token directory structure:**

```bash
mkdir -p tokens/src/core
mkdir -p tokens/src/semantic  
mkdir -p tokens/src/themes
mkdir -p tokens/build
```

2. **Move existing tokens to new structure:**

The new token files have been created:
- `tokens/src/core/color.tokens.json` - Core color primitives and semantic mappings
- `tokens/src/semantic/components.tokens.json` - Component-specific tokens
- `tokens/src/themes/dark.tokens.json` - Dark theme overrides

### Step 2: Update Style Dictionary Configuration

1. **Use the enhanced configuration:**

```bash
# Test the new token generation
npm run build:tokens:enhanced
```

This will generate tokens in multiple formats:
- `tokens/build/css/` - CSS Variables for web
- `tokens/build/scss/` - SCSS variables for Angular
- `tokens/build/js/` - JavaScript/TypeScript for React
- `tokens/build/json/` - Platform-agnostic JSON
- `tokens/build/react-native/` - React Native specific

### Step 3: Update Build Process

1. **Update the main build script:**

```json
// In package.json, change:
"build:tokens": "style-dictionary build --config tokens/style-dictionary.config.enhanced.mjs"
```

2. **Test the build:**

```bash
npm run build:tokens
```

### Step 4: Verify Token Generation

Check that all token formats are generated correctly:

```bash
ls -la tokens/build/
# Should show: css/, scss/, js/, json/, react-native/, docs/
```

## Phase 2: Component Token Integration (Week 3-4)

### Step 1: Update Button Component

Replace hardcoded styles in `src/components/ui/button/Button.tsx`:

**Before:**
```tsx
className: 'bg-blue-500 text-white hover:bg-blue-600'
```

**After:**
```tsx
className: [
  'bg-[var(--color-component-button-primary-background)]',
  'text-[var(--color-component-button-primary-text)]',
  'hover:bg-[var(--color-component-button-primary-background-hover)]'
]
```

### Step 2: Update Input Component

Apply the same token-based approach to the Input component:

```tsx
// src/components/ui/input/Input.tsx
const inputVariants = cva([
  'bg-[var(--color-component-input-background)]',
  'border border-[var(--color-component-input-border)]',
  'text-[var(--color-component-input-text)]',
  'rounded-[var(--radius-component-input-border-radius)]',
  'px-[var(--spacing-component-input-padding-x)]',
  'py-[var(--spacing-component-input-padding-y)]',
  'focus:border-[var(--color-component-input-border-focus)]'
]);
```

### Step 3: Update Remaining Core Components

Apply token integration to:
- Card component
- Modal component  
- Table component

### Step 4: Test Component Updates

```bash
npm run storybook
# Verify all components still work correctly
```

## Phase 3: Theming System Implementation (Week 5)

### Step 1: Create Theme Provider

```tsx
// src/components/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Step 2: Update Storybook with Theme Support

```tsx
// .storybook/preview.tsx
import { ThemeProvider } from '../src/components/ThemeProvider';

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
```

### Step 3: Test Theme Switching

Create a theme toggle component and test in Storybook:

```tsx
// stories/ThemeToggle.stories.tsx
import { useTheme } from '../src/components/ThemeProvider';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
};
```

## Phase 4: Documentation & Cross-Platform Guides (Week 6)

### Step 1: Organize Documentation

The documentation structure has been created:
- `docs/cross-platform/react.md` - React implementation guide
- `docs/cross-platform/angular.md` - Angular implementation guide  
- `docs/cross-platform/react-native.md` - React Native implementation guide

### Step 2: Create Design Token Documentation

```bash
# Generate token documentation
npm run build:tokens
# This creates tokens/build/docs/tokens.md
```

### Step 3: Update README

Update the main README.md with:
- Cross-platform usage examples
- Installation instructions for different platforms
- Links to platform-specific guides

### Step 4: Create Migration Guide

Document how to migrate from the current version:

```markdown
# Migration Guide

## From v1.x to v2.x

### Breaking Changes
- Token structure has changed
- CSS class names now use CSS custom properties
- Import paths for tokens have changed

### Migration Steps
1. Update token imports
2. Replace hardcoded values with tokens
3. Update theme implementation
```

## Phase 5: Testing & Validation (Week 7-8)

### Step 1: Test Token Generation

```bash
# Test all token formats
npm run build:tokens

# Verify outputs
ls tokens/build/css/
ls tokens/build/scss/
ls tokens/build/js/
ls tokens/build/json/
ls tokens/build/react-native/
```

### Step 2: Test Component Integration

```bash
# Run existing tests
npm test

# Run Storybook
npm run storybook

# Test theme switching
# Verify all components adapt to theme changes
```

### Step 3: Performance Testing

```bash
# Check bundle size
npm run build
npm run analyze

# Ensure bundle size hasn't increased significantly
```

### Step 4: Cross-Platform Validation

Create test projects for each platform:

1. **React Test Project:**
```bash
npx create-react-app test-react-app
cd test-react-app
npm install @reluna/ui
# Test component usage and theming
```

2. **Angular Test Project:**
```bash
ng new test-angular-app
cd test-angular-app
npm install @reluna/tokens
# Test token usage in Angular components
```

3. **React Native Test Project:**
```bash
npx react-native init TestReactNativeApp
cd TestReactNativeApp
npm install @reluna/tokens
# Test token usage in React Native components
```

## Verification Checklist

### ✅ Token System
- [ ] All token formats generate correctly
- [ ] CSS variables work in browser
- [ ] SCSS variables compile correctly
- [ ] JSON tokens are valid
- [ ] React Native tokens work on mobile

### ✅ Component Integration
- [ ] All components use design tokens
- [ ] No hardcoded colors or spacing
- [ ] Components support theming
- [ ] Storybook displays correctly

### ✅ Theming
- [ ] Light theme works
- [ ] Dark theme works
- [ ] Theme switching is smooth
- [ ] All components adapt to themes

### ✅ Documentation
- [ ] Platform guides are complete
- [ ] Installation instructions work
- [ ] Code examples are accurate
- [ ] Migration guide is helpful

### ✅ Cross-Platform
- [ ] React implementation works
- [ ] Angular implementation works
- [ ] React Native implementation works
- [ ] Tokens are consistent across platforms

## Troubleshooting

### Common Issues

1. **Token generation fails:**
```bash
# Check Style Dictionary config
npm run build:tokens:enhanced -- --verbose
```

2. **CSS variables not working:**
```css
/* Ensure CSS is imported */
@import '@reluna/ui/tokens/css/tokens.css';
```

3. **Theme switching not working:**
```tsx
// Check data-theme attribute
console.log(document.documentElement.getAttribute('data-theme'));
```

4. **Bundle size increased:**
```bash
# Analyze bundle
npm run analyze
# Check if tree-shaking is working
```

### Getting Help

- Check the [troubleshooting guide](docs/troubleshooting.md)
- Review [platform-specific guides](docs/cross-platform/)
- Open an issue on GitHub
- Join the Discord community

## Next Steps

After completing the implementation:

1. **Gather Feedback:**
   - Test with Angular team
   - Test with mobile team
   - Collect developer feedback

2. **Iterate:**
   - Refine token structure based on usage
   - Add missing tokens
   - Improve documentation

3. **Expand:**
   - Add more component tokens
   - Create platform-specific packages
   - Build tooling for token management

4. **Maintain:**
   - Keep tokens in sync with design
   - Update documentation
   - Monitor performance

## Success Metrics

Track these metrics to measure success:

- **Adoption:** Number of projects using tokens
- **Consistency:** Visual consistency across platforms
- **Developer Experience:** Time to implement new components
- **Performance:** Bundle size and runtime performance
- **Maintenance:** Time to update design system

The cross-platform architecture will provide a solid foundation for scaling your design system across all platforms while maintaining consistency and developer experience. 