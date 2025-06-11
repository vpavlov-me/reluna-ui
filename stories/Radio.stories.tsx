import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from '../src/components/ui/radio/Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'selected', 'disabled-default', 'disabled-selected'],
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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default Radio',
    size: 'medium',
    state: 'default',
    showText: true,
  },
}

export const Checked: Story = {
  args: {
    label: 'Checked Radio',
    size: 'medium',
    state: 'selected',
    checked: true,
    showText: true,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Radio with Description',
    description: 'This radio button has additional description text',
    showDescription: true,
    showText: true,
    size: 'medium',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    size: 'medium',
    state: 'disabled-default',
    disabled: true,
    showText: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    size: 'medium',
    state: 'disabled-selected',
    checked: true,
    disabled: true,
    showText: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio label="Small Radio" size="small" showText={true} />
      <Radio label="Medium Radio" size="medium" showText={true} />
      <Radio label="Large Radio" size="large" showText={true} />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio label="Default" state="default" showText={true} />
      <Radio label="Hover" state="hover" showText={true} />
      <Radio label="Selected" state="selected" checked={true} showText={true} />
      <Radio label="Disabled Default" state="disabled-default" disabled={true} showText={true} />
      <Radio label="Disabled Selected" state="disabled-selected" disabled={true} checked={true} showText={true} />
    </div>
  ),
}

export const FigmaShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Radio Sizes</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-8">
            <Radio label="Small" size="small" showText={true} />
            <Radio label="Small Selected" size="small" checked={true} showText={true} />
          </div>
          <div className="flex items-center gap-8">
            <Radio label="Medium" size="medium" showText={true} />
            <Radio label="Medium Selected" size="medium" checked={true} showText={true} />
          </div>
          <div className="flex items-center gap-8">
            <Radio label="Large" size="large" showText={true} />
            <Radio label="Large Selected" size="large" checked={true} showText={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">All States</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Normal States</h4>
            <Radio label="Default" state="default" showText={true} />
            <Radio label="Hover" state="hover" showText={true} />
            <Radio label="Selected" state="selected" checked={true} showText={true} />
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Disabled States</h4>
            <Radio label="Disabled Default" state="disabled-default" disabled={true} showText={true} />
            <Radio label="Disabled Selected" state="disabled-selected" checked={true} disabled={true} showText={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Descriptions</h3>
        <div className="space-y-4 max-w-md">
          <Radio
            label="Option 1"
            description="This is the first option with detailed description"
            showText={true}
            showDescription={true}
          />
          <Radio
            label="Option 2"
            description="This is the second option, currently selected"
            checked={true}
            showText={true}
            showDescription={true}
          />
          <Radio
            label="Option 3"
            description="This is the third option with more information"
            showText={true}
            showDescription={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Radio Groups</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Payment Method</h4>
            <div className="space-y-2">
              <Radio
                label="Credit Card"
                description="Pay with your credit or debit card"
                name="payment"
                showText={true}
                showDescription={true}
              />
              <Radio
                label="PayPal"
                description="Pay securely with your PayPal account"
                name="payment"
                checked={true}
                showText={true}
                showDescription={true}
              />
              <Radio
                label="Bank Transfer"
                description="Direct transfer from your bank account"
                name="payment"
                showText={true}
                showDescription={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
} 