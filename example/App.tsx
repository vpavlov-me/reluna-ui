import React, { useState, createContext, useContext } from 'react'
import {
  // Theme
  ThemeProvider,
  
  // Form Components
  Button,
  Input,
  Select,
  SelectOption,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Textarea,
  
  // Feedback Components
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
  Notification,
  Tooltip,
  Badge,
  NotificationBadge,
  StatusBadge,
  Loader,
  LoadingButton,
  
  // Layout Components
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatsCard,
  FeatureCard,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  
  // Navigation Components
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
  SidebarNavGroup,
  SidebarToggle,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarNav,
  NavbarNavItem,
  NavbarMobileToggle,
  NavbarMobileMenu,
  NavbarMobileNavItem,
  NavbarActions,
  
  // Data Components
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  DataTable,
} from '../src'

// Simple notification context for demo
interface NotificationContextType {
  addNotification: (notification: { title: string; description: string; variant: string }) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; description: string; variant: string }>>([])

  const addNotification = (notification: { title: string; description: string; variant: string }) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      
      {/* Render notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            title={notification.title}
            description={notification.description}
            variant={notification.variant as any}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

// Example data
const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'pending' },
]

const tableColumns = [
  { key: 'name', title: 'Name', header: 'Name', sortable: true },
  { key: 'email', title: 'Email', header: 'Email', sortable: true },
  { key: 'role', title: 'Role', header: 'Role', sortable: false },
  { 
    key: 'status', 
    title: 'Status',
    header: 'Status', 
    sortable: false,
    render: (value: string) => <StatusBadge status={value as any}>{value}</StatusBadge>
  },
]

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
  
  const { addNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    addNotification({
      title: 'Success!',
      description: 'Form submitted successfully',
      variant: 'success',
    })
    
    setLoading(false)
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <Navbar variant="default" position="sticky">
        <NavbarBrand>
          <span className="text-primary-600 font-bold text-xl">Reluna UI</span>
        </NavbarBrand>
        
        <NavbarContent justify="center">
          <NavbarNav>
            <NavbarNavItem href="#" active>Dashboard</NavbarNavItem>
            <NavbarNavItem href="#">Components</NavbarNavItem>
            <NavbarNavItem href="#">Documentation</NavbarNavItem>
          </NavbarNav>
        </NavbarContent>
        
        <NavbarActions>
          <NotificationBadge count={3}>
            <Button variant="ghost" size="sm">
              🔔
            </Button>
          </NotificationBadge>
          <Button variant="outline" size="sm">Sign In</Button>
        </NavbarActions>
        
        <NavbarMobileToggle />
        <NavbarMobileMenu>
          <NavbarMobileNavItem href="#" active>Dashboard</NavbarMobileNavItem>
          <NavbarMobileNavItem href="#">Components</NavbarMobileNavItem>
          <NavbarMobileNavItem href="#">Documentation</NavbarMobileNavItem>
        </NavbarMobileMenu>
      </Navbar>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar collapsible defaultCollapsed={false} className="border-r">
          <SidebarHeader>
            <h2 className="font-semibold">Navigation</h2>
            <SidebarToggle />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarNav>
              <SidebarNavGroup title="Main">
                <SidebarNavItem href="#" icon="🏠" active>
                  Dashboard
                </SidebarNavItem>
                <SidebarNavItem href="#" icon="👥">
                  Users
                </SidebarNavItem>
                <SidebarNavItem href="#" icon="⚙️" badge="3">
                  Settings
                </SidebarNavItem>
              </SidebarNavGroup>
              
              <SidebarNavGroup title="Tools">
                <SidebarNavItem href="#" icon="📊">
                  Analytics
                </SidebarNavItem>
                <SidebarNavItem href="#" icon="📝">
                  Reports
                </SidebarNavItem>
              </SidebarNavGroup>
            </SidebarNav>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">
                  Reluna UI Components
                </h1>
                <p className="text-neutral-600 mt-2">
                  A comprehensive design system for family wealth management
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Tooltip content="This opens a modal form">
                  <Button onClick={() => setModalOpen(true)}>
                    Add New Item
                  </Button>
                </Tooltip>
                <LoadingButton 
                  loading={loading}
                  loadingText="Processing..."
                  className="border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                  onClick={() => {
                    setLoading(true)
                    setTimeout(() => setLoading(false), 3000)
                  }}
                >
                  Process Data
                </LoadingButton>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value="2,543"
                description="↗ 12% from last month"
                icon="👥"
                trend={{ value: 12, label: 'from last month', direction: 'up' }}
              />
              <StatsCard
                title="Revenue"
                value="$45,231"
                description="↗ 8% from last month"
                icon="💰"
                trend={{ value: 8, label: 'from last month', direction: 'up' }}
              />
              <StatsCard
                title="Active Sessions"
                value="1,234"
                description="↘ 3% from last month"
                icon="📊"
                trend={{ value: 3, label: 'from last month', direction: 'down' }}
              />
              <StatsCard
                title="Conversion Rate"
                value="3.2%"
                description="→ No change"
                icon="📈"
                trend={{ value: 0, label: 'no change', direction: 'neutral' }}
              />
            </div>

            {/* Tabs Section */}
            <Card>
              <CardHeader>
                <CardTitle>Component Examples</CardTitle>
                <CardDescription>
                  Explore different components and their variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="forms">
                  <TabsList>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="forms" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Form Controls</h3>
                        
                        <Input
                          label="Full Name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                        
                        <Input
                          type="email"
                          label="Email Address"
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
                          maxLength={200}
                          showCharacterCount
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Selection Controls</h3>
                        
                        <Checkbox
                          label="Enable notifications"
                          description="Receive email updates about your account"
                          checked={formData.notifications}
                          onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                        />
                        
                        <RadioGroup
                          name="theme"
                          label="Theme Preference"
                          value={formData.theme}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
                        >
                          <RadioGroupItem value="light" label="Light Theme" />
                          <RadioGroupItem value="dark" label="Dark Theme" />
                          <RadioGroupItem value="auto" label="Auto (System)" />
                        </RadioGroup>
                        
                        <Switch
                          label="Dark Mode"
                          description="Toggle dark mode on/off"
                          checked={formData.theme === 'dark'}
                          onChange={(e) => 
                            setFormData(prev => ({ ...prev, theme: e.target.checked ? 'dark' : 'light' }))
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="feedback" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Badges & Status</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge>Default</Badge>
                          <Badge variant="secondary">Secondary</Badge>
                          <Badge variant="success">Success</Badge>
                          <Badge variant="warning">Warning</Badge>
                          <Badge variant="destructive">Error</Badge>
                          <Badge variant="outline">Outline</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <StatusBadge status="active">Active</StatusBadge>
                          <StatusBadge status="inactive">Inactive</StatusBadge>
                          <StatusBadge status="pending">Pending</StatusBadge>
                          <StatusBadge status="error">Error</StatusBadge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Loading States</h3>
                        <div className="flex flex-wrap gap-4">
                          <Loader variant="spinner" size="sm" />
                          <Loader variant="dots" size="md" />
                          <Loader variant="pulse" size="lg" />
                          <Loader variant="bars" size="md" />
                        </div>
                        
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            onClick={() => addNotification({
                              title: 'Info',
                              description: 'This is an info notification',
                              variant: 'info',
                            })}
                          >
                            Show Info Notification
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => addNotification({
                              title: 'Success',
                              description: 'Operation completed successfully',
                              variant: 'success',
                            })}
                          >
                            Show Success Notification
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="data" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Data Table</h3>
                      <DataTable
                        data={tableData}
                        columns={tableColumns}
                        searchable
                        sortable
                        pagination={{ pageSize: 10 }}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="layout" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Accordion</h3>
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>What is Reluna UI?</AccordionTrigger>
                            <AccordionContent>
                              Reluna UI is a comprehensive design system built for family wealth management applications.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger>How do I get started?</AccordionTrigger>
                            <AccordionContent>
                              Install the package and import the components you need. Check our documentation for examples.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                              Yes! All components are built with accessibility in mind and follow WCAG guidelines.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Feature Cards</h3>
                        <div className="space-y-4">
                          <FeatureCard
                            title="Easy Integration"
                            description="Drop-in components that work out of the box"
                            icon="🔧"
                            action={{
                              label: "Learn More",
                              onClick: () => addNotification({
                                title: 'Feature',
                                description: 'Learn more about easy integration',
                                variant: 'info',
                              })
                            }}
                          />
                          <FeatureCard
                            title="Fully Customizable"
                            description="Customize every aspect to match your brand"
                            icon="🎨"
                            action={{
                              label: "Customize",
                              onClick: () => addNotification({
                                title: 'Customization',
                                description: 'Start customizing your components',
                                variant: 'info',
                              })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add New Item</ModalTitle>
            <ModalDescription>
              Fill out the form below to add a new item to your collection.
            </ModalDescription>
          </ModalHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Item Name"
              placeholder="Enter item name"
              required
            />
            <Textarea
              label="Description"
              placeholder="Enter item description"
              rows={3}
            />
            <Select label="Category" placeholder="Select category">
              <SelectOption value="documents">Documents</SelectOption>
              <SelectOption value="assets">Assets</SelectOption>
              <SelectOption value="contacts">Contacts</SelectOption>
            </Select>
            
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button type="submit" loading={loading}>
                {loading ? 'Adding...' : 'Add Item'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <NotificationProvider>
        <ExampleContent />
      </NotificationProvider>
    </ThemeProvider>
  )
} 