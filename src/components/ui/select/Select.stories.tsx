import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown selection component for choosing from predefined options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual variant of the select',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry', disabled: true },
]

export const Default: Story = {
  args: {
    label: 'Choose a fruit',
    options: sampleOptions,
    placeholder: 'Select an option...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
    ],
    error: 'Please select a country',
    placeholder: 'Select a country...',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Priority Level',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' },
    ],
    helperText: 'Choose the priority level for this task',
    placeholder: 'Select priority...',
  },
}

export const Required: Story = {
  args: {
    label: 'Department',
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
    ],
    required: true,
    placeholder: 'Select department...',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    disabled: true,
    placeholder: 'Select status...',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        label="Small"
        size="sm"
        options={sampleOptions}
        placeholder="Small select..."
      />
      <Select
        label="Medium (Default)"
        size="md"
        options={sampleOptions}
        placeholder="Medium select..."
      />
      <Select
        label="Large"
        size="lg"
        options={sampleOptions}
        placeholder="Large select..."
      />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        label="Default"
        variant="default"
        options={sampleOptions}
        placeholder="Default variant..."
      />
      <Select
        label="Success"
        variant="success"
        options={sampleOptions}
        placeholder="Success variant..."
      />
      <Select
        label="Error"
        variant="error"
        options={sampleOptions}
        placeholder="Error variant..."
      />
    </div>
  ),
} 