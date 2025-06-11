# Reluna UI Design System

A comprehensive, accessible, and scalable design system for Reluna's family wealth management platform.

## 🚀 Features

- **Accessible Components**: WCAG 2.1 AA compliant with full keyboard navigation
- **Theming System**: Light/dark themes with CSS variables and Tailwind integration
- **Design Tokens**: Figma-synced tokens via Style Dictionary
- **TypeScript**: Full type safety and IntelliSense support
- **Storybook**: Interactive documentation and component playground
- **Testing**: Comprehensive unit and accessibility testing
- **CI/CD**: Automated versioning, testing, and publishing

## 📦 Installation

```bash
npm install @reluna/ui
```

## 🎨 Usage

### Basic Setup

```tsx
import { Button, ThemeProvider } from '@reluna/ui'
import '@reluna/ui/styles'

function App() {
  return (
    <ThemeProvider theme="light">
      <Button variant="primary" size="md">
        Get Started
      </Button>
    </ThemeProvider>
  )
}
```

### With Custom Theme

```tsx
import { ThemeProvider, createTheme } from '@reluna/ui'

const customTheme = createTheme({
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  )
}
```

## 🏗️ Development

### Prerequisites

- Node.js 18+
- npm 8+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/reluna/reluna-ui.git
cd reluna-ui

# Install dependencies
npm install

# Start Storybook
npm run dev

# Build the library
npm run build

# Run tests
npm test
```

### Project Structure

```
reluna-ui/
├── src/
│   ├── components/          # React components
│   ├── tokens/             # Design tokens
│   ├── themes/             # Theme configurations
│   ├── utils/              # Utility functions
│   └── index.ts            # Main exports
├── stories/                # Storybook stories
├── tests/                  # Test files
├── .storybook/            # Storybook configuration
└── dist/                  # Built files
```

## 🎨 Design Tokens

Design tokens are the foundation of our design system. They're automatically synced from Figma and built using Style Dictionary.

### Token Categories

- **Colors**: Primary, secondary, semantic colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Margins, paddings, gaps
- **Borders**: Radii, widths, styles
- **Shadows**: Box shadows and elevations
- **Motion**: Animation durations and easings

### Using Tokens

```tsx
import { tokens } from '@reluna/ui/tokens'

const MyComponent = () => (
  <div 
    style={{
      color: tokens.colors.primary[500],
      fontSize: tokens.typography.size.lg,
      padding: tokens.spacing[4]
    }}
  >
    Content
  </div>
)
```

## 🧩 Components

### Core Components

- **Button**: Primary, secondary, ghost, and destructive variants
- **Input**: Text, email, password, number inputs with validation
- **Card**: Flexible container with header, body, and footer
- **Modal**: Accessible dialog with backdrop and focus management
- **Table**: Sortable, filterable data tables
- **Form**: Form controls with validation and error handling

### Layout Components

- **Container**: Responsive container with max-widths
- **Grid**: CSS Grid-based layout system
- **Stack**: Vertical and horizontal spacing utilities
- **Separator**: Visual dividers and spacers

### Feedback Components

- **Alert**: Success, warning, error, and info alerts
- **Toast**: Temporary notifications
- **Loading**: Spinners and skeleton loaders
- **Progress**: Progress bars and indicators

## 🎭 Theming

The theming system is built on CSS variables and Tailwind CSS, allowing for easy customization and runtime theme switching.

### Built-in Themes

- **Light**: Clean, professional light theme
- **Dark**: Modern dark theme with proper contrast
- **High Contrast**: Accessibility-focused high contrast theme

### Custom Themes

```tsx
import { createTheme } from '@reluna/ui'

const brandTheme = createTheme({
  name: 'brand',
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      // ... full color scale
      900: '#0c4a6e'
    },
    // ... other color definitions
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    }
  }
})
```

## 🧪 Testing

We use Vitest for unit testing and Storybook for visual testing.

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run visual tests with Chromatic
npm run chromatic
```

## 📚 Documentation

- **Storybook**: Interactive component documentation at [storybook-url]
- **Design Guidelines**: Comprehensive design principles and usage guidelines
- **API Reference**: Complete TypeScript API documentation

## 🚀 Publishing

The package is automatically published to GitHub Packages when changes are merged to main.

### Manual Release

```bash
npm run release
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write tests for new components and features
- Update Storybook stories for component changes
- Ensure accessibility standards are met
- Update documentation as needed

## 📄 License

This project is private and proprietary to Reluna. Unauthorized use, distribution, or modification is prohibited.

## 🆘 Support

For questions, issues, or feature requests, please:

1. Check the [documentation](storybook-url)
2. Search existing [GitHub issues](https://github.com/reluna/reluna-ui/issues)
3. Create a new issue with detailed information
4. Contact the design system team on Slack: #design-system

---

Built with ❤️ by the Reluna Design System Team 