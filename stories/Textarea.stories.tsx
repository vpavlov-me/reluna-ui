import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../src/components/ui/textarea/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    error: 'Description is required',
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Auto-resizing textarea',
    placeholder: 'Start typing and watch it grow...',
    autoResize: true,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Enter your comment...',
    maxLength: 200,
    showCharacterCount: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled textarea',
    placeholder: 'This is disabled',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea size="sm" placeholder="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea" />
      <Textarea size="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea variant="default" placeholder="Default variant" />
      <Textarea variant="filled" placeholder="Filled variant" />
      <Textarea variant="flushed" placeholder="Flushed variant" />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea resize="none" placeholder="No resize" />
      <Textarea resize="vertical" placeholder="Vertical resize only" />
      <Textarea resize="horizontal" placeholder="Horizontal resize only" />
      <Textarea resize="both" placeholder="Both directions" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your thoughts...',
    helperText: 'Your feedback helps us improve our service.',
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg max-w-md">
      <h3 className="text-lg font-semibold">Contact Form</h3>
      <div className="space-y-4">
        <Textarea
          label="Subject"
          placeholder="Brief subject line..."
          size="sm"
          rows={2}
        />
        <Textarea
          label="Message"
          placeholder="Your detailed message..."
          autoResize
          maxLength={500}
          showCharacterCount
          required
        />
        <Textarea
          label="Additional Notes"
          placeholder="Any additional information..."
          variant="filled"
          helperText="Optional: Add any extra details that might be helpful."
        />
      </div>
    </div>
  ),
}; 