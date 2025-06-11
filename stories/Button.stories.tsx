import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../src/components/ui/button/Button'
import { ChevronRight, ChevronLeft, Download } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['white', 'yellow', 'red', 'green'],
    },
    buttonType: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'icon'],
    },
    buttonState: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'disabled'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Основные варианты
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'white',
    buttonType: 'primary',
    size: 'medium',
    buttonState: 'default',
  },
}

// Все цвета Primary
export const AllColorsPrimary: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="white" buttonType="primary">White Primary</Button>
      <Button variant="yellow" buttonType="primary">Yellow Primary</Button>
      <Button variant="red" buttonType="primary">Red Primary</Button>
      <Button variant="green" buttonType="primary">Green Primary</Button>
    </div>
  ),
}

// Все цвета Secondary
export const AllColorsSecondary: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="white" buttonType="secondary">White Secondary</Button>
      <Button variant="yellow" buttonType="secondary">Yellow Secondary</Button>
      <Button variant="red" buttonType="secondary">Red Secondary</Button>
      <Button variant="green" buttonType="secondary">Green Secondary</Button>
    </div>
  ),
}

// Размеры
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Button variant="white" size="small">Small</Button>
      <Button variant="white" size="medium">Medium</Button>
      <Button variant="white" size="large">Large</Button>
      <Button variant="white" size="icon">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  ),
}

// С иконками
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="white" leftIcon={<ChevronLeft className="h-4 w-4" />}>
        Left Icon
      </Button>
      <Button variant="white" rightIcon={<ChevronRight className="h-4 w-4" />}>
        Right Icon
      </Button>
      <Button variant="white" size="icon">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  ),
}

// Состояния
export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="white" buttonState="default">Default</Button>
      <Button variant="white" buttonState="hover">Hover</Button>
      <Button variant="white" buttonState="pressed">Pressed</Button>
      <Button variant="white" buttonState="disabled">Disabled</Button>
    </div>
  ),
}

// Loading состояние
export const Loading: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="white" loading>Loading</Button>
      <Button variant="yellow" loading>Loading Yellow</Button>
      <Button variant="red" loading>Loading Red</Button>
      <Button variant="green" loading>Loading Green</Button>
    </div>
  ),
}

// Figma Showcase - все варианты как в Figma
export const FigmaShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary Buttons</h3>
        <div className="grid grid-cols-4 gap-4">
          {(['white', 'yellow', 'red', 'green'] as const).map((color) => (
            <div key={color} className="space-y-2">
              <Button variant={color} buttonType="primary" buttonState="default">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
              <Button variant={color} buttonType="primary" buttonState="hover">
                Hover
              </Button>
              <Button variant={color} buttonType="primary" buttonState="pressed">
                Pressed
              </Button>
              <Button variant={color} buttonType="primary" buttonState="disabled">
                Disabled
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary Buttons</h3>
        <div className="grid grid-cols-4 gap-4">
          {(['white', 'yellow', 'red', 'green'] as const).map((color) => (
            <div key={color} className="space-y-2">
              <Button variant={color} buttonType="secondary" buttonState="default">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
              <Button variant={color} buttonType="secondary" buttonState="hover">
                Hover
              </Button>
              <Button variant={color} buttonType="secondary" buttonState="pressed">
                Pressed
              </Button>
              <Button variant={color} buttonType="secondary" buttonState="disabled">
                Disabled
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Icons</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="white" leftIcon={<ChevronLeft className="h-4 w-4" />}>
            Left Icon
          </Button>
          <Button variant="white" rightIcon={<ChevronRight className="h-4 w-4" />}>
            Right Icon
          </Button>
          <Button variant="white" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  ),
} 