import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalClose } from '../src/components/ui/modal/Modal';
import { Button } from '../src/components/ui/button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component with various sizes and configurations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Component wrappers to avoid hooks in render functions
const DefaultModalExample = () => {
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
};

const WithCloseButtonExample = () => {
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
};

const SizesExample = () => {
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
          size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
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
};

const FormModalExample = () => {
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
            <Button variant="white" buttonType="secondary" onClick={() => setIsOpen(false)}>
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
};

const ConfirmationModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button variant="red" onClick={() => setIsOpen(true)}>
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
          <Button variant="white" buttonType="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="red" onClick={() => setIsOpen(false)}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

const LongContentModalExample = () => {
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultModalExample />,
};

export const WithCloseButton: Story = {
  render: () => <WithCloseButtonExample />,
};

export const Sizes: Story = {
  render: () => <SizesExample />,
};

export const FormModal: Story = {
  render: () => <FormModalExample />,
};

export const ConfirmationModal: Story = {
  render: () => <ConfirmationModalExample />,
};

export const LongContentModal: Story = {
  render: () => <LongContentModalExample />,
}; 