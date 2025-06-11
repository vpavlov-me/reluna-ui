import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button/Button';
import { Input } from '../src/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';

const meta: Meta = {
  title: 'Design System/Accessibility Demo',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Demonstration of accessibility features and improvements in Reluna UI components.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ContrastComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contrast Comparison</h2>
        <p className="text-muted-foreground mb-6">
          Comparison of contrast levels before and after accessibility improvements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Before Improvements</CardTitle>
            <CardDescription>Low contrast, poor visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-neutral-300 rounded-md bg-neutral-50">
              <p className="text-neutral-400 text-sm">
                Low contrast text that's hard to read
              </p>
            </div>
            <Button variant="white" className="border-neutral-300 text-neutral-400">
              Low Contrast Button
            </Button>
            <Input placeholder="Hard to see placeholder" className="border-neutral-300 placeholder:text-neutral-300" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>After Improvements</CardTitle>
            <CardDescription>High contrast, excellent visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-2 border-neutral-200 rounded-md bg-background">
              <p className="text-foreground text-sm">
                High contrast text that's easy to read
              </p>
            </div>
            <Button variant="white">
              High Contrast Button
            </Button>
            <Input placeholder="Clear and visible placeholder" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Keyboard Navigation</h2>
        <p className="text-muted-foreground mb-6">
          All interactive elements are accessible via keyboard. Try using Tab, Enter, and Space keys.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Form</CardTitle>
          <CardDescription>Navigate through this form using only your keyboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="flex gap-2">
            <Button variant="white">Submit Form</Button>
            <Button variant="yellow">Cancel</Button>
            <Button variant="red">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const FocusIndicators: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Focus Indicators</h2>
        <p className="text-muted-foreground mb-6">
          Clear and visible focus indicators for keyboard navigation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Standard Focus</CardTitle>
            <CardDescription>Regular focus indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="white">Button 1</Button>
            <Button variant="yellow">Button 2</Button>
            <Input placeholder="Input field" />
          </CardContent>
        </Card>

        <Card className="reluna-focus-enhanced">
          <CardHeader>
            <CardTitle>Enhanced Focus</CardTitle>
            <CardDescription>Improved indicators for better visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="white" className="reluna-focus-enhanced">Button 1</Button>
            <Button variant="yellow" className="reluna-focus-enhanced">Button 2</Button>
            <Input placeholder="Input field" className="reluna-focus-enhanced" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const ScreenReaderSupport: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Screen Reader Support</h2>
        <p className="text-muted-foreground mb-6">
          Components with proper ARIA attributes and semantic markup
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form with ARIA Attributes</CardTitle>
          <CardDescription>Example of accessible form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username <span className="text-destructive" aria-label="required field">*</span>
            </label>
            <Input 
              id="username"
              aria-required="true"
              aria-describedby="username-help"
              placeholder="Enter username"
            />
            <p id="username-help" className="text-sm text-muted-foreground">
              Minimum 3 characters, letters and numbers only
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password <span className="text-destructive" aria-label="required field">*</span>
            </label>
            <Input 
              id="password"
              type="password"
              aria-required="true"
              aria-describedby="password-help password-error"
              placeholder="Enter password"
            />
            <p id="password-help" className="text-sm text-muted-foreground">
              Minimum 8 characters, including numbers and special characters
            </p>
            <p id="password-error" className="text-sm text-destructive" role="alert" aria-live="polite">
              {/* Error message will appear here */}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="remember" 
              className="rounded border-input"
              aria-describedby="remember-help"
            />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
            <span className="sr-only" id="remember-help">
              Save login data on this device
            </span>
          </div>

          <Button variant="white" type="submit" aria-describedby="submit-help">
            Sign In
          </Button>
          <p id="submit-help" className="sr-only">
            Click to submit the login form
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export const ColorBlindnessSupport: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Color Blindness Support</h2>
        <p className="text-muted-foreground mb-6">
          Information is conveyed not only through color, but also through icons and text
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status with Icons</CardTitle>
            <CardDescription>Additional visual indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="success">
                <span className="mr-1">✓</span>
                Success
              </Badge>
              <span className="text-sm">Operation completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="warning">
                <span className="mr-1">⚠</span>
                Warning
              </Badge>
              <span className="text-sm">Requires attention</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">
                <span className="mr-1">✕</span>
                Error
              </Badge>
              <span className="text-sm">An error occurred</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="info">
                <span className="mr-1">ℹ</span>
                Info
              </Badge>
              <span className="text-sm">Additional information</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress with Text</CardTitle>
            <CardDescription>Numerical progress indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>File Upload</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: '75%' }}
                  role="progressbar"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="File upload progress"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Processing</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-300" 
                  style={{ width: '45%' }}
                  role="progressbar"
                  aria-valuenow={45}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Data processing progress"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 