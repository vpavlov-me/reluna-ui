import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../src/components/ui/input/Input'
import { Search, Mail, Eye } from 'lucide-react'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    size: 'medium',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    variant: 'default',
    size: 'medium',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
    variant: 'default',
    size: 'medium',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    variant: 'error',
    errorMessage: 'Please enter a valid email address',
    size: 'medium',
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <Search className="h-4 w-4" />,
    variant: 'default',
    size: 'medium',
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    rightIcon: <Mail className="h-4 w-4" />,
    variant: 'default',
    size: 'medium',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Small"
        placeholder="Small input"
        size="small"
      />
      <Input
        label="Medium"
        placeholder="Medium input"
        size="medium"
      />
      <Input
        label="Large"
        placeholder="Large input"
        size="large"
      />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Default State"
        placeholder="Default input"
        variant="default"
      />
      <Input
        label="Error State"
        placeholder="Error input"
        variant="error"
        errorMessage="This field has an error"
      />
      <Input
        label="Disabled State"
        placeholder="Disabled input"
        disabled
      />
    </div>
  ),
}

export const FigmaShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">Input States</h3>
        <div className="space-y-4">
          <Input
            label="Default Input"
            placeholder="Enter text..."
            variant="default"
            helperText="This is helper text"
          />
          <Input
            label="Error Input"
            placeholder="Enter text..."
            variant="error"
            errorMessage="This field is required"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Icons</h3>
        <div className="space-y-4">
          <Input
            label="Search"
            placeholder="Search..."
            leftIcon={<Search className="h-4 w-4" />}
          />
          <Input
            label="Email"
            placeholder="Enter email"
            rightIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            rightIcon={<Eye className="h-4 w-4" />}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-4">
          <Input
            label="Small"
            placeholder="Small input"
            size="small"
          />
          <Input
            label="Medium"
            placeholder="Medium input"
            size="medium"
          />
          <Input
            label="Large"
            placeholder="Large input"
            size="large"
          />
        </div>
      </div>
    </div>
  ),
} 