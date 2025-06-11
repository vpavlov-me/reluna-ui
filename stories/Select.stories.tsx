import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOption } from '../src/components/ui/select/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
];

export const Default: Story = {
  args: {
    label: 'Select an option',
    placeholder: 'Choose...',
    options: basicOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Select with error',
    placeholder: 'Choose...',
    options: basicOptions,
    error: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Select with helper text',
    placeholder: 'Choose...',
    options: basicOptions,
    helperText: 'Please select one of the available options',
  },
};

export const Required: Story = {
  args: {
    label: 'Required select',
    placeholder: 'Choose...',
    options: basicOptions,
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Select
        label="Small"
        size="sm"
        placeholder="Small select"
        options={basicOptions}
      />
      <Select
        label="Medium (default)"
        size="md"
        placeholder="Medium select"
        options={basicOptions}
      />
      <Select
        label="Large"
        size="lg"
        placeholder="Large select"
        options={basicOptions}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Select
        label="Default"
        variant="default"
        placeholder="Default variant"
        options={basicOptions}
      />
      <Select
        label="Success"
        variant="success"
        placeholder="Success variant"
        options={basicOptions}
      />
      <Select
        label="Error"
        variant="error"
        placeholder="Error variant"
        options={basicOptions}
      />
    </div>
  ),
};

export const GroupedOptions: Story = {
  render: () => (
    <div className="w-64">
      <Select label="Grouped options" placeholder="Choose a country">
        <optgroup label="North America">
          <SelectOption value="us">United States</SelectOption>
          <SelectOption value="ca">Canada</SelectOption>
          <SelectOption value="mx">Mexico</SelectOption>
        </optgroup>
        <optgroup label="Europe">
          <SelectOption value="uk">United Kingdom</SelectOption>
          <SelectOption value="fr">France</SelectOption>
          <SelectOption value="de">Germany</SelectOption>
        </optgroup>
      </Select>
    </div>
  ),
}; 