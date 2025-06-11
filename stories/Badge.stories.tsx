import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, NotificationBadge, StatusBadge } from '../src/components/ui/badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'destructive', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <NotificationBadge count={5}>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Notifications</button>
      </NotificationBadge>
      <NotificationBadge count={99}>
        <button className="px-3 py-2 bg-green-500 text-white rounded">Messages</button>
      </NotificationBadge>
      <NotificationBadge count={999}>
        <button className="px-3 py-2 bg-purple-500 text-white rounded">Updates</button>
      </NotificationBadge>
      <NotificationBadge count={0} showZero>
        <button className="px-3 py-2 bg-gray-500 text-white rounded">Alerts</button>
      </NotificationBadge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="active">Active</StatusBadge>
      <StatusBadge status="inactive">Inactive</StatusBadge>
      <StatusBadge status="pending">Pending</StatusBadge>
      <StatusBadge status="error">Error</StatusBadge>
      <StatusBadge status="success">Success</StatusBadge>
      <StatusBadge status="warning">Warning</StatusBadge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>User Status:</span>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Priority:</span>
        <Badge variant="destructive">High</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Category:</span>
        <Badge variant="info">Technology</Badge>
      </div>
    </div>
  ),
}; 