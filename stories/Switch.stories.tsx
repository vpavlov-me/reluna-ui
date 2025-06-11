import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components/ui/switch/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['off', 'on', 'off-disabled', 'on-disabled'],
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showText: {
      control: 'boolean',
    },
    showDescription: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Switch',
    state: 'off',
    position: 'right',
    size: 'medium',
    showText: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'Enabled',
    state: 'on',
    position: 'right',
    size: 'medium',
    checked: true,
    showText: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Notifications',
    description: 'Receive push notifications',
    state: 'off',
    position: 'right',
    size: 'medium',
    showText: true,
    showDescription: true,
  },
};

export const LeftPosition: Story = {
  args: {
    label: 'Left Label',
    state: 'off',
    position: 'left',
    size: 'medium',
    showText: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    state: 'off-disabled',
    position: 'right',
    size: 'medium',
    disabled: true,
    showText: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    state: 'on-disabled',
    position: 'right',
    size: 'medium',
    checked: true,
    disabled: true,
    showText: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch
        label="Small"
        size="small"
        showText={true}
      />
      <Switch
        label="Medium"
        size="medium"
        showText={true}
      />
      <Switch
        label="Large"
        size="large"
        showText={true}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch
        label="Off"
        state="off"
        showText={true}
      />
      <Switch
        label="On"
        state="on"
        checked={true}
        showText={true}
      />
      <Switch
        label="Off Disabled"
        state="off-disabled"
        disabled={true}
        showText={true}
      />
      <Switch
        label="On Disabled"
        state="on-disabled"
        checked={true}
        disabled={true}
        showText={true}
      />
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch
        label="Label on Right"
        position="right"
        showText={true}
      />
      <Switch
        label="Label on Left"
        position="left"
        showText={true}
      />
    </div>
  ),
};

export const FigmaShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Switch States</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Normal States</h4>
            <Switch label="Off" state="off" showText={true} />
            <Switch label="On" state="on" checked={true} showText={true} />
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Disabled States</h4>
            <Switch label="Off Disabled" state="off-disabled" disabled={true} showText={true} />
            <Switch label="On Disabled" state="on-disabled" checked={true} disabled={true} showText={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-8">
            <Switch label="Small" size="small" showText={true} />
            <Switch label="Small On" size="small" checked={true} showText={true} />
          </div>
          <div className="flex items-center gap-8">
            <Switch label="Medium" size="medium" showText={true} />
            <Switch label="Medium On" size="medium" checked={true} showText={true} />
          </div>
          <div className="flex items-center gap-8">
            <Switch label="Large" size="large" showText={true} />
            <Switch label="Large On" size="large" checked={true} showText={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Label Positions</h3>
        <div className="space-y-4">
          <Switch
            label="Label on Right"
            position="right"
            showText={true}
          />
          <Switch
            label="Label on Left"
            position="left"
            showText={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Descriptions</h3>
        <div className="space-y-4 max-w-md">
          <Switch
            label="Push Notifications"
            description="Receive notifications on your device"
            showText={true}
            showDescription={true}
          />
          <Switch
            label="Email Updates"
            description="Get updates via email"
            checked={true}
            showText={true}
            showDescription={true}
          />
          <Switch
            label="Marketing"
            description="Receive marketing communications"
            position="left"
            showText={true}
            showDescription={true}
          />
        </div>
      </div>
    </div>
  ),
}; 