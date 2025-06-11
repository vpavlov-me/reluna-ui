import React from 'react'
import { Typography, Heading, Text, Label, Code, Display } from '../ui/typography/Typography'

export const TypographyShowcase: React.FC = () => {
  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <Heading level={1}>Reluna Design System Typography</Heading>
        <Text size="large" color="muted">
          Демонстрация типографики с использованием шрифта PPObjectSans и токенов из Figma
        </Text>
      </div>

      {/* Display Styles */}
      <section className="space-y-4">
        <Heading level={2}>Display Styles</Heading>
        <div className="space-y-2">
          <Display size="large">Display Large (50px)</Display>
          <Display size="medium">Display Medium (32px)</Display>
          <Display size="small">Display Small (28px)</Display>
        </div>
      </section>

      {/* Headings */}
      <section className="space-y-4">
        <Heading level={2}>Headings</Heading>
        <div className="space-y-2">
          <Heading level={1}>Heading 1 (32px)</Heading>
          <Heading level={2}>Heading 2 (28px)</Heading>
          <Heading level={3}>Heading 3 (22px)</Heading>
          <Heading level={4}>Heading 4 (20px)</Heading>
          <Heading level={5}>Heading 5 (16px)</Heading>
          <Heading level={6}>Heading 6 (14px)</Heading>
        </div>
      </section>

      {/* Body Text */}
      <section className="space-y-4">
        <Heading level={2}>Body Text</Heading>
        <div className="space-y-4">
          <Text size="large">
            Body Large (20px) - Это большой текст для важных параграфов и введений. 
            PPObjectSans обеспечивает отличную читаемость на всех размерах.
          </Text>
          <Text size="medium">
            Body Medium (16px) - Основной размер текста для большинства контента. 
            Оптимальный баланс между читаемостью и компактностью.
          </Text>
          <Text size="small">
            Body Small (14px) - Меньший текст для дополнительной информации, 
            подписей и второстепенного контента.
          </Text>
        </div>
      </section>

      {/* Labels */}
      <section className="space-y-4">
        <Heading level={2}>Labels</Heading>
        <div className="space-y-2">
          <Label size="large">Label Large (16px)</Label>
          <Label size="medium">Label Medium (14px)</Label>
          <Label size="small">Label Small (12px)</Label>
        </div>
      </section>

      {/* Special Text */}
      <section className="space-y-4">
        <Heading level={2}>Special Text</Heading>
        <div className="space-y-2">
          <Typography variant="caption">Caption (12px) - Подписи к изображениям и дополнительная информация</Typography>
          <Typography variant="overline">Overline (10px) - Заголовки секций</Typography>
        </div>
      </section>

      {/* Button Text */}
      <section className="space-y-4">
        <Heading level={2}>Button Text</Heading>
        <div className="flex gap-4 items-center">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
            <Typography variant="button-large">Button Large</Typography>
          </button>
          <button className="px-3 py-2 bg-secondary text-secondary-foreground rounded">
            <Typography variant="button-medium">Button Medium</Typography>
          </button>
          <button className="px-2 py-1 bg-muted text-muted-foreground rounded">
            <Typography variant="button-small">Button Small</Typography>
          </button>
        </div>
      </section>

      {/* Code */}
      <section className="space-y-4">
        <Heading level={2}>Code</Heading>
        <div className="space-y-2">
          <Text>
            Inline code: <Code inline>const example = "PPObjectSans";</Code>
          </Text>
          <Code>
{`// Code block example
function greet(name: string) {
  return \`Hello, \${name}! Welcome to Reluna Design System.\`;
}`}
          </Code>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <Heading level={2}>Text Colors</Heading>
        <div className="space-y-2">
          <Text color="default">Default text color</Text>
          <Text color="muted">Muted text color</Text>
          <Text color="primary">Primary text color</Text>
          <Text color="success">Success text color</Text>
          <Text color="warning">Warning text color</Text>
          <Text color="error">Error text color</Text>
          <Text color="info">Info text color</Text>
        </div>
      </section>

      {/* Font Weights */}
      <section className="space-y-4">
        <Heading level={2}>Font Weights</Heading>
        <div className="space-y-2">
          <Text className="font-normal">Regular (400) - PPObjectSans-Regular.ttf</Text>
          <Text className="font-medium">Medium (500) - PPObjectSans-Medium.ttf</Text>
          <Text className="font-bold">Bold (700) - PPObjectSans-Bold.ttf</Text>
        </div>
      </section>
    </div>
  )
}

export default TypographyShowcase 