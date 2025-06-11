import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../input'
import { describe, it, expect, vi } from 'vitest'

describe('Input', () => {
  it('renders correctly with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays label when provided', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('displays error message when error prop is provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('displays helper text when provided', () => {
    render(<Input helperText="Enter your email address" />)
    expect(screen.getByText('Enter your email address')).toBeInTheDocument()
  })

  it('applies error styling when error is present', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-destructive')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('has proper accessibility attributes', () => {
    render(<Input label="Email" error="Invalid email" helperText="Enter valid email" />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby')
  })

  it('supports password input type', () => {
    render(<Input type="password" />)
    const input = screen.getByDisplayValue('')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('applies size variants correctly', () => {
    render(<Input size="lg" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('h-11')
  })
}) 