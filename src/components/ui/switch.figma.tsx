import { figma } from '@figma/code-connect';
import { Switch } from './switch/Switch';

figma.connect(Switch, 'https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=2:2384', {
  props: {
    state: figma.enum('State', {
      On: 'on',
      Off: 'off',
      'Off Disabled': 'off-disabled',
      'On Disabled': 'on-disabled',
      'On  Disabled': 'on-disabled',
    }),
    position: figma.enum('Position', {
      Left: 'left',
      Right: 'right',
    }),
    label: figma.textContent('Text'),
    description: figma.textContent('Description'),
    showText: figma.boolean('Text'),
    showDescription: figma.boolean('Show Description'),
  },
  example: ({ state, position, label, description, showText, showDescription }) => (
    <Switch
      state={state}
      position={position}
      label={label}
      description={description}
      showText={showText}
      showDescription={showDescription}
    />
  ),
}); 