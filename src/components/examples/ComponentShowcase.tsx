import React from 'react';
import { Button } from '../ui/button/Button';
import { Input } from '../ui/input/Input';
import { Checkbox } from '../ui/checkbox/Checkbox';
import { Radio } from '../ui/radio/Radio';
import { Switch } from '../ui/switch/Switch';
import { Card } from '../ui/card/Card';
import { Chips } from '../ui/chips/Chips';

export const ComponentShowcase: React.FC = () => {
  return (
    <div className="p-8 space-y-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Reluna UI Components</h1>
      
      {/* Button Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="white" buttonType="primary" size="small">Small Primary</Button>
          <Button variant="white" buttonType="primary" size="medium">Medium Primary</Button>
          <Button variant="white" buttonType="primary" size="large">Large Primary</Button>
          <Button variant="white" buttonType="secondary" size="medium">Secondary</Button>
          
          <Button variant="yellow" buttonType="primary" size="medium">Yellow</Button>
          <Button variant="red" buttonType="primary" size="medium">Red</Button>
          <Button variant="green" buttonType="primary" size="medium">Green</Button>
          <Button variant="white" buttonType="primary" size="medium" buttonState="disabled">Disabled</Button>
        </div>
      </section>

      {/* Input Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Default Input"
            placeholder="Enter text..."
            helperText="This is helper text"
          />
          <Input
            variant="error"
            label="Error Input"
            placeholder="Enter text..."
            errorMessage="This field is required"
          />
          <Input
            size="small"
            label="Small Input"
            placeholder="Small size..."
          />
          <Input
            size="large"
            label="Large Input"
            placeholder="Large size..."
          />
        </div>
      </section>

      {/* Checkbox Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Checkboxes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox size="small" label="Small Checkbox" />
          <Checkbox size="medium" label="Medium Checkbox" checked />
          <Checkbox size="large" label="Large Checkbox" indeterminate />
          <Checkbox 
            size="medium" 
            label="With Description" 
            description="This checkbox has a description"
            showDescription
          />
        </div>
      </section>

      {/* Radio Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Radio Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Radio size="small" label="Small Radio" name="radio-group-1" />
          <Radio size="medium" label="Medium Radio" name="radio-group-1" checked />
          <Radio size="large" label="Large Radio" name="radio-group-2" />
          <Radio 
            size="medium" 
            label="With Description" 
            description="This radio has a description"
            showDescription
            name="radio-group-3"
          />
        </div>
      </section>

      {/* Switch Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Switches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch size="small" label="Small Switch" position="left" />
          <Switch size="medium" label="Medium Switch" position="left" checked />
          <Switch size="large" label="Large Switch" position="right" />
          <Switch 
            size="medium" 
            label="With Description" 
            description="This switch has a description"
            showDescription
            position="left"
          />
        </div>
      </section>

      {/* Card Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            type="1"
            title="Card Type 1"
            description="This is a description for card type 1"
            buttons={
              <div className="flex gap-2">
                <Button size="small" variant="white" buttonType="primary">Action</Button>
                <Button size="small" variant="white" buttonType="secondary">Cancel</Button>
              </div>
            }
          >
            <p>Card content goes here...</p>
          </Card>
          
          <Card
            type="2"
            variant="elevated"
            title="Card Type 2"
            description="This is a description for card type 2"
            showEdit
            editButton={<Button size="small" variant="white" buttonType="secondary">Edit</Button>}
            buttons={
              <div className="flex gap-2">
                <Button size="small" variant="green" buttonType="primary">Save</Button>
                <Button size="small" variant="white" buttonType="secondary">Cancel</Button>
              </div>
            }
          >
            <p>Enhanced card content with edit functionality...</p>
          </Card>
        </div>
      </section>

      {/* Chips Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Chips</h2>
        <div className="flex flex-wrap gap-2">
          <Chips text="Default Chip" />
          <Chips text="Active Chip" active="yes" />
          <Chips text="Primary" variant="primary" active="yes" />
          <Chips text="Destructive" variant="destructive" active="yes" />
          <Chips text="Outline" variant="outline" />
          <Chips text="Removable" removable onRemove={() => console.log('Removed')} />
          <Chips text="No Indicator" showColorIndicator={false} />
          <Chips text="Large" size="large" active="yes" />
        </div>
      </section>
    </div>
  );
}; 