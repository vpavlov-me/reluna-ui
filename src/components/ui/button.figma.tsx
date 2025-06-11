import { figma } from '@figma/code-connect'
import { Button } from './button/Button'

// Основной компонент Button
figma.connect(Button, 'https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=1:3000', {
  props: {
    variant: figma.enum('Color', {
      'White': 'white',
      'Yellow': 'yellow',
      'Red': 'red',
      'Green': 'green'
    }),
    buttonType: figma.enum('Type', {
      'Primary': 'primary',
      'Secondary': 'secondary'
    }),
    icon: figma.enum('Icon', {
      'Off': 'off',
      'Right': 'right',
      'Left': 'left'
    }),
    buttonState: figma.enum('State', {
      'Default': 'default',
      'Hover': 'hover',
      'Pressed': 'pressed',
      'Disabled': 'disabled'
    }),
    children: figma.textContent('Text')
  },
  example: ({ variant, buttonType, buttonState, children }) => (
    <Button 
      variant={variant}
      buttonType={buttonType}
      buttonState={buttonState}
      size="medium"
    >
      {children}
    </Button>
  )
}) 