# 🔤 Reluna UI Typography System

A modern and flexible typography system designed to ensure consistency and readability across all interfaces.

## 📋 Table of Contents

- [Overview](#overview)
- [Font Families](#font-families)
- [Sizes and Scale](#sizes-and-scale)
- [Components](#components)
- [Usage](#usage)
- [Examples](#examples)

## 🎯 Overview

The Reluna UI typography system is based on the following principles:

- **Readability**: Optimal sizes, line height, and contrast
- **Hierarchy**: Clear visual hierarchy for content structure
- **Flexibility**: Adaptation to various contexts and devices
- **Accessibility**: WCAG 2.1 AA compliance
- **Consistency**: Uniformity across all components

## 🔠 Font Families

### Sans-serif (Inter)
```css
font-family: 'Inter', system-ui, sans-serif;
```
- **Usage**: Primary interface font
- **Characteristics**: Excellent readability, modern design
- **Application**: UI elements, body text, forms

### Display (Inter Display)
```css
font-family: 'Inter Display', 'Inter', system-ui, sans-serif;
```
- **Usage**: Large headings and accents
- **Characteristics**: Optimized for large sizes
- **Application**: Hero headings, landing pages, banners

### Serif (Georgia)
```css
font-family: 'Georgia', 'Times New Roman', serif;
```
- **Usage**: Long texts and articles
- **Characteristics**: Classic, comfortable for reading
- **Application**: Blogs, documentation, articles

### Monospace (JetBrains Mono)
```css
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```
- **Usage**: Code and technical texts
- **Characteristics**: Equal character width, ligatures
- **Application**: Code, terminal, technical data

## 📏 Sizes and Scale

### Size Scale
| Size | Value | Pixels | Usage |
|------|-------|--------|-------|
| `xs`   | 0.75rem  | 12px    | Small text, captions |
| `sm`   | 0.875rem | 14px    | Small text, labels |
| `base` | 1rem     | 16px    | Base text size |
| `lg`   | 1.125rem | 18px    | Large text |
| `xl`   | 1.25rem  | 20px    | Subheadings |
| `2xl`  | 1.5rem   | 24px    | H4 headings |
| `3xl`  | 1.875rem | 30px    | H3 headings |
| `4xl`  | 2.25rem  | 36px    | H2 headings |
| `5xl`  | 3rem     | 48px    | H1 headings |
| `6xl`  | 3.75rem  | 60px    | Large headings |
| `7xl`  | 4.5rem   | 72px    | Hero headings |
| `8xl`  | 6rem     | 96px    | Very large headings |
| `9xl`  | 8rem     | 128px   | Maximum headings |

### Font Weights
| Name | Value | Usage |
|------|-------|-------|
| `thin`      | 100 | Decorative elements |
| `light`     | 300 | Secondary text |
| `normal`    | 400 | Body text |
| `medium`    | 500 | Labels, buttons |
| `semibold`  | 600 | Subheadings |
| `bold`      | 700 | Headings, accents |
| `black`     | 900 | Special accents |

### Line Heights
| Name | Value | Usage |
|------|-------|-------|
| `none`     | 1.0   | Large headings |
| `tight`    | 1.25  | Headings |
| `snug`     | 1.375 | Subheadings |
| `normal`   | 1.5   | Body text |
| `relaxed`  | 1.625 | Long texts |
| `loose`    | 2.0   | Special cases |

## 🧩 Components

### Typography (base)
Universal component for any text:

```tsx
import { Typography } from '@reluna/ui'

<Typography variant="h1" color="primary">
  Heading
</Typography>
```

### Heading
Semantic headings:

```tsx
import { Heading } from '@reluna/ui'

<Heading level={1}>First level heading</Heading>
<Heading level={2} color="muted">Subheading</Heading>
```

### Text
Body text:

```tsx
import { Text } from '@reluna/ui'

<Text size="large">Large paragraph</Text>
<Text>Regular text</Text>
<Text size="small" color="muted">Small text</Text>
```

### Display
Hero headings:

```tsx
import { Display } from '@reluna/ui'

<Display size="large">Main heading</Display>
<Display size="medium">Section heading</Display>
```

### Label
Form labels:

```tsx
import { Label } from '@reluna/ui'

<Label size="large" htmlFor="email">Email address</Label>
<Label size="medium">Regular label</Label>
```

### Code
Code and technical text:

```tsx
import { Code } from '@reluna/ui'

<Text>Use <Code inline>npm install</Code> to install</Text>

<Code>
{`function hello() {
  return 'Hello, World!'
}`}
</Code>
```

## 🎨 Variants and Styles

### Semantic Variants
```tsx
// Display styles
<Typography variant="display-large">Hero heading</Typography>
<Typography variant="display-medium">Large heading</Typography>
<Typography variant="display-small">Medium heading</Typography>

// Headings
<Typography variant="h1">H1 Heading</Typography>
<Typography variant="h2">H2 Heading</Typography>
<Typography variant="h3">H3 Heading</Typography>

// Body text
<Typography variant="body-large">Large text</Typography>
<Typography variant="body-medium">Regular text</Typography>
<Typography variant="body-small">Small text</Typography>

// Labels
<Typography variant="label-large">Large label</Typography>
<Typography variant="label-medium">Regular label</Typography>
<Typography variant="label-small">Small label</Typography>

// Special
<Typography variant="caption">Caption</Typography>
<Typography variant="overline">OVERLINE</Typography>
<Typography variant="link">Link</Typography>
```

### Text Colors
```tsx
<Typography color="default">Default text</Typography>
<Typography color="muted">Muted text</Typography>
<Typography color="primary">Primary color</Typography>
<Typography color="success">Success</Typography>
<Typography color="warning">Warning</Typography>
<Typography color="error">Error</Typography>
<Typography color="info">Info</Typography>
```

## 💡 Usage Examples

### Article
```tsx
function Article() {
  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <Typography variant="overline" color="primary">
          Category
        </Typography>
        <Heading level={1}>
          Article title
        </Heading>
        <Text color="muted">
          Brief article description
        </Text>
      </header>

      <Text size="large">
        Introductory paragraph with important information...
      </Text>

      <div className="space-y-4">
        <Heading level={2}>
          Subheading
        </Heading>
        <Text>
          Main article text...
        </Text>
      </div>
    </article>
  )
}
```

### Product Card
```tsx
function ProductCard() {
  return (
    <div className="space-y-4">
      <Typography variant="overline" color="primary">
        New
      </Typography>
      
      <Heading level={3}>
        Product name
      </Heading>
      
      <Text color="muted">
        Product description and key features
      </Text>
      
      <div className="flex items-center gap-2">
        <Text className="text-2xl font-bold">$99</Text>
        <Text size="small" color="muted" className="line-through">
          $129
        </Text>
      </div>
    </div>
  )
}
```

### Form
```tsx
function ContactForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label size="medium" htmlFor="name">
          Name *
        </Label>
        <input id="name" type="text" />
        <Text size="small" color="muted">
          Enter your full name
        </Text>
      </div>

      <div className="space-y-2">
        <Label size="medium" htmlFor="email">
          Email
        </Label>
        <input id="email" type="email" />
      </div>
    </form>
  )
}
```

### Code and Documentation
```tsx
function CodeExample() {
  return (
    <div className="space-y-4">
      <Heading level={3}>
        Installation
      </Heading>
      
      <Text>
        Install the package using <Code inline>npm</Code>:
      </Text>
      
      <Code>
        npm install @reluna/ui
      </Code>
      
      <Text size="small" color="muted">
        Make sure you have Node.js version 16 or higher
      </Text>
    </div>
  )
}
```

## 🎯 Recommendations

### Hierarchy
- Use no more than 3-4 heading levels per page
- Follow logical sequence (H1 → H2 → H3)
- Don't skip heading levels

### Readability
- Limit line length to 60-80 characters
- Use sufficient spacing between text blocks
- Ensure contrast ratio of at least 4.5:1

### Consistency
- Use semantic components instead of direct styles
- Maintain consistent style throughout the project
- Document special use cases

### Accessibility
- Always use semantic HTML elements
- Ensure logical document structure
- Test with screen readers

## 🔧 Customization

### Override Tokens
```css
:root {
  /* Change primary font */
  --font-sans: 'Roboto', system-ui, sans-serif;
  
  /* Change sizes */
  --text-base: 1.125rem; /* 18px instead of 16px */
  
  /* Change line height */
  --leading-normal: 1.6; /* More relaxed */
}
```

### Create Custom Variants
```tsx
// Extend existing variants
const customTypographyVariants = cva('', {
  variants: {
    variant: {
      ...typographyVariants.variants.variant,
      'hero': 'text-8xl font-black leading-none tracking-tighter',
      'subtitle': 'text-lg font-light leading-relaxed'
    }
  }
})
```

---

**Made with ❤️ by the Reluna UI team** 