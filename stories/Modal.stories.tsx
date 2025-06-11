import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalClose } from '../src/components/ui/modal/Modal';
import { Button } from '../src/components/ui/button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen}>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>
              This is a basic modal with a title and description.
            </ModalDescription>
          </ModalHeader>
          <div className="p-6">
            <p>Modal content goes here.</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Close</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen}>
          <ModalHeader>
            <ModalTitle>Modal with Close Button</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <div className="p-6">
            <p>This modal has a close button in the header.</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    return (
      <div className="space-x-2">
        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
          <Button key={size} onClick={() => setOpenModal(size)}>
            {size.toUpperCase()}
          </Button>
        ))}
        
        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
          <Modal
            key={size}
            open={openModal === size}
            onOpenChange={() => setOpenModal(null)}
            size={size as any}
          >
            <ModalHeader>
              <ModalTitle>{size.toUpperCase()} Modal</ModalTitle>
              <ModalDescription>
                This is a {size} sized modal.
              </ModalDescription>
              <ModalClose />
            </ModalHeader>
            <div className="p-6">
              <p>Content for {size} modal size.</p>
            </div>
          </Modal>
        ))}
      </div>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen} size="md">
          <ModalHeader>
            <ModalTitle>Create Account</ModalTitle>
            <ModalDescription>
              Fill out the form below to create your account.
            </ModalDescription>
            <ModalClose />
          </ModalHeader>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Create Account
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const ConfirmationModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal open={isOpen} onOpenChange={setIsOpen} size="sm">
          <ModalHeader>
            <ModalTitle>Confirm Deletion</ModalTitle>
            <ModalDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <div className="p-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const LongContentModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Content Modal</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen} size="lg">
          <ModalHeader>
            <ModalTitle>Terms of Service</ModalTitle>
            <ModalDescription>
              Please read our terms of service carefully.
            </ModalDescription>
            <ModalClose />
          </ModalHeader>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
                et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>
          </div>
          <div className="p-6 border-t flex justify-end">
            <Button onClick={() => setIsOpen(false)}>
              I Agree
            </Button>
          </div>
        </Modal>
      </>
    );
  },
}; 