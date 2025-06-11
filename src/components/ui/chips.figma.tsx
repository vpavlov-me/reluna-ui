import { figma } from '@figma/code-connect';
import { Chips } from './chips/Chips';

figma.connect(Chips, 'https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=6:178', {
  props: {
    active: figma.enum('Active', {
      Yes: 'yes',
      No: 'no',
    }),
    text: figma.textContent('Text'),
    showColorIndicator: figma.boolean('Color Indicator'),
  },
  example: ({ active, text, showColorIndicator }) => (
    <Chips
      active={active}
      text={text}
      showColorIndicator={showColorIndicator}
    />
  ),
}); 