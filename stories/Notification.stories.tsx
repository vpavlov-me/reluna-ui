import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Notification } from '../src/components/ui/notification/Notification'
import { Button } from '../src/components/ui/button/Button'

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A notification component for displaying messages to users.',
      },
    },
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

// Component wrappers to avoid hooks in render functions
const DefaultNotificationExample = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'success' | 'warning' | 'error';
  }>>([])

  const addNotification = (notification: Omit<typeof notifications[0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button onClick={() => addNotification({ title: 'Default notification', description: 'This is a default notification message.' })}>
          Default
        </Button>
        <Button variant="green" onClick={() => addNotification({ title: 'Success!', description: 'Your action was completed successfully.', variant: 'success' })}>
          Success
        </Button>
        <Button variant="yellow" onClick={() => addNotification({ title: 'Warning', description: 'Please check your input.', variant: 'warning' })}>
          Warning
        </Button>
        <Button variant="red" onClick={() => addNotification({ title: 'Error', description: 'Something went wrong.', variant: 'error' })}>
          Error
        </Button>
      </div>
      
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            title={notification.title}
            description={notification.description || ''}
            variant={notification.variant}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  )
}

const PersistentNotificationExample = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return (
      <Button onClick={() => setIsVisible(true)}>
        Show Persistent Notification
      </Button>
    )
  }

  return (
    <Notification
      title="Persistent Notification"
      description="This notification stays until manually closed."
      variant="default"
      onClose={() => setIsVisible(false)}
    />
  )
}

const AutoDismissExample = () => {
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
            variant={notification.variant as 'default' | 'success' | 'warning' | 'error'}
            title={notification.title}
            description={notification.description}
            duration={5000}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </div>
  )
}

const InteractiveExample = () => {
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
}

export const Default: Story = {
  render: () => <DefaultNotificationExample />,
}

export const PersistentNotification: Story = {
  render: () => <PersistentNotificationExample />,
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
  render: () => <AutoDismissExample />,
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
  render: () => <InteractiveExample />,
} 