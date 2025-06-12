# 🎨 Reluna UI Design System

[![npm version](https://badge.fury.io/js/@reluna%2Fui.svg)](https://badge.fury.io/js/@reluna%2Fui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://storybook.js.org/)

> A comprehensive cross-platform design system for React, Angular, React Native, and Browser Extensions with a unified design token architecture.

**Built by [Reluna.com](https://reluna.com) - All rights reserved.**

## 🌟 Overview

Reluna UI is a modern, token-first design system that provides consistent user experiences across all platforms. Built with accessibility, performance, and developer experience in mind, it offers a complete solution for building scalable applications.

### ✨ Key Features

- 🎯 **Token-First Architecture** - Semantic design tokens with automatic platform adaptation
- 🌐 **Cross-Platform Support** - React, Angular, React Native, Browser Extensions
- 🎨 **Advanced Theming** - Light/dark themes with custom brand theme support
- ♿ **Accessibility by Default** - WCAG 2.1 AA compliance built-in
- 📱 **Responsive Design** - Mobile-first approach with flexible breakpoints
- 🔧 **Developer Experience** - TypeScript support, comprehensive documentation, migration tools
- 🧪 **Testing Ready** - Built-in accessibility testing and visual regression tools

## 🚀 Quick Start

### Installation

```bash
npm install @reluna/ui
# or
yarn add @reluna/ui
```

### Basic Usage

```tsx
import { Button, Input, Card, ThemeProvider } from '@reluna/ui'
import '@reluna/ui/tokens/build/css/tokens.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Card>
        <Input placeholder="Enter your message" />
        <Button variant="primary" size="medium">
          Send Message
        </Button>
      </Card>
    </ThemeProvider>
  )
}
```

### Platform-Specific Setup

#### React/Next.js
```tsx
// app/layout.tsx
import '@reluna/ui/tokens/build/css/tokens.css'
import { ThemeProvider } from '@reluna/ui'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="light" storageKey="reluna-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### Angular
```typescript
// app.module.ts
import { NgModule } from '@angular/core'
import { RelunaModule } from '@reluna/ui/angular'

@NgModule({
  imports: [
    RelunaModule.forRoot({
      theme: 'light',
      prefix: 'rl-'
    })
  ]
})
export class AppModule {}
```

#### React Native
```tsx
// App.tsx
import { ThemeProvider } from '@reluna/ui/react-native'

export default function App() {
  return (
    <ThemeProvider>
      <YourAppContent />
    </ThemeProvider>
  )
}
```

## 🏗️ Architecture

### Project Structure

```
reluna-ui/
├── src/
│   ├── components/ui/           # React components
│   │   ├── button/             # Button component
│   │   │   ├── index.ts        # Public API
│   │   │   ├── Button.tsx      # React implementation
│   │   │   ├── Button.types.ts # TypeScript interfaces
│   │   │   ├── Button.styles.ts # Token-based styling
│   │   │   ├── Button.test.tsx # Unit tests
│   │   │   └── Button.stories.tsx # Storybook stories
│   │   └── ...                 # Other components
│   ├── hooks/                  # React hooks
│   ├── utils/                  # Utility functions
│   │   └── tokens.ts           # Token utilities
│   └── types/                  # TypeScript definitions
├── tokens/                     # Design token system
│   ├── src/
│   │   ├── core/              # Primitive tokens
│   │   ├── semantic/          # Component-specific tokens
│   │   └── themes/            # Theme overrides
│   └── build/                 # Generated token outputs
│       ├── css/               # CSS custom properties
│       ├── scss/              # SCSS variables
│       ├── js/                # JavaScript/TypeScript
│       ├── react-native/      # React Native compatible
│       └── tailwind/          # Tailwind CSS plugin
├── docs/cross-platform/       # Platform integration guides
├── stories/                   # Storybook stories
└── tests/                     # Test suites
```

## 🎨 Design Token System

### Token Architecture

Our design token system follows a three-tier architecture:

1. **Core Tokens** - Primitive values (colors, spacing, typography)
2. **Semantic Tokens** - Component-specific tokens that reference core tokens
3. **Theme Tokens** - Theme-specific overrides for different contexts

### Token Generation

```bash
# Generate tokens for all platforms
npm run build:tokens

# Watch for token changes during development
npm run build:tokens:watch
```

### Platform Outputs

| Platform | Format | Usage |
|----------|--------|-------|
| **React/Web** | CSS Custom Properties | `var(--button-primary-background-default)` |
| **Angular** | SCSS Variables | `$button-primary-background-default` |
| **React Native** | JavaScript Objects | `tokens.buttonPrimaryBackgroundDefault` |
| **Tailwind** | Plugin Configuration | `bg-button-primary` |

### Token Usage Examples

#### CSS Custom Properties (React/Web)
```css
.button {
  background-color: var(--button-primary-background-default);
  color: var(--button-primary-text-default);
  padding: var(--button-size-medium-padding-vertical) var(--button-size-medium-padding-horizontal);
  border-radius: var(--button-border-radius);
}
```

#### SCSS Variables (Angular)
```scss
.button {
  background-color: $button-primary-background-default;
  color: $button-primary-text-default;
  padding: $button-size-medium-padding-vertical $button-size-medium-padding-horizontal;
  border-radius: $button-border-radius;
}
```

#### JavaScript Objects (React Native)
```typescript
import { createButtonStyles } from '@reluna/ui/react-native'

const styles = createButtonStyles(tokens)
// or
const styles = StyleSheet.create({
  button: {
    backgroundColor: tokens.buttonPrimaryBackgroundDefault,
    color: tokens.buttonPrimaryTextDefault,
  }
})
```

## 🧩 Components

### Available Components

**Form Controls:**
- `Button` - Primary, secondary, and variant buttons with loading states
- `Input` - Text inputs with validation and error states
- `Checkbox` - Accessible checkboxes with indeterminate state
- `Radio` - Radio button groups with proper keyboard navigation
- `Switch` - Toggle switches with smooth animations
- `Select` - Dropdown selects with search and multi-select
- `Textarea` - Multi-line text inputs with auto-resize

**Layout:**
- `Card` - Content containers with elevation and borders
- `Modal` - Accessible modal dialogs with focus management
- `Navbar` - Navigation headers with responsive behavior
- `Sidebar` - Collapsible side navigation
- `Table` - Data tables with sorting, filtering, and pagination
- `Tabs` - Tab navigation with keyboard support
- `Accordion` - Collapsible content sections

**Feedback:**
- `Notification` - Toast notifications with auto-dismiss
- `Tooltip` - Contextual help with smart positioning
- `Badge` - Status indicators and counters
- `Loader` - Loading spinners and progress indicators
- `Typography` - Consistent text styling across platforms

### Component Features

- ✅ **Accessibility** - WCAG 2.1 AA compliant with proper ARIA attributes
- ✅ **Keyboard Navigation** - Full keyboard support for all interactive elements
- ✅ **Screen Reader Support** - Comprehensive screen reader compatibility
- ✅ **Responsive Design** - Mobile-first approach with flexible breakpoints
- ✅ **Theme Support** - Automatic light/dark theme adaptation
- ✅ **TypeScript** - Full type safety with comprehensive interfaces
- ✅ **Testing** - Unit tests and accessibility tests included

## 🎯 Cross-Platform Support

### Platform Matrix

| Feature | React | Angular | React Native | Browser Extensions |
|---------|-------|---------|--------------|-------------------|
| **Components** | ✅ Full Library | ✅ Angular Components | ✅ Native Components | ✅ Web Components |
| **Tokens** | ✅ CSS Variables | ✅ SCSS Variables | ✅ StyleSheet Objects | ✅ CSS Variables |
| **Theming** | ✅ Context API | ✅ Service-based | ✅ Context API | ✅ Storage API |
| **Responsive** | ✅ CSS Media Queries | ✅ Angular Flex Layout | ✅ Dimensions API | ✅ CSS Media Queries |
| **Accessibility** | ✅ ARIA + Focus | ✅ CDK A11y | ✅ AccessibilityInfo | ✅ ARIA + Focus |

### Integration Guides

- 📖 [React Integration Guide](./docs/cross-platform/react.md)
- 📖 [Angular Advanced Integration](./docs/cross-platform/angular-advanced.md)
- 📖 [React Native Advanced Guide](./docs/cross-platform/react-native-advanced.md)
- 📖 [Component Patterns](./docs/cross-platform/component-patterns.md)
- 📖 [Migration Guide](./docs/cross-platform/migration-guide.md)

## 🌙 Theming

### Built-in Themes

- **Light Theme** - Clean, modern light interface
- **Dark Theme** - Comfortable dark mode with proper contrast
- **Auto Theme** - Automatically adapts to system preference

### Theme Usage

```tsx
import { useTheme } from '@reluna/ui'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </Button>
  )
}
```

### Custom Themes

```typescript
import { createThemeManager } from '@reluna/ui/utils/tokens'

const customTheme = {
  button: {
    primary: {
      background: {
        default: { value: '#your-brand-color', type: 'color' }
      }
    }
  }
}

const themeManager = createThemeManager(tokens)
themeManager.setTheme('light', customTheme)
```

## 🧪 Testing

### Built-in Testing Support

```typescript
// Component testing with accessibility
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '@reluna/ui'

expect.extend(toHaveNoViolations)

test('Button is accessible', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Visual Regression Testing

```typescript
// Playwright visual testing
import { test, expect } from '@playwright/test'

test('Button variants match design', async ({ page }) => {
  await page.goto('/components/button')
  await expect(page.locator('[data-testid="button-primary"]')).toHaveScreenshot()
})
```

## 📚 Documentation

### Development

```bash
# Start development environment
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm run test

# Run accessibility tests
npm run test:a11y

# Build library
npm run build
```

### Storybook

Our Storybook includes:
- 📖 Component documentation with live examples
- 🎛️ Interactive controls for all component props
- 🎨 Design token visualization
- ♿ Accessibility testing integration
- 📱 Responsive design testing

Visit our [Storybook](https://storybook.reluna.com) to explore all components.

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting pull requests.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/reluna/reluna-ui.git
cd reluna-ui

# Install dependencies
npm install

# Start development
npm run dev
```

### Component Development

1. **Create Component Structure**
   ```bash
   mkdir src/components/ui/your-component
   cd src/components/ui/your-component
   ```

2. **Follow Component Pattern**
   - `index.ts` - Public API exports
   - `YourComponent.tsx` - React implementation
   - `YourComponent.types.ts` - TypeScript interfaces
   - `YourComponent.styles.ts` - Token-based styling
   - `YourComponent.test.tsx` - Unit tests
   - `YourComponent.stories.tsx` - Storybook stories

3. **Use Design Tokens**
   ```typescript
   import { buttonVariants } from './YourComponent.styles'
   
   const YourComponent = ({ variant, size, ...props }) => {
     return (
       <button 
         className={buttonVariants({ variant, size })}
         {...props}
       />
     )
   }
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🏢 About Reluna

Reluna UI is developed and maintained by [Reluna.com](https://reluna.com). All rights reserved.

**Reluna.com** is a technology company focused on creating exceptional user experiences through innovative design systems and development tools.

### Contact & Support

- 🌐 **Website**: [reluna.com](https://reluna.com)
- 📧 **Email**: support@reluna.com
- 💬 **Discord**: [Join our community](https://discord.gg/reluna)
- 🐛 **Issues**: [GitHub Issues](https://github.com/reluna/reluna-ui/issues)
- 📖 **Documentation**: [docs.reluna.com](https://docs.reluna.com)

### Enterprise Support

For enterprise customers, we offer:
- 🎯 **Custom Theme Development**
- 🚀 **Migration Assistance**
- 🎓 **Team Training**
- 🔧 **Priority Support**
- 📊 **Custom Components**

Contact us at enterprise@reluna.com for more information.

---

**© 2024 Reluna.com - All rights reserved.**

Built with ❤️ by the Reluna team. 