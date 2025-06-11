import type { Meta, StoryObj } from '@storybook/react'
import { Loader, LoadingButton, LoadingOverlay } from '../src/components/ui/loader'

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse', 'bars'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'spinner',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Loader size="sm" variant="spinner" />
        <p className="mt-2 text-sm">Small</p>
      </div>
      <div className="text-center">
        <Loader size="md" variant="spinner" />
        <p className="mt-2 text-sm">Medium</p>
      </div>
      <div className="text-center">
        <Loader size="lg" variant="spinner" />
        <p className="mt-2 text-sm">Large</p>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Loader variant="spinner" />
        <p className="mt-2 text-sm">Spinner</p>
      </div>
      <div className="text-center">
        <Loader variant="pulse" />
        <p className="mt-2 text-sm">Pulse</p>
      </div>
      <div className="text-center">
        <Loader variant="dots" />
        <p className="mt-2 text-sm">Dots</p>
      </div>
      <div className="text-center">
        <Loader variant="bars" />
        <p className="mt-2 text-sm">Bars</p>
      </div>
    </div>
  ),
}

export const LoadingButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <LoadingButton loading>Loading...</LoadingButton>
      <LoadingButton loading loadingText="Processing...">Submit</LoadingButton>
    </div>
  ),
}

export const LoadingOverlays: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative h-32 bg-gray-100 rounded-lg p-4">
        <p>Content behind overlay</p>
        <LoadingOverlay loading={true}>
          <div>This content is covered by the loading overlay</div>
        </LoadingOverlay>
      </div>
    </div>
  ),
} 