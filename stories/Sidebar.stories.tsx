import type { Meta, StoryObj } from '@storybook/react'
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarNav,
  SidebarNavItem
} from '../src/components/ui/sidebar/Sidebar'
import { Button } from '../src/components/ui/button/Button'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    position: {
      control: 'select',
      options: ['fixed', 'sticky', 'relative'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const navigationItems = [
  {
    label: 'Dashboard',
    href: '#dashboard',
    icon: '📊',
    active: true,
  },
  {
    label: 'Users',
    href: '#users',
    icon: '👥',
    badge: '12',
  },
  {
    label: 'Products',
    href: '#products',
    icon: '📦',
  },
  {
    label: 'Orders',
    href: '#orders',
    icon: '🛒',
    badge: '5',
  },
  {
    label: 'Analytics',
    href: '#analytics',
    icon: '📈',
  },
  {
    label: 'Settings',
    href: '#settings',
    icon: '⚙️',
  },
];

const groupedNavigation = [
  {
    group: 'Main',
    items: [
      { label: 'Dashboard', href: '#dashboard', icon: '📊', active: true },
      { label: 'Analytics', href: '#analytics', icon: '📈' },
    ],
  },
  {
    group: 'Management',
    items: [
      { label: 'Users', href: '#users', icon: '👥', badge: '12' },
      { label: 'Products', href: '#products', icon: '📦' },
      { label: 'Orders', href: '#orders', icon: '🛒', badge: '5' },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Settings', href: '#settings', icon: '⚙️' },
      { label: 'Help', href: '#help', icon: '❓' },
    ],
  },
];

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav>
            <SidebarNavItem href="#dashboard" icon="📊" active>
              Dashboard
            </SidebarNavItem>
            <SidebarNavItem href="#users" icon="👥" badge="12">
              Users
            </SidebarNavItem>
            <SidebarNavItem href="#products" icon="📦">
              Products
            </SidebarNavItem>
            <SidebarNavItem href="#orders" icon="🛒" badge="5">
              Orders
            </SidebarNavItem>
            <SidebarNavItem href="#analytics" icon="📈">
              Analytics
            </SidebarNavItem>
            <SidebarNavItem href="#settings" icon="⚙️">
              Settings
            </SidebarNavItem>
          </SidebarNav>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="white" className="w-full">
            Sign Out
          </Button>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  ),
}

export const Collapsible: Story = {
  args: {
    navigation: navigationItems,
    collapsible: true,
    defaultCollapsed: false,
  },
};

export const CollapsedByDefault: Story = {
  args: {
    navigation: navigationItems,
    collapsible: true,
    defaultCollapsed: true,
  },
};

export const WithGroups: Story = {
  args: {
    navigation: groupedNavigation,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 h-96">
      <div>
        <h3 className="mb-2 font-semibold">Default</h3>
        <Sidebar navigation={navigationItems} variant="default" />
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Floating</h3>
        <Sidebar navigation={navigationItems} variant="floating" />
      </div>
    </div>
  ),
};

export const AdminDashboard: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar
        navigation={groupedNavigation}
        collapsible
        header={
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Admin Panel</h2>
          </div>
        }
        footer={
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </div>
        }
      />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  ),
}; 