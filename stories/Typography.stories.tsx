import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '../src/components/ui/typography/Typography'
import { Heading, Text, Label, Code, Display } from '../src/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card/Card';

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display-large', 'display-medium', 'display-small',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'body-large', 'body-medium', 'body-small',
        'label-large', 'label-medium', 'label-small',
        'caption', 'overline',
        'button-large', 'button-medium', 'button-small',
        'code-inline', 'code-block', 'link'
      ],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label', 'code', 'pre'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Sample text',
    variant: 'body-medium',
    color: 'default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      {/* Display Styles */}
      <Card>
        <CardHeader>
          <CardTitle>Display Styles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Typography variant="overline" className="mb-2">Display Large</Typography>
            <Display size="large">Hero Heading</Display>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Display Medium</Typography>
            <Display size="medium">Large Heading</Display>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Display Small</Typography>
            <Display size="small">Medium Heading</Display>
          </div>
        </CardContent>
      </Card>

      {/* Headings */}
      <Card>
        <CardHeader>
          <CardTitle>Headings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Typography variant="overline" className="mb-2">H1</Typography>
            <Heading level={1}>First Level Heading</Heading>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">H2</Typography>
            <Heading level={2}>Second Level Heading</Heading>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">H3</Typography>
            <Heading level={3}>Third Level Heading</Heading>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">H4</Typography>
            <Heading level={4}>Fourth Level Heading</Heading>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">H5</Typography>
            <Heading level={5}>Fifth Level Heading</Heading>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">H6</Typography>
            <Heading level={6}>Sixth Level Heading</Heading>
          </div>
        </CardContent>
      </Card>

      {/* Body Text */}
      <Card>
        <CardHeader>
          <CardTitle>Body Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Typography variant="overline" className="mb-2">Body Large</Typography>
            <Text size="large">
              Large body text for important paragraphs. Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Body Medium</Typography>
            <Text size="medium">
              Regular body text for most cases. Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Body Small</Typography>
            <Text size="small">
              Small body text for additional information. Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </div>
        </CardContent>
      </Card>

      {/* Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Labels and Captions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Typography variant="overline" className="mb-2">Label Large</Typography>
            <Label size="large">Large Form Label</Label>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Label Medium</Typography>
            <Label size="medium">Regular Form Label</Label>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Label Small</Typography>
            <Label size="small">Small Label</Label>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Caption</Typography>
            <Typography variant="caption">Image caption or additional information</Typography>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Overline</Typography>
            <Typography variant="overline">Overline Text</Typography>
          </div>
        </CardContent>
      </Card>

      {/* Code */}
      <Card>
        <CardHeader>
          <CardTitle>Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Typography variant="overline" className="mb-2">Inline Code</Typography>
            <Text>
              Use <Code inline>npm install</Code> to install packages.
            </Text>
          </div>
          <div>
            <Typography variant="overline" className="mb-2">Code Block</Typography>
            <Code className="block p-4 bg-muted rounded-md">
{`function hello() {
  console.log('Hello, World!');
  return 'success';
}`}
            </Code>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Text Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Typography color="default">Default text (default)</Typography>
          <Typography color="muted">Muted text (muted)</Typography>
          <Typography color="primary">Primary color (primary)</Typography>
          <Typography color="secondary">Secondary color (secondary)</Typography>
          <Typography color="success">Success (success)</Typography>
          <Typography color="warning">Warning (warning)</Typography>
          <Typography color="error">Error (error)</Typography>
          <Typography color="info">Info (info)</Typography>
        </CardContent>
      </Card>
    </div>
  ),
};

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Typography variant="h2">Size Scale</Typography>
        <Typography variant="body-medium" color="muted">
          Demonstration of all font sizes in the system
        </Typography>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">9xl</Typography>
          <Typography className="text-9xl font-bold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">8xl</Typography>
          <Typography className="text-8xl font-bold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">7xl</Typography>
          <Typography className="text-7xl font-bold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">6xl</Typography>
          <Typography className="text-6xl font-bold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">5xl</Typography>
          <Typography className="text-5xl font-bold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">4xl</Typography>
          <Typography className="text-4xl font-bold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">3xl</Typography>
          <Typography className="text-3xl font-semibold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">2xl</Typography>
          <Typography className="text-2xl font-semibold">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">xl</Typography>
          <Typography className="text-xl font-medium">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">lg</Typography>
          <Typography className="text-lg">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">base</Typography>
          <Typography className="text-base">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">sm</Typography>
          <Typography className="text-sm">Aa</Typography>
        </div>
        <div className="flex items-baseline gap-4">
          <Typography variant="caption" className="w-16 text-right">xs</Typography>
          <Typography className="text-xs">Aa</Typography>
        </div>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Typography variant="h2">Font Weights</Typography>
        <Typography variant="body-medium" color="muted">
          All available font weight variants
        </Typography>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Typography variant="caption" className="w-24 text-right">Thin (100)</Typography>
          <Typography className="text-2xl font-thin">The quick brown fox</Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="caption" className="w-24 text-right">Light (300)</Typography>
          <Typography className="text-2xl font-light">The quick brown fox</Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="caption" className="w-24 text-right">Normal (400)</Typography>
          <Typography className="text-2xl font-normal">The quick brown fox</Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="caption" className="w-24 text-right">Medium (500)</Typography>
          <Typography className="text-2xl font-medium">The quick brown fox</Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="caption" className="w-24 text-right">Semibold (600)</Typography>
          <Typography className="text-2xl font-semibold">The quick brown fox</Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="caption" className="w-24 text-right">Bold (700)</Typography>
          <Typography className="text-2xl font-bold">The quick brown fox</Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="caption" className="w-24 text-right">Black (900)</Typography>
          <Typography className="text-2xl font-black">The quick brown fox</Typography>
        </div>
      </div>
    </div>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Typography variant="h2">Font Families</Typography>
        <Typography variant="body-medium" color="muted">
          Different font families in the design system
        </Typography>
      </div>
      
      <div className="space-y-6">
        <div>
          <Typography variant="overline" className="mb-2">Sans-serif (Inter)</Typography>
          <Typography className="text-2xl font-sans">
            The quick brown fox jumps over the lazy dog. 1234567890
          </Typography>
          <Typography variant="caption" className="mt-1">
            Primary font for interface and most texts
          </Typography>
        </div>
        
        <div>
          <Typography variant="overline" className="mb-2">Display (Inter Display)</Typography>
          <Typography className="text-2xl font-display font-bold">
            The quick brown fox jumps over the lazy dog. 1234567890
          </Typography>
          <Typography variant="caption" className="mt-1">
            Font for large headings and accents
          </Typography>
        </div>
        
        <div>
          <Typography variant="overline" className="mb-2">Serif (Georgia)</Typography>
          <Typography className="text-2xl font-serif">
            The quick brown fox jumps over the lazy dog. 1234567890
          </Typography>
          <Typography variant="caption" className="mt-1">
            Serif font for long texts and articles
          </Typography>
        </div>
        
        <div>
          <Typography variant="overline" className="mb-2">Monospace (JetBrains Mono)</Typography>
          <Typography className="text-xl font-mono">
            const message = "Hello, World!"; // 1234567890
          </Typography>
          <Typography variant="caption" className="mt-1">
            Monospace font for code and technical texts
          </Typography>
        </div>
      </div>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <Typography variant="overline" color="primary">New Product</Typography>
        <Display size="large" className="max-w-3xl mx-auto">
          Revolutionary Design System for Modern Applications
        </Display>
        <Text size="large" color="muted" className="max-w-2xl mx-auto">
          Create beautiful and accessible interfaces with our 
          comprehensive system of components and design tokens.
        </Text>
      </div>

      {/* Article */}
      <Card className="p-8">
        <article className="space-y-6">
          <header className="space-y-3">
            <Typography variant="overline" color="primary">Guide</Typography>
            <Heading level={1}>How to Use Typography in Design Systems</Heading>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>15 min read</span>
              <span>•</span>
              <span>Updated today</span>
            </div>
          </header>

          <Text size="large">
            Typography is the foundation of any design system. It defines how users 
            perceive and interact with your content.
          </Text>

          <div className="space-y-4">
            <Heading level={2}>Core Principles</Heading>
            <Text>
              When creating a typographic system, it's important to consider several key principles:
            </Text>
            
            <ul className="space-y-2 ml-6">
              <li className="flex gap-2">
                <span>•</span>
                <Text>Readability and accessibility for all users</Text>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <Text>Consistency across all interfaces</Text>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <Text>Flexibility for various usage contexts</Text>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Heading level={3}>Code Example</Heading>
            <Text>
              Here's how you can use the <Code inline>Typography</Code> component in your project:
            </Text>
            
            <Code className="block p-4 bg-muted rounded-md">
{`import { Typography, Heading, Text } from '@reluna/ui'

function Article() {
  return (
    <article>
      <Heading level={1}>Article Title</Heading>
      <Text size="large">Introductory paragraph...</Text>
      <Text>Main article text...</Text>
    </article>
  )
}`}
            </Code>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5">
            <Text className="font-medium">💡 Tip</Text>
            <Text size="small" color="muted">
              Use semantic components instead of direct styling 
              for better maintainability and consistency.
            </Text>
          </div>
        </article>
      </Card>
    </div>
  ),
}; 