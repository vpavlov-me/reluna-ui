import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Notification } from '../src/components/ui/notification/Notification'
import { Button } from '../src/components/ui/button/Button'

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    closable: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Notification Title',
    description: 'This is a default notification message.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your action was completed successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review your input before proceeding.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'Here is some helpful information for you.',
  },
}

export const WithoutDescription: Story = {
  args: {
    title: 'Simple notification',
  },
}

export const AutoDismiss: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Array<{ id: number; variant: string; title: string; description: string }>>([])
    
    const addNotification = (variant: string) => {
      const id = Date.now()
      setNotifications(prev => [...prev, {
        id,
        variant,
        title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
        description: `This notification will auto-dismiss in 5 seconds.`
      }])
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }, 5000)
    }
    
    return (
      <div className="space-x-2">
        <Button variant="white" onClick={() => addNotification('success')}>Success</Button>
        <Button variant="yellow" onClick={() => addNotification('warning')}>Warning</Button>
        <Button variant="red" onClick={() => addNotification('error')}>Error</Button>
        <Button variant="green" onClick={() => addNotification('info')}>Info</Button>
        
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              variant={notification.variant as any}
              title={notification.title}
              description={notification.description}
              duration={5000}
              onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            />
          ))}
        </div>
      </div>
    )
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="default"
        title="Default"
        description="Default notification style"
      />
      <Notification
        variant="success"
        title="Success"
        description="Success notification style"
      />
      <Notification
        variant="warning"
        title="Warning"
        description="Warning notification style"
      />
      <Notification
        variant="error"
        title="Error"
        description="Error notification style"
      />
      <Notification
        variant="info"
        title="Info"
        description="Info notification style"
      />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false)
    
    return (
      <>
        <Button variant="white" onClick={() => setIsVisible(true)}>Show Notification</Button>
        {isVisible && (
          <div className="fixed top-4 right-4 z-50">
            <Notification
              variant="success"
              title="Interactive Notification"
              description="This notification can be dismissed by clicking the close button."
              onClose={() => setIsVisible(false)}
            />
          </div>
        )}
      </>
    )
  },
} 