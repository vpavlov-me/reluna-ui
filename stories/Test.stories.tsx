import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Test/Simple Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Test Button',
    variant: 'white',
    buttonType: 'primary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="white" buttonType="primary">White Primary</Button>
      <Button variant="yellow" buttonType="primary">Yellow</Button>
      <Button variant="red" buttonType="primary">Red</Button>
      <Button variant="green" buttonType="primary">Green</Button>
    </div>
  ),
}; 