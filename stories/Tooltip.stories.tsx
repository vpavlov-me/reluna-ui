import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/components/ui/tooltip/Tooltip';
import { Button } from '../src/components/ui/button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'error', 'success', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <Tooltip content="Top tooltip" side="top">
        <Button>Top</Button>
      </Tooltip>
      
      <Tooltip content="Top start tooltip" side="top" align="start">
        <Button>Top Start</Button>
      </Tooltip>
      
      <Tooltip content="Top end tooltip" side="top" align="end">
        <Button>Top End</Button>
      </Tooltip>
      
      <Tooltip content="Left tooltip" side="left">
        <Button>Left</Button>
      </Tooltip>
      
      <div></div>
      
      <Tooltip content="Right tooltip" side="right">
        <Button>Right</Button>
      </Tooltip>
      
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      
      <Tooltip content="Bottom start tooltip" side="bottom" align="start">
        <Button>Bottom Start</Button>
      </Tooltip>
      
      <Tooltip content="Bottom end tooltip" side="bottom" align="end">
        <Button>Bottom End</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: 'This tooltip has a delay',
    delayDuration: 1000,
    skipDelayDuration: 500,
    children: <Button>Hover with delay</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a very long tooltip content that demonstrates how tooltips handle longer text. It should wrap appropriately and remain readable.',
    children: <Button>Long tooltip</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div>
        <div className="font-semibold">Rich Tooltip</div>
        <div className="text-sm">This tooltip contains rich HTML content</div>
        <div className="text-xs text-gray-300 mt-1">With multiple lines</div>
      </div>
    ),
    children: <Button>Rich content</Button>,
  },
};

export const DisabledTrigger: Story = {
  args: {
    content: 'Tooltip on disabled element',
    children: <Button disabled>Disabled button</Button>,
  },
};

export const OnDifferentElements: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-4">
        <Tooltip content="Button tooltip">
          <Button>Button</Button>
        </Tooltip>
        
        <Tooltip content="Link tooltip">
          <a href="#" className="text-blue-600 underline">Link</a>
        </Tooltip>
        
        <Tooltip content="Span tooltip">
          <span className="px-2 py-1 bg-gray-200 rounded">Span</span>
        </Tooltip>
      </div>
      
      <div>
        <Tooltip content="This is an icon tooltip">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const ControlledTooltip: Story = {
  render: () => {
    return (
      <div className="space-x-4">
        <Tooltip content="Always visible tooltip" disabled={false}>
          <Button>Hover me</Button>
        </Tooltip>
        
        <Tooltip content="Disabled tooltip" disabled={true}>
          <Button>Disabled tooltip</Button>
        </Tooltip>
      </div>
    );
  },
};

export const HelpSystem: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg max-w-md">
      <h3 className="text-lg font-semibold">User Profile Form</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            Username
            <Tooltip content="Your username must be unique and contain only letters, numbers, and underscores">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </Tooltip>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter username"
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            Email
            <Tooltip content="We'll use this email for account notifications and password recovery">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </Tooltip>
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter email"
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            Password
            <Tooltip content="Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </Tooltip>
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter password"
          />
        </div>
      </div>
    </div>
  ),
}; 