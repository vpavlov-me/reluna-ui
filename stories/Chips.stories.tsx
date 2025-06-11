import type { Meta, StoryObj } from '@storybook/react'
import { Chips } from '../src/components/ui/chips/Chips'

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'select',
      options: ['yes', 'no'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    showColorIndicator: {
      control: 'boolean',
    },
    removable: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Default Chip',
    active: 'no',
    variant: 'default',
    size: 'medium',
    showColorIndicator: false,
    removable: false,
  },
}

export const Active: Story = {
  args: {
    text: 'Active Chip',
    active: 'yes',
    variant: 'default',
    size: 'medium',
    showColorIndicator: false,
    removable: false,
  },
}

export const WithColorIndicator: Story = {
  args: {
    text: 'With Indicator',
    active: 'no',
    variant: 'default',
    size: 'medium',
    showColorIndicator: true,
    removable: false,
  },
}

export const Removable: Story = {
  args: {
    text: 'Removable',
    active: 'no',
    variant: 'default',
    size: 'medium',
    showColorIndicator: false,
    removable: true,
  },
}

export const ActiveStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Chips text="Inactive" active="no" />
      <Chips text="Active" active="yes" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Chips text="Default" variant="default" />
      <Chips text="Primary" variant="primary" />
      <Chips text="Secondary" variant="secondary" />
      <Chips text="Destructive" variant="destructive" />
      <Chips text="Outline" variant="outline" />
      <Chips text="Ghost" variant="ghost" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Chips text="Small" size="small" />
      <Chips text="Medium" size="medium" />
      <Chips text="Large" size="large" />
    </div>
  ),
}

export const WithFeatures: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <Chips text="Basic" />
        <Chips text="With Indicator" showColorIndicator={true} />
        <Chips text="Removable" removable={true} />
        <Chips text="All Features" showColorIndicator={true} removable={true} />
      </div>
      <div className="flex gap-4 flex-wrap">
        <Chips text="Active Basic" active="yes" />
        <Chips text="Active + Indicator" active="yes" showColorIndicator={true} />
        <Chips text="Active + Removable" active="yes" removable={true} />
        <Chips text="Active + All" active="yes" showColorIndicator={true} removable={true} />
      </div>
    </div>
  ),
}

export const FigmaShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Active States</h3>
        <div className="flex gap-4 flex-wrap">
          <Chips text="Inactive Chip" active="no" />
          <Chips text="Active Chip" active="yes" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Color Indicators</h3>
        <div className="flex gap-4 flex-wrap">
          <Chips text="Inactive" active="no" showColorIndicator={true} />
          <Chips text="Active" active="yes" showColorIndicator={true} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Removable Chips</h3>
        <div className="flex gap-4 flex-wrap">
          <Chips text="Remove Me" removable={true} />
          <Chips text="Active Removable" active="yes" removable={true} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">All Variants</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Inactive</h4>
            <div className="flex gap-2 flex-wrap">
              <Chips text="Default" variant="default" active="no" />
              <Chips text="Primary" variant="primary" active="no" />
              <Chips text="Secondary" variant="secondary" active="no" />
              <Chips text="Destructive" variant="destructive" active="no" />
              <Chips text="Outline" variant="outline" active="no" />
              <Chips text="Ghost" variant="ghost" active="no" />
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Active</h4>
            <div className="flex gap-2 flex-wrap">
              <Chips text="Default" variant="default" active="yes" />
              <Chips text="Primary" variant="primary" active="yes" />
              <Chips text="Secondary" variant="secondary" active="yes" />
              <Chips text="Destructive" variant="destructive" active="yes" />
              <Chips text="Outline" variant="outline" active="yes" />
              <Chips text="Ghost" variant="ghost" active="yes" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-3">
          <div className="flex gap-4 items-center">
            <Chips text="Small" size="small" />
            <Chips text="Small Active" size="small" active="yes" />
            <Chips text="Small + Indicator" size="small" showColorIndicator={true} />
          </div>
          <div className="flex gap-4 items-center">
            <Chips text="Medium" size="medium" />
            <Chips text="Medium Active" size="medium" active="yes" />
            <Chips text="Medium + Indicator" size="medium" showColorIndicator={true} />
          </div>
          <div className="flex gap-4 items-center">
            <Chips text="Large" size="large" />
            <Chips text="Large Active" size="large" active="yes" />
            <Chips text="Large + Indicator" size="large" showColorIndicator={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Feature Combinations</h3>
        <div className="space-y-3">
          <div className="flex gap-3 flex-wrap">
            <Chips text="Basic" />
            <Chips text="With Indicator" showColorIndicator={true} />
            <Chips text="Removable" removable={true} />
            <Chips text="Full Featured" showColorIndicator={true} removable={true} />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Chips text="Active Basic" active="yes" />
            <Chips text="Active + Indicator" active="yes" showColorIndicator={true} />
            <Chips text="Active + Removable" active="yes" removable={true} />
            <Chips text="Active + All" active="yes" showColorIndicator={true} removable={true} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Tags</h4>
            <div className="flex gap-2 flex-wrap">
              <Chips text="React" variant="primary" active="yes" />
              <Chips text="TypeScript" variant="primary" active="yes" />
              <Chips text="JavaScript" variant="secondary" />
              <Chips text="CSS" variant="secondary" />
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Filters</h4>
            <div className="flex gap-2 flex-wrap">
              <Chips text="All" active="yes" />
              <Chips text="Active" showColorIndicator={true} />
              <Chips text="Completed" showColorIndicator={true} />
              <Chips text="Pending" showColorIndicator={true} />
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Selected Items</h4>
            <div className="flex gap-2 flex-wrap">
              <Chips text="Item 1" removable={true} />
              <Chips text="Item 2" removable={true} />
              <Chips text="Item 3" removable={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
} 