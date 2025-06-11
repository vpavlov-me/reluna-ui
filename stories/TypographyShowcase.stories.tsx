import type { Meta, StoryObj } from '@storybook/react'
import TypographyShowcase from '../src/components/examples/TypographyShowcase'

const meta: Meta<typeof TypographyShowcase> = {
  title: 'Design System/Typography Showcase',
  component: TypographyShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Демонстрация типографики Reluna Design System с использованием шрифта PPObjectSans и токенов из Figma.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof TypographyShowcase>

export const Default: Story = {
  name: 'Typography Showcase',
  parameters: {
    docs: {
      description: {
        story: 'Полная демонстрация всех типографических стилей с новым шрифтом PPObjectSans и размерами из дизайн-токенов.'
      }
    }
  }
} 