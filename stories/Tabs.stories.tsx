import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from '../src/components/ui/tabs/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs = [
  {
    value: 'tab1',
    label: 'Tab 1',
    content: <div className="p-4">Content for Tab 1</div>,
  },
  {
    value: 'tab2',
    label: 'Tab 2',
    content: <div className="p-4">Content for Tab 2</div>,
  },
  {
    value: 'tab3',
    label: 'Tab 3',
    content: <div className="p-4">Content for Tab 3</div>,
  },
];

export const Default: Story = {
  args: {
    tabs: basicTabs,
    defaultValue: 'tab1',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold">Default</h3>
        <Tabs tabs={basicTabs} variant="default" defaultValue="tab1" />
      </div>
      <div>
        <h3 className="mb-4 font-semibold">Pills</h3>
        <Tabs tabs={basicTabs} variant="pills" defaultValue="tab1" />
      </div>
      <div>
        <h3 className="mb-4 font-semibold">Underline</h3>
        <Tabs tabs={basicTabs} variant="underline" defaultValue="tab1" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    tabs: basicTabs,
    orientation: 'vertical',
    defaultValue: 'tab1',
  },
};

export const Dashboard: Story = {
  args: {
    tabs: [
      {
        value: 'overview',
        label: 'Overview',
        content: (
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Dashboard Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">$45,678</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
              <div className="p-4 bg-purple-50 rounded">
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        value: 'analytics',
        label: 'Analytics',
        content: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Page Views</span>
                <span className="font-semibold">12,345</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Unique Visitors</span>
                <span className="font-semibold">8,901</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Bounce Rate</span>
                <span className="font-semibold">23%</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        value: 'settings',
        label: 'Settings',
        content: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <input type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span>Auto Save</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        ),
      },
    ],
    variant: 'pills',
    defaultValue: 'overview',
  },
}; 