import { figma } from '@figma/code-connect'
import { Input } from './input/Input'

// Основной компонент Input
figma.connect(Input, 'https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=2:674', {
  props: {
    variant: figma.enum('State', {
      Default: 'default',
      Error: 'error',
    }),
    label: figma.textContent('Label'),
    placeholder: figma.textContent('Placeholder'),
    helperText: figma.textContent('Helper Text'),
    errorMessage: figma.textContent('Error Message'),
    leftIcon: figma.boolean('Icon', {
      true: figma.instance('Left Icon'),
      false: undefined,
    }),
    rightIcon: figma.boolean('Hint', {
      true: figma.instance('Right Icon'),
      false: undefined,
    }),
  },
  example: ({ variant, label, placeholder, helperText, errorMessage, leftIcon, rightIcon }) => (
    <Input
      variant={variant}
      size="medium"
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      errorMessage={errorMessage}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  ),
})

 