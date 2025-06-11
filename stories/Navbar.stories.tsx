import type { Meta, StoryObj } from '@storybook/react'
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarNav, 
  NavbarNavItem, 
  NavbarActions
} from '../src/components/ui/navbar/Navbar'
import { Button } from '../src/components/ui/button/Button'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'ghost', 'primary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: 'select',
      options: ['static', 'fixed', 'sticky'],
    },
  },
};

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: {},
  render: () => (
    <Navbar>
      <NavbarBrand>Reluna UI</NavbarBrand>
      <NavbarContent>
        <NavbarNav>
          <NavbarNavItem href="#home" active>Home</NavbarNavItem>
          <NavbarNavItem href="#about">About</NavbarNavItem>
          <NavbarNavItem href="#services">Services</NavbarNavItem>
          <NavbarNavItem href="#contact">Contact</NavbarNavItem>
        </NavbarNav>
      </NavbarContent>
      <NavbarActions>
        <Button variant="white">Sign In</Button>
        <Button variant="yellow">Sign Up</Button>
      </NavbarActions>
    </Navbar>
  ),
}

export const WithActions: Story = {
  args: {},
  render: () => (
    <Navbar>
      <NavbarBrand>Reluna UI</NavbarBrand>
      <NavbarContent>
        <NavbarNav>
          <NavbarNavItem href="#home" active>Home</NavbarNavItem>
          <NavbarNavItem href="#about">About</NavbarNavItem>
          <NavbarNavItem href="#services">Services</NavbarNavItem>
          <NavbarNavItem href="#contact">Contact</NavbarNavItem>
        </NavbarNav>
      </NavbarContent>
      <NavbarActions>
        <div className="flex items-center gap-2">
          <Button variant="white">Sign In</Button>
          <Button variant="yellow">Sign Up</Button>
        </div>
      </NavbarActions>
    </Navbar>
  ),
}

export const Variants: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 font-semibold">Default</h3>
        <Navbar variant="default">
          <NavbarBrand>Reluna UI</NavbarBrand>
          <NavbarContent>
            <NavbarNav>
              <NavbarNavItem href="#home" active>Home</NavbarNavItem>
              <NavbarNavItem href="#about">About</NavbarNavItem>
              <NavbarNavItem href="#services">Services</NavbarNavItem>
            </NavbarNav>
          </NavbarContent>
        </Navbar>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Dark</h3>
        <Navbar variant="dark">
          <NavbarBrand>Reluna UI</NavbarBrand>
          <NavbarContent>
            <NavbarNav>
              <NavbarNavItem href="#home" active>Home</NavbarNavItem>
              <NavbarNavItem href="#about">About</NavbarNavItem>
              <NavbarNavItem href="#services">Services</NavbarNavItem>
            </NavbarNav>
          </NavbarContent>
        </Navbar>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Ghost</h3>
        <Navbar variant="ghost">
          <NavbarBrand>Reluna UI</NavbarBrand>
          <NavbarContent>
            <NavbarNav>
              <NavbarNavItem href="#home" active>Home</NavbarNavItem>
              <NavbarNavItem href="#about">About</NavbarNavItem>
              <NavbarNavItem href="#services">Services</NavbarNavItem>
            </NavbarNav>
          </NavbarContent>
        </Navbar>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Primary</h3>
        <Navbar variant="primary">
          <NavbarBrand>Reluna UI</NavbarBrand>
          <NavbarContent>
            <NavbarNav>
              <NavbarNavItem href="#home" active>Home</NavbarNavItem>
              <NavbarNavItem href="#about">About</NavbarNavItem>
              <NavbarNavItem href="#services">Services</NavbarNavItem>
            </NavbarNav>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  ),
}

export const WithLogo: Story = {
  args: {},
  render: () => (
    <Navbar>
      <NavbarBrand>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded"></div>
          <span className="font-bold">Reluna UI</span>
        </div>
      </NavbarBrand>
      <NavbarContent>
        <NavbarNav>
          <NavbarNavItem href="#home" active>Home</NavbarNavItem>
          <NavbarNavItem href="#about">About</NavbarNavItem>
          <NavbarNavItem href="#services">Services</NavbarNavItem>
          <NavbarNavItem href="#contact">Contact</NavbarNavItem>
        </NavbarNav>
      </NavbarContent>
      <NavbarActions>
        <div className="flex items-center gap-2">
          <Button variant="white">Sign In</Button>
          <Button variant="yellow">Get Started</Button>
        </div>
      </NavbarActions>
    </Navbar>
  ),
}

export const EcommerceSite: Story = {
  args: {},
  render: () => (
    <Navbar>
      <NavbarBrand>ShopNow</NavbarBrand>
      <NavbarContent>
        <NavbarNav>
          <NavbarNavItem href="#products">Products</NavbarNavItem>
          <NavbarNavItem href="#categories">Categories</NavbarNavItem>
          <NavbarNavItem href="#deals">Deals</NavbarNavItem>
          <NavbarNavItem href="#support">Support</NavbarNavItem>
        </NavbarNav>
      </NavbarContent>
      <NavbarActions>
        <div className="flex items-center gap-2">
          <Button variant="white" size="small">🔍</Button>
          <Button variant="white" size="small">❤️</Button>
          <Button variant="white" size="small">🛒</Button>
          <Button variant="yellow" size="small">Account</Button>
        </div>
      </NavbarActions>
    </Navbar>
  ),
}

export const DashboardNavbar: Story = {
  args: {},
  render: () => (
    <Navbar variant="default">
      <NavbarBrand>Admin Dashboard</NavbarBrand>
      <NavbarContent>
        <NavbarNav>
          <NavbarNavItem href="#overview" active>Overview</NavbarNavItem>
          <NavbarNavItem href="#analytics">Analytics</NavbarNavItem>
          <NavbarNavItem href="#reports">Reports</NavbarNavItem>
        </NavbarNav>
      </NavbarContent>
      <NavbarActions>
        <div className="flex items-center gap-3">
          <Button variant="white" size="small">🔔</Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm">John Doe</span>
          </div>
        </div>
      </NavbarActions>
    </Navbar>
  ),
} 