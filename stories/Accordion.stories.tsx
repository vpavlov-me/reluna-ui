import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../src/components/ui/accordion/Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'separated'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Facebook and the community.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>
          You can get started with React by creating a new project using Create React App, or by adding React to an existing project. The official React documentation provides excellent tutorials and guides.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What are components?</AccordionTrigger>
        <AccordionContent>
          Components are the building blocks of React applications. They are reusable pieces of code that return JSX elements to be rendered to the page. Components can be functional or class-based.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const SingleMode: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces, particularly web applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>
          You can get started with React by creating a new project using Create React App.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const MultipleMode: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces, particularly web applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>
          You can get started with React by creating a new project using Create React App.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What are components?</AccordionTrigger>
        <AccordionContent>
          Components are the building blocks of React applications.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="shipping">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days at an additional cost.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day return policy for all items in original condition. Returns are free for defective items, and a small fee applies for other returns.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>Do you offer warranties?</AccordionTrigger>
        <AccordionContent>
          Yes, all our products come with a manufacturer warranty. The warranty period varies by product, typically ranging from 1-3 years.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact support?</AccordionTrigger>
        <AccordionContent>
          You can reach our support team via email at support@example.com, phone at 1-800-123-4567, or through our live chat feature available 24/7.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const TechnicalDocs: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="installation">
        <AccordionTrigger>Installation</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Install the package using npm or yarn:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              <code>npm install @reluna/ui</code>
            </pre>
            <p>Or with yarn:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              <code>yarn add @reluna/ui</code>
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="usage">
        <AccordionTrigger>Basic Usage</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Import and use components in your React application:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              <code>{`import { Button } from '@reluna/ui';

function App() {
  return <Button>Click me</Button>;
}`}</code>
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="theming">
        <AccordionTrigger>Theming</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Customize the theme by providing your own CSS variables:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              <code>{`:root {
  --primary: #3b82f6;
  --secondary: #64748b;
  --accent: #f59e0b;
}`}</code>
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} 