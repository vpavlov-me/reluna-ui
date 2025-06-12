import React, { useState } from 'react'
import {
  // Theme
  ThemeProvider,
  
  // Form Components
  Button,
  Input,
  Select,
  SelectOption,
  Checkbox,
  Switch,
  Textarea,
  
  // Feedback Components
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalClose,
  Badge,
  
  // Layout Components
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  
  // Navigation Components
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../src'

function ExampleContent() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    notifications: false,
    theme: 'light',
    bio: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reluna UI Components</h1>
          <p className="text-gray-600">A comprehensive design system for modern applications</p>
        </div>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles and states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="white">Primary</Button>
              <Button variant="white" buttonType="secondary">Secondary</Button>
              <Button variant="green">Success</Button>
              <Button variant="yellow">Warning</Button>
              <Button variant="red">Danger</Button>
              <Button loading={loading} onClick={() => setLoading(!loading)}>
                {loading ? 'Loading...' : 'Toggle Loading'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>Input fields and form controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
              
              <Select
                label="Role"
                placeholder="Select a role"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                <SelectOption value="admin">Administrator</SelectOption>
                <SelectOption value="editor">Editor</SelectOption>
                <SelectOption value="viewer">Viewer</SelectOption>
              </Select>
              
              <Textarea
                label="Bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              />
              
              <div className="flex items-center space-x-4">
                <Checkbox
                  label="Enable notifications"
                  checked={formData.notifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                />
                
                <Switch
                  label="Dark mode"
                  checked={formData.theme === 'dark'}
                  onChange={(checked) => setFormData(prev => ({ ...prev, theme: checked ? 'dark' : 'light' }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Example */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Tabbed navigation component</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p>Content for tab 1</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p>Content for tab 2</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p>Content for tab 3</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Accordion Example */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>Collapsible content sections</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Reluna UI?</AccordionTrigger>
                <AccordionContent>
                  Reluna UI is a comprehensive design system built for modern web applications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I get started?</AccordionTrigger>
                <AccordionContent>
                  Install the package and import the components you need.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Modal Example */}
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
            <CardDescription>Modal dialog component</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            
            <Modal open={modalOpen} onOpenChange={setModalOpen}>
              <ModalHeader>
                <ModalTitle>Example Modal</ModalTitle>
                <ModalDescription>
                  This is an example modal dialog.
                </ModalDescription>
                <ModalClose />
              </ModalHeader>
              <ModalContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    required
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="white" buttonType="secondary" type="button" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" loading={loading}>
                      Submit
                    </Button>
                  </div>
                </form>
              </ModalContent>
            </Modal>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ExampleContent />
    </ThemeProvider>
  )
} 