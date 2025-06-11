import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card/Card'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  describe('Button', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Button>Test Button</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper ARIA attributes when loading', async () => {
      const { container } = render(<Button loading>Loading Button</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper ARIA attributes when disabled', async () => {
      const { container } = render(<Button disabled>Disabled Button</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Input', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <div>
          <label htmlFor="test-input">Test Label</label>
          <Input id="test-input" placeholder="Enter text" />
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper error state accessibility', async () => {
      const { container } = render(
        <div>
          <label htmlFor="error-input">Error Input</label>
          <Input 
            id="error-input" 
            aria-invalid="true"
            aria-describedby="error-message"
          />
          <div id="error-message" role="alert">
            This field is required
          </div>
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Card', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Card>
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
          </Card.Header>
          <Card.Content>
            <p>Card content goes here</p>
          </Card.Content>
        </Card>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
}) 