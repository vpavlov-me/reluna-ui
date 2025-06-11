import { figma } from '@figma/code-connect';
import { Radio } from './radio/Radio';

figma.connect(Radio, 'https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=2:2317', {
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
      'Disabled Default': 'disabled-default',
      'Disabled Selected': 'disabled-selected',
    }),
    label: figma.textContent('Text'),
    description: figma.textContent('Description'),
    showText: figma.boolean('Show Text'),
    showDescription: figma.boolean('Show Description'),
  },
  example: ({ size, state, label, description, showText, showDescription }) => (
    <Radio
      size={size}
      state={state}
      label={label}
      description={description}
      showText={showText}
      showDescription={showDescription}
    />
  ),
}); 