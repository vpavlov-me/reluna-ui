import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const typographyVariants = cva('font-primary', {
  variants: {
    variant: {
      // Display styles - используем размеры из токенов
      'display-large': 'font-primary text-50 font-bold leading-none tracking-tighter',
      'display-medium': 'font-primary text-32 font-bold leading-tight tracking-tight',
      'display-small': 'font-primary text-28 font-medium leading-tight tracking-tight',
      
      // Headings - используем размеры из токенов
      h1: 'font-primary text-32 font-bold leading-tight tracking-tight',
      h2: 'font-primary text-28 font-medium leading-tight tracking-tight',
      h3: 'font-primary text-22 font-medium leading-snug',
      h4: 'font-primary text-20 font-medium leading-snug',
      h5: 'font-primary text-16 font-medium leading-normal',
      h6: 'font-primary text-14 font-medium leading-normal',
      
      // Body text - используем размеры из токенов
      'body-large': 'font-primary text-20 font-normal leading-relaxed',
      'body-medium': 'font-primary text-16 font-normal leading-normal',
      'body-small': 'font-primary text-14 font-normal leading-normal',
      
      // Labels - используем размеры из токенов
      'label-large': 'font-primary text-16 font-medium leading-normal',
      'label-medium': 'font-primary text-14 font-medium leading-normal',
      'label-small': 'font-primary text-12 font-medium leading-normal tracking-wide',
      
      // Special text
      caption: 'font-primary text-12 font-normal leading-normal tracking-wide text-muted-foreground',
      overline: 'font-primary text-10 font-medium leading-normal tracking-widest uppercase text-muted-foreground',
      
      // Button text
      'button-large': 'font-primary text-16 font-medium leading-none tracking-wider',
      'button-medium': 'font-primary text-14 font-medium leading-none',
      'button-small': 'font-primary text-12 font-medium leading-none',
      
      // Code
      'code-inline': 'font-mono text-14 font-normal leading-normal',
      'code-block': 'font-mono text-14 font-normal leading-relaxed',
      
      // Link
      link: 'font-primary font-medium underline underline-offset-4 hover:no-underline'
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
      info: 'text-info'
    }
  },
  defaultVariants: {
    variant: 'body-medium',
    color: 'default'
  }
})

type TypographyVariant = VariantProps<typeof typographyVariants>

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    TypographyVariant {
  as?: keyof JSX.IntrinsicElements
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, as, ...props }, ref) => {
    // Determine appropriate HTML element based on variant
    const getDefaultElement = (variant: string | null | undefined): keyof JSX.IntrinsicElements => {
      if (!variant) return 'p'
      
      if (variant.startsWith('h') || variant.startsWith('display')) return variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'h1'
      if (variant.startsWith('body') || variant === 'caption') return 'p'
      if (variant.startsWith('label')) return 'label'
      if (variant === 'overline') return 'span'
      if (variant.startsWith('button')) return 'span'
      if (variant.startsWith('code')) return variant === 'code-inline' ? 'code' : 'pre'
      if (variant === 'link') return 'a'
      
      return 'p'
    }

    const Component = as || getDefaultElement(variant)

    return React.createElement(Component, {
      className: cn(typographyVariants({ variant, color }), className),
      ref,
      ...props
    })
  }
)

Typography.displayName = 'Typography'

// Convenient components for commonly used elements
export const Heading = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'> & { level: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level, ...props }, ref) => (
    <Typography
      ref={ref}
      variant={`h${level}` as any}
      as={`h${level}` as keyof JSX.IntrinsicElements}
      {...props}
    />
  )
)

export const Text = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'> & { size?: 'small' | 'medium' | 'large' }>(
  ({ size = 'medium', ...props }, ref) => (
    <Typography
      ref={ref}
      variant={`body-${size}` as any}
      as="p"
      {...props}
    />
  )
)

export const Label = React.forwardRef<HTMLLabelElement, Omit<TypographyProps, 'variant'> & { size?: 'small' | 'medium' | 'large' }>(
  ({ size = 'medium', ...props }, ref) => (
    <Typography
      ref={ref}
      variant={`label-${size}` as any}
      as="label"
      {...props}
    />
  )
)

export const Code = React.forwardRef<HTMLElement, Omit<TypographyProps, 'variant'> & { inline?: boolean }>(
  ({ inline = false, ...props }, ref) => (
    <Typography
      ref={ref}
      variant={inline ? 'code-inline' : 'code-block'}
      {...props}
    />
  )
)

export const Display = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'> & { size?: 'small' | 'medium' | 'large' }>(
  ({ size = 'medium', ...props }, ref) => (
    <Typography
      ref={ref}
      variant={`display-${size}` as any}
      as="h1"
      {...props}
    />
  )
)

Heading.displayName = 'Heading'
Text.displayName = 'Text'
Label.displayName = 'Label'
Code.displayName = 'Code'
Display.displayName = 'Display'

export { Typography, typographyVariants } 