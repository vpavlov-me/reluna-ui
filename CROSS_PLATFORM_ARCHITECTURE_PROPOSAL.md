# Reluna UI Cross-Platform Architecture Proposal

## 🎯 Executive Summary

This proposal outlines the evolution of Reluna UI from a React-focused component library to a comprehensive, cross-platform design system that supports:

- **Web Applications**: React, Angular, and browser extensions
- **Mobile Applications**: React Native
- **Design Tools**: Figma integration and design token synchronization

The approach focuses on **evolution, not revolution** - we'll enhance the existing structure without major rewrites.

---

## 🏗️ Proposed Project Structure

```
reluna-ui/
├── tokens/
│   ├── src/                          # Raw token definitions
│   │   ├── core/                     # Platform-agnostic tokens
│   │   │   ├── color.tokens.json
│   │   │   ├── typography.tokens.json
│   │   │   ├── spacing.tokens.json
│   │   │   ├── radius.tokens.json
│   │   │   ├── shadows.tokens.json
│   │   │   ├── z-index.tokens.json
│   │   │   └── breakpoints.tokens.json
│   │   ├── themes/                   # Theme-specific overrides
│   │   │   ├── light.tokens.json
│   │   │   ├── dark.tokens.json
│   │   │   └── brand.tokens.json
│   │   └── semantic/                 # Semantic token mappings
│   │       ├── components.tokens.json
│   │       └── patterns.tokens.json
│   ├── build/                        # Generated platform outputs
│   │   ├── css/                      # CSS Variables for web
│   │   │   ├── tokens.css
│   │   │   ├── themes.css
│   │   │   └── components.css
│   │   ├── js/                       # JavaScript/TypeScript
│   │   │   ├── tokens.js
│   │   │   ├── tokens.d.ts
│   │   │   └── index.js
│   │   ├── json/                     # Platform-agnostic JSON
│   │   │   ├── tokens.json
│   │   │   └── themes.json
│   │   ├── scss/                     # SCSS variables for Angular
│   │   │   ├── _tokens.scss
│   │   │   └── _themes.scss
│   │   └── react-native/             # React Native specific
│   │       ├── tokens.js
│   │       └── themes.js
│   └── style-dictionary.config.js    # Enhanced SD config
├── src/
│   ├── components/                   # React components (existing)
│   ├── hooks/                        # React hooks (existing)
│   ├── utils/                        # Utilities (existing)
│   └── tokens/                       # Generated tokens (keep existing)
├── docs/
│   ├── philosophy.md                 # Design system philosophy
│   ├── getting-started.md            # Quick start guide
│   ├── design-tokens/                # Token documentation
│   │   ├── overview.md
│   │   ├── color-system.md
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   └── theming.md
│   ├── components/                   # Component documentation
│   │   ├── button.md
│   │   ├── input.md
│   │   └── [component].md
│   ├── cross-platform/               # Platform-specific guides
│   │   ├── react.md
│   │   ├── angular.md
│   │   ├── react-native.md
│   │   └── browser-extensions.md
│   ├── migration/                    # Migration guides
│   │   └── v1-to-v2.md
│   └── examples/                     # Usage examples
│       ├── react-examples/
│       ├── angular-examples/
│       └── react-native-examples/
└── packages/                         # Future: Multi-package structure
    ├── tokens/                       # Standalone token package
    ├── react/                        # React components
    ├── angular/                      # Angular components (future)
    └── react-native/                 # RN components (future)
```

---

## 🎨 Enhanced Token Architecture

### 1. Token Categories & Structure

#### Core Tokens (`tokens/src/core/`)
Platform-agnostic foundational tokens:

```json
// color.tokens.json
{
  "color": {
    "primitive": {
      "gray": {
        "50": { "value": "#f9fafb", "type": "color" },
        "100": { "value": "#f3f4f6", "type": "color" },
        "900": { "value": "#111827", "type": "color" }
      },
      "blue": {
        "500": { "value": "#3b82f6", "type": "color" },
        "600": { "value": "#2563eb", "type": "color" }
      }
    }
  }
}

// typography.tokens.json
{
  "typography": {
    "fontFamily": {
      "sans": { "value": ["Inter", "system-ui", "sans-serif"], "type": "fontFamily" },
      "mono": { "value": ["JetBrains Mono", "monospace"], "type": "fontFamily" }
    },
    "fontSize": {
      "xs": { "value": "12px", "type": "dimension" },
      "sm": { "value": "14px", "type": "dimension" },
      "base": { "value": "16px", "type": "dimension" }
    },
    "lineHeight": {
      "tight": { "value": "1.25", "type": "number" },
      "normal": { "value": "1.5", "type": "number" }
    }
  }
}
```

#### Semantic Tokens (`tokens/src/semantic/`)
Component and pattern-specific tokens:

```json
// components.tokens.json
{
  "component": {
    "button": {
      "primary": {
        "background": { "value": "{color.primitive.blue.500}", "type": "color" },
        "backgroundHover": { "value": "{color.primitive.blue.600}", "type": "color" },
        "text": { "value": "{color.primitive.white}", "type": "color" },
        "borderRadius": { "value": "{radius.md}", "type": "dimension" },
        "padding": { "value": "{spacing.3} {spacing.4}", "type": "dimension" }
      }
    }
  }
}
```

#### Theme Tokens (`tokens/src/themes/`)
Theme-specific overrides:

```json
// dark.tokens.json
{
  "color": {
    "text": {
      "primary": { "value": "{color.primitive.gray.50}", "type": "color" },
      "secondary": { "value": "{color.primitive.gray.300}", "type": "color" }
    },
    "background": {
      "primary": { "value": "{color.primitive.gray.900}", "type": "color" },
      "secondary": { "value": "{color.primitive.gray.800}", "type": "color" }
    }
  }
}
```

### 2. Multi-Platform Token Generation

Enhanced Style Dictionary configuration for multiple output formats:

```javascript
// tokens/style-dictionary.config.js
export default {
  source: [
    'tokens/src/core/**/*.tokens.json',
    'tokens/src/semantic/**/*.tokens.json'
  ],
  platforms: {
    // CSS Variables for Web (React, Angular, Extensions)
    'css': {
      transformGroup: 'css',
      buildPath: 'tokens/build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          selector: ':root'
        }
      ]
    },
    
    // SCSS for Angular
    'scss': {
      transformGroup: 'scss',
      buildPath: 'tokens/build/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables'
        }
      ]
    },
    
    // JavaScript/TypeScript for React
    'js': {
      transformGroup: 'js',
      buildPath: 'tokens/build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    },
    
    // JSON for React Native
    'json': {
      transformGroup: 'js',
      buildPath: 'tokens/build/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat'
        }
      ]
    },
    
    // React Native specific
    'react-native': {
      transformGroup: 'react-native',
      buildPath: 'tokens/build/react-native/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          filter: (token) => !token.path.includes('breakpoint')
        }
      ]
    }
  }
}
```

---

## 🔧 Component Evolution Strategy

### 1. Token Integration in React Components

Update existing components to use design tokens instead of hardcoded values:

**Before:**
```tsx
// Hardcoded Tailwind classes
className: 'bg-blue-500 text-white hover:bg-blue-600'
```

**After:**
```tsx
// Token-based approach
import { tokens } from '../../../tokens';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors',
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-component-button-primary-background)]',
          'text-[var(--color-component-button-primary-text)]',
          'hover:bg-[var(--color-component-button-primary-background-hover)]',
          'rounded-[var(--radius-component-button)]',
          'px-[var(--spacing-component-button-x)]',
          'py-[var(--spacing-component-button-y)]'
        ]
      }
    }
  }
);
```

### 2. Component Documentation Enhancement

Each component will include:

1. **API Documentation**: Props, variants, and usage
2. **Design Tokens Used**: Which tokens the component consumes
3. **Cross-Platform Guidelines**: How other platforms can implement equivalent components
4. **Accessibility Notes**: ARIA patterns and keyboard navigation
5. **Usage Examples**: Code samples for different scenarios

---

## 📚 Documentation Structure

### 1. Philosophy & Getting Started
- Design system principles
- Installation guides for each platform
- Quick start examples

### 2. Design Tokens Documentation
- Token categories and naming conventions
- Theming system explanation
- Platform-specific usage guides

### 3. Cross-Platform Implementation Guides

#### React Guide (`docs/cross-platform/react.md`)
```markdown
# Using Reluna Tokens in React

## Installation
```bash
npm install @reluna/ui
```

## Usage
```tsx
import '@reluna/ui/tokens/css/tokens.css';
import { Button } from '@reluna/ui';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

#### Angular Guide (`docs/cross-platform/angular.md`)
```markdown
# Using Reluna Tokens in Angular

## Installation
```bash
npm install @reluna/tokens
```

## Usage
```scss
@import '@reluna/tokens/scss/tokens';

.custom-button {
  background-color: var(--color-component-button-primary-background);
  color: var(--color-component-button-primary-text);
  border-radius: var(--radius-component-button);
}
```

#### React Native Guide (`docs/cross-platform/react-native.md`)
```markdown
# Using Reluna Tokens in React Native

## Installation
```bash
npm install @reluna/tokens
```

## Usage
```tsx
import { tokens } from '@reluna/tokens/react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: tokens.color.component.button.primary.background,
    color: tokens.color.component.button.primary.text,
    borderRadius: tokens.radius.component.button,
  }
});
```

---

## 🎨 Theming System

### 1. CSS Custom Properties Approach

```css
/* Light theme (default) */
:root {
  --color-text-primary: #000000;
  --color-background-primary: #ffffff;
  --color-component-button-primary-background: #3b82f6;
}

/* Dark theme */
[data-theme="dark"] {
  --color-text-primary: #ffffff;
  --color-background-primary: #000000;
  --color-component-button-primary-background: #60a5fa;
}

/* Brand theme */
[data-theme="brand"] {
  --color-component-button-primary-background: #10b981;
}
```

### 2. Theme Switching Implementation

```tsx
// React theme provider
import { createContext, useContext } from 'react';

const ThemeContext = createContext<{
  theme: 'light' | 'dark' | 'brand';
  setTheme: (theme: string) => void;
}>({
  theme: 'light',
  setTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## 🚀 Implementation Roadmap

### Phase 1: Token System Enhancement (Week 1-2)
- [ ] Restructure token files according to new architecture
- [ ] Enhance Style Dictionary configuration for multi-platform output
- [ ] Generate CSS variables, SCSS, JSON, and React Native formats
- [ ] Update build process to include token generation

### Phase 2: Component Token Integration (Week 3-4)
- [ ] Update 5 core components (Button, Input, Card, Modal, Table) to use tokens
- [ ] Remove hardcoded styles from components
- [ ] Implement theming support in components
- [ ] Add component-specific token documentation

### Phase 3: Documentation & Cross-Platform Guides (Week 5-6)
- [ ] Create comprehensive token documentation
- [ ] Write platform-specific implementation guides
- [ ] Add usage examples for React, Angular, and React Native
- [ ] Create migration guide from current version

### Phase 4: Testing & Validation (Week 7-8)
- [ ] Test token generation across all platforms
- [ ] Validate theming system functionality
- [ ] Create example implementations for each platform
- [ ] Performance testing and optimization

---

## 📦 Package Structure Evolution

### Current Structure (Keep)
```json
{
  "name": "@reluna/ui",
  "exports": {
    ".": "./dist/index.js",
    "./styles": "./dist/styles.css",
    "./tokens": "./dist/tokens/index.js"
  }
}
```

### Enhanced Exports
```json
{
  "name": "@reluna/ui",
  "exports": {
    ".": "./dist/index.js",
    "./styles": "./dist/styles.css",
    "./tokens": "./dist/tokens/index.js",
    "./tokens/css": "./tokens/build/css/tokens.css",
    "./tokens/scss": "./tokens/build/scss/_tokens.scss",
    "./tokens/json": "./tokens/build/json/tokens.json",
    "./tokens/react-native": "./tokens/build/react-native/tokens.js"
  }
}
```

---

## 🔍 Success Metrics

### Technical Metrics
- **Token Coverage**: 100% of components use design tokens (no hardcoded styles)
- **Platform Support**: Tokens successfully exported to 4+ formats
- **Bundle Size**: Maintain current bundle size (<50KB)
- **Build Time**: Token generation adds <30s to build process

### Adoption Metrics
- **Documentation Completeness**: All components have cross-platform usage guides
- **Developer Experience**: Clear installation and usage instructions for each platform
- **Theme Support**: Light/dark/brand themes work across all platforms

---

## 🛠️ Next Steps

1. **Review and Approve**: Review this proposal and provide feedback
2. **Phase 1 Implementation**: Begin with token system enhancement
3. **Iterative Development**: Implement in phases with regular check-ins
4. **Community Feedback**: Gather feedback from Angular and mobile teams
5. **Documentation**: Maintain comprehensive documentation throughout

This proposal provides a clear path to evolve Reluna UI into a comprehensive, cross-platform design system while preserving your existing React components and build process. The token-first approach ensures consistency across all platforms while maintaining the flexibility to adapt to each platform's specific needs. 