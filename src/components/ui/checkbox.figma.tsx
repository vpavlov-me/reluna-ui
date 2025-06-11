import { figma } from '@figma/code-connect';
import { Checkbox } from './checkbox/Checkbox';

figma.connect(Checkbox, 'https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=2:2232', {
  props: {
    size: figma.enum('Size', {
      L: 'large',
      M: 'medium',
      S: 'small',
    }),
    state: figma.enum('State', {
      Default: 'default',
      Hover: 'hover',
      Selected: 'selected',
      Multi: 'multi',
      'Disabled Selected': 'disabled-selected',
      'Disabled Default': 'disabled-default',
    }),
    label: figma.textContent('Text'),
    description: figma.textContent('Description'),
    showText: figma.boolean('Show Text'),
    showDescription: figma.boolean('Show Description'),
  },
  example: ({ size, state, label, description, showText, showDescription }) => (
    <Checkbox
      size={size}
      state={state}
      label={label}
      description={description}
      showText={showText}
      showDescription={showDescription}
    />
  ),
}); 