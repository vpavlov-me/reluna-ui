import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../src/components/ui/card/Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['1', '2'],
    },
    showEdit: {
      control: 'boolean',
    },
    showButtons: {
      control: 'boolean',
    },
    showDescription: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a card description that provides more details about the content.',
    type: '1',
    showEdit: false,
    showButtons: false,
    showDescription: true,
    children: 'Card content goes here. This can be any React content.',
  },
}

export const Type1: Story = {
  args: {
    title: 'Type 1 Card',
    description: 'This is a Type 1 card with basic styling.',
    type: '1',
    showEdit: true,
    showButtons: true,
    showDescription: true,
    children: 'This is the content area of a Type 1 card.',
  },
}

export const Type2: Story = {
  args: {
    title: 'Type 2 Card',
    description: 'This is a Type 2 card with enhanced styling.',
    type: '2',
    showEdit: true,
    showButtons: true,
    showDescription: true,
    children: 'This is the content area of a Type 2 card.',
  },
}

export const WithEdit: Story = {
  args: {
    title: 'Editable Card',
    description: 'This card has an edit button in the header.',
    type: '1',
    showEdit: true,
    showButtons: false,
    showDescription: true,
    children: 'Card content with edit functionality.',
  },
}

export const WithButtons: Story = {
  args: {
    title: 'Card with Actions',
    description: 'This card has action buttons in the footer.',
    type: '1',
    showEdit: false,
    showButtons: true,
    showDescription: true,
    children: 'Card content with action buttons.',
  },
}

export const MinimalCard: Story = {
  args: {
    title: 'Minimal Card',
    type: '1',
    showEdit: false,
    showButtons: false,
    showDescription: false,
    children: 'A minimal card with just title and content.',
  },
}

export const FullFeatured: Story = {
  args: {
    title: 'Full Featured Card',
    description: 'This card has all features enabled: edit button, description, and action buttons.',
    type: '2',
    showEdit: true,
    showButtons: true,
    showDescription: true,
    children: 'This card demonstrates all available features and options.',
  },
}

export const CardTypes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <Card
        title="Type 1 Card"
        description="Standard card with basic styling"
        type="1"
        showEdit={true}
        showButtons={true}
        showDescription={true}
      >
        <p>This is a Type 1 card with all features enabled.</p>
      </Card>
      <Card
        title="Type 2 Card"
        description="Enhanced card with improved styling"
        type="2"
        showEdit={true}
        showButtons={true}
        showDescription={true}
      >
        <p>This is a Type 2 card with all features enabled.</p>
      </Card>
    </div>
  ),
}

export const FeatureVariations: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <Card
        title="Basic Card"
        type="1"
        showEdit={false}
        showButtons={false}
        showDescription={false}
      >
        <p>Minimal card with just title and content.</p>
      </Card>
      <Card
        title="With Description"
        description="This card includes a description"
        type="1"
        showEdit={false}
        showButtons={false}
        showDescription={true}
      >
        <p>Card with description but no actions.</p>
      </Card>
      <Card
        title="With Edit"
        description="This card has an edit button"
        type="1"
        showEdit={true}
        showButtons={false}
        showDescription={true}
      >
        <p>Card with edit functionality.</p>
      </Card>
      <Card
        title="With Actions"
        description="This card has action buttons"
        type="1"
        showEdit={false}
        showButtons={true}
        showDescription={true}
      >
        <p>Card with action buttons in footer.</p>
      </Card>
    </div>
  ),
}

export const FigmaShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 w-full max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Card Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Type 1 Card"
            description="This is a Type 1 card with standard styling and layout."
            type="1"
            showEdit={true}
            showButtons={true}
            showDescription={true}
          >
            <div className="space-y-2">
              <p>Type 1 cards are perfect for standard content display.</p>
              <p>They provide a clean and simple layout.</p>
            </div>
          </Card>
          <Card
            title="Type 2 Card"
            description="This is a Type 2 card with enhanced styling and improved visual hierarchy."
            type="2"
            showEdit={true}
            showButtons={true}
            showDescription={true}
          >
            <div className="space-y-2">
              <p>Type 2 cards offer enhanced visual styling.</p>
              <p>They're ideal for more prominent content.</p>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Feature Combinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            title="Minimal"
            type="1"
            showEdit={false}
            showButtons={false}
            showDescription={false}
          >
            <p>Just title and content.</p>
          </Card>
          <Card
            title="With Description"
            description="Includes description text"
            type="1"
            showEdit={false}
            showButtons={false}
            showDescription={true}
          >
            <p>Title, description, and content.</p>
          </Card>
          <Card
            title="With Edit"
            description="Has edit functionality"
            type="1"
            showEdit={true}
            showButtons={false}
            showDescription={true}
          >
            <p>Editable card content.</p>
          </Card>
          <Card
            title="With Actions"
            description="Has action buttons"
            type="1"
            showEdit={false}
            showButtons={true}
            showDescription={true}
          >
            <p>Card with footer actions.</p>
          </Card>
          <Card
            title="Full Featured"
            description="All features enabled"
            type="2"
            showEdit={true}
            showButtons={true}
            showDescription={true}
          >
            <p>Complete card with all options.</p>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Content Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="User Profile"
            description="Manage your account settings and preferences"
            type="1"
            showEdit={true}
            showButtons={true}
            showDescription={true}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
              <p className="text-sm">Last login: 2 hours ago</p>
            </div>
          </Card>
          <Card
            title="Project Status"
            description="Track progress and manage project tasks"
            type="2"
            showEdit={true}
            showButtons={true}
            showDescription={true}
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600">3 of 4 tasks completed</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  ),
} 