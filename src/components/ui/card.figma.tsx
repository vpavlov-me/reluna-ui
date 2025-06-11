import { figma } from '@figma/code-connect'
import { Card } from './card/Card'

// Основной компонент Card
figma.connect(Card, 'https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=6:34219', {
  props: {
    type: figma.enum('Type', {
      '1': '1',
      '2': '2'
    }),
    title: figma.textContent('Title'),
    description: figma.textContent('Description2'),
    showEdit: figma.boolean('Edit'),
    showButtons: figma.boolean('Buttons'),
    showDescription: figma.boolean('Description')
  },
  example: ({ type, title, description, showEdit, showButtons, showDescription }) => (
    <Card 
      type={type}
      title={title}
      description={description}
      showEdit={showEdit}
      showButtons={showButtons}
      showDescription={showDescription}
    >
      <p>Card content goes here...</p>
    </Card>
  )
}) 