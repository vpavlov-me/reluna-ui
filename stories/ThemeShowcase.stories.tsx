import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button/Button';
import { Card } from '../src/components/ui/card/Card';
import { Input } from '../src/components/ui/input/Input';
import { Badge } from '../src/components/ui/badge/Badge';
import { Switch } from '../src/components/ui/switch/Switch';
import { Select } from '../src/components/ui/select/Select';

const meta: Meta = {
  title: 'Design Tokens/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Demonstration of all available themes with various components.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ThemeDemo = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">🎨 Theme Showcase</h1>
        <p className="text-lg opacity-80">
          Switch themes in the Storybook toolbar to view all variants
        </p>
      </div>

      {/* Color Palette */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 bg-primary rounded-lg"></div>
            <p className="text-sm font-medium">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-green-500 rounded-lg"></div>
            <p className="text-sm font-medium">Success</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-yellow-500 rounded-lg"></div>
            <p className="text-sm font-medium">Warning</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-red-500 rounded-lg"></div>
            <p className="text-sm font-medium">Error</p>
          </div>
        </div>
      </Card>

      {/* Buttons */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="white" buttonType="primary">Primary Button</Button>
          <Button variant="white" buttonType="secondary">Secondary</Button>
          <Button variant="yellow" buttonType="primary">Yellow</Button>
          <Button variant="red" buttonType="primary">Red</Button>
          <Button variant="green" buttonType="primary">Green</Button>
        </div>
      </Card>

      {/* Form Elements */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter email"
              type="email"
            />
            <Input
              label="Password"
              placeholder="Enter password"
              type="password"
            />
            <Select
              label="Select option"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}
              placeholder="Choose..."
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Dark Theme</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Auto-save</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      {/* Badges */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Card>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Statistics</h3>
          <p className="text-3xl font-bold text-primary">1,234</p>
          <p className="text-sm opacity-70">Active users</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$45,678</p>
          <p className="text-sm opacity-70">This month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-orange-600">567</p>
          <p className="text-sm opacity-70">New orders</p>
        </Card>
      </div>

      {/* Typography */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Heading H1</h1>
          <h2 className="text-3xl font-semibold">Heading H2</h2>
          <h3 className="text-2xl font-medium">Heading H3</h3>
          <h4 className="text-xl">Heading H4</h4>
          <p className="text-base">
            Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-sm opacity-70">
            Small text for additional information and captions.
          </p>
        </div>
      </Card>

      {/* Theme Instructions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          🎨 How to Switch Themes
        </h2>
        <div className="space-y-2 text-blue-800">
          <p>1. Find the brush icon (🎨) in the Storybook toolbar</p>
          <p>2. Select one of the available themes:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>☀️ Light Theme - classic light theme</li>
            <li>🌙 Dark Theme - dark theme</li>
            <li>💜 Purple Theme - purple theme</li>
            <li>💚 Green Theme - green theme</li>
            <li>🧡 Orange Theme - orange theme</li>
          </ul>
          <p>3. Watch how all components change!</p>
        </div>
      </Card>
    </div>
  );
};

export const AllThemes: Story = {
  render: () => <ThemeDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete demonstration of all components in the current theme. Use the theme switcher in the toolbar to view different variants.',
      },
    },
  },
};

export const LightTheme: Story = {
  render: () => <ThemeDemo />,
  parameters: {
    globals: {
      theme: 'light',
    },
    docs: {
      description: {
        story: 'Demonstration of components in light theme.',
      },
    },
  },
};

export const DarkTheme: Story = {
  render: () => <ThemeDemo />,
  parameters: {
    globals: {
      theme: 'dark',
    },
    docs: {
      description: {
        story: 'Demonstration of components in dark theme.',
      },
    },
  },
};

export const PurpleTheme: Story = {
  render: () => <ThemeDemo />,
  parameters: {
    globals: {
      theme: 'purple',
    },
    docs: {
      description: {
        story: 'Demonstration of components in purple theme.',
      },
    },
  },
};

export const GreenTheme: Story = {
  render: () => <ThemeDemo />,
  parameters: {
    globals: {
      theme: 'green',
    },
    docs: {
      description: {
        story: 'Demonstration of components in green theme.',
      },
    },
  },
};

export const OrangeTheme: Story = {
  render: () => <ThemeDemo />,
  parameters: {
    globals: {
      theme: 'orange',
    },
    docs: {
      description: {
        story: 'Demonstration of components in orange theme.',
      },
    },
  },
}; 