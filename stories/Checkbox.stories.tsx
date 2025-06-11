import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../src/components/ui/checkbox/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
      options: ['default', 'hover', 'selected', 'multi', 'disabled-default', 'disabled-selected'],
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
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
    label: 'Checkbox',
    size: 'medium',
    state: 'default',
    showText: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Accept terms',
    description: 'I agree to the terms and conditions',
    size: 'medium',
    state: 'default',
    showText: true,
    showDescription: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked',
    size: 'medium',
    state: 'selected',
    checked: true,
    showText: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate',
    size: 'medium',
    state: 'multi',
    indeterminate: true,
    showText: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    size: 'medium',
    state: 'disabled-default',
    disabled: true,
    showText: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    size: 'medium',
    state: 'disabled-selected',
    checked: true,
    disabled: true,
    showText: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        label="Small"
        size="small"
        showText={true}
      />
      <Checkbox
        label="Medium"
        size="medium"
        showText={true}
      />
      <Checkbox
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
      <Checkbox
        label="Default"
        state="default"
        showText={true}
      />
      <Checkbox
        label="Hover"
        state="hover"
        showText={true}
      />
      <Checkbox
        label="Selected"
        state="selected"
        checked={true}
        showText={true}
      />
      <Checkbox
        label="Multi (Indeterminate)"
        state="multi"
        indeterminate={true}
        showText={true}
      />
      <Checkbox
        label="Disabled Default"
        state="disabled-default"
        disabled={true}
        showText={true}
      />
      <Checkbox
        label="Disabled Selected"
        state="disabled-selected"
        checked={true}
        disabled={true}
        showText={true}
      />
    </div>
  ),
};

export const FigmaShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Checkbox Sizes</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-8">
            <Checkbox label="Small" size="small" showText={true} />
            <Checkbox label="Small Checked" size="small" checked={true} showText={true} />
            <Checkbox label="Small Indeterminate" size="small" indeterminate={true} showText={true} />
          </div>
          <div className="flex items-center gap-8">
            <Checkbox label="Medium" size="medium" showText={true} />
            <Checkbox label="Medium Checked" size="medium" checked={true} showText={true} />
            <Checkbox label="Medium Indeterminate" size="medium" indeterminate={true} showText={true} />
          </div>
          <div className="flex items-center gap-8">
            <Checkbox label="Large" size="large" showText={true} />
            <Checkbox label="Large Checked" size="large" checked={true} showText={true} />
            <Checkbox label="Large Indeterminate" size="large" indeterminate={true} showText={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">All States</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Normal States</h4>
            <Checkbox label="Default" state="default" showText={true} />
            <Checkbox label="Hover" state="hover" showText={true} />
            <Checkbox label="Selected" state="selected" checked={true} showText={true} />
            <Checkbox label="Multi" state="multi" indeterminate={true} showText={true} />
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Disabled States</h4>
            <Checkbox label="Disabled Default" state="disabled-default" disabled={true} showText={true} />
            <Checkbox label="Disabled Selected" state="disabled-selected" checked={true} disabled={true} showText={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Descriptions</h3>
        <div className="space-y-4 max-w-md">
          <Checkbox
            label="Marketing emails"
            description="Receive emails about new products and features"
            showText={true}
            showDescription={true}
          />
          <Checkbox
            label="Security alerts"
            description="Get notified about important security updates"
            checked={true}
            showText={true}
            showDescription={true}
          />
          <Checkbox
            label="Newsletter"
            description="Weekly newsletter with tips and updates"
            indeterminate={true}
            showText={true}
            showDescription={true}
          />
        </div>
      </div>
    </div>
  ),
}; 