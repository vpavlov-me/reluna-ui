# Reluna UI Components Documentation

## 📋 Component Overview

This document provides comprehensive documentation for all Reluna UI components, including usage guidelines, API references, and accessibility considerations.

## 🎨 Design Principles

### Consistency
- All components follow the same design language and token system
- Consistent spacing, typography, and color usage across components
- Unified interaction patterns and behaviors

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management and visual indicators

### Flexibility
- Composable component architecture
- Extensive customization through props and CSS variables
- Support for different themes and branding

---

## 📝 Form Components

### Button

**Purpose**: Primary interactive element for user actions.

**When to use**:
- Primary actions (submit, save, create)
- Secondary actions (cancel, reset)
- Navigation triggers
- Call-to-action elements

**When NOT to use**:
- For navigation between pages (use Link instead)
- For toggling states (use Switch or Toggle instead)

**API**:
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}
```

**Usage Examples**:
```tsx
// Primary action
<Button variant="default">Save Changes</Button>

// Destructive action
<Button variant="destructive">Delete Account</Button>

// Loading state
<Button loading>Processing...</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

**Accessibility**:
- Uses semantic `<button>` element
- Supports keyboard navigation (Enter/Space)
- Proper focus indicators
- Loading state announced to screen readers
- Disabled state properly communicated

---

### Input

**Purpose**: Text input for forms and data entry.

**When to use**:
- Single-line text input
- Email, password, number inputs
- Search fields
- Form data collection

**When NOT to use**:
- Multi-line text (use Textarea instead)
- Selection from options (use Select instead)
- File uploads (use FileInput instead)

**API**:
```typescript
interface InputProps {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
}
```

**Usage Examples**:
```tsx
// Basic input
<Input label="Email" type="email" required />

// With error state
<Input 
  label="Password" 
  type="password" 
  error="Password must be at least 8 characters" 
/>

// With helper text
<Input 
  label="Username" 
  helperText="Must be unique and 3-20 characters" 
/>
```

**Accessibility**:
- Proper label association
- Error messages linked via `aria-describedby`
- Required fields indicated visually and semantically
- Focus management and keyboard navigation

---

### Select

**Purpose**: Dropdown selection from predefined options.

**When to use**:
- Choosing from 5+ options
- Single selection required
- Space-constrained interfaces
- Standardized option sets

**When NOT to use**:
- Less than 5 options (use Radio buttons)
- Multiple selections (use Checkbox group)
- Searchable options (use Combobox)

**API**:
```typescript
interface SelectProps {
  options: SelectOption[]
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  required?: boolean
}

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}
```

**Usage Examples**:
```tsx
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
]

<Select 
  label="Country" 
  options={countries}
  placeholder="Select a country"
  required 
/>
```

---

### Checkbox

**Purpose**: Binary choice or multiple selections from a list.

**When to use**:
- Multiple selections from a list
- Boolean preferences/settings
- Terms and conditions acceptance
- Feature toggles in forms

**When NOT to use**:
- Single selection from multiple options (use Radio)
- Immediate state changes (use Switch)

**API**:
```typescript
interface CheckboxProps {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
}
```

**Usage Examples**:
```tsx
// Basic checkbox
<Checkbox label="Subscribe to newsletter" />

// With description
<Checkbox 
  label="Enable notifications"
  description="Receive email updates about your account"
/>

// Indeterminate state (for "select all" scenarios)
<Checkbox indeterminate label="Select all items" />
```

---

## 💬 Feedback Components

### Modal

**Purpose**: Overlay dialog for focused tasks or information.

**When to use**:
- Critical confirmations
- Complex forms that need focus
- Detailed information display
- Multi-step workflows

**When NOT to use**:
- Simple confirmations (use inline alerts)
- Non-critical information (use tooltips)
- Mobile-first interfaces (consider drawer instead)

**API**:
```typescript
interface ModalProps {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'
  title?: string
  description?: string
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
}
```

**Usage Examples**:
```tsx
// Confirmation modal
<Modal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Delete Account"
  description="This action cannot be undone"
>
  <ModalContent>
    <p>Are you sure you want to delete your account?</p>
  </ModalContent>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  </ModalFooter>
</Modal>
```

**Accessibility**:
- Focus trap within modal
- Escape key to close
- Proper ARIA attributes
- Background scroll prevention
- Focus restoration on close

---

### Notification

**Purpose**: Temporary messages for user feedback.

**When to use**:
- Success confirmations
- Error messages
- Warning alerts
- Information updates
- System status changes

**When NOT to use**:
- Permanent information (use banners)
- Critical errors that need immediate action (use modals)

**API**:
```typescript
interface NotificationProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  description?: string
  action?: React.ReactNode
  closable?: boolean
  onClose?: () => void
  duration?: number
  icon?: React.ReactNode | boolean
}
```

**Usage Examples**:
```tsx
// Success notification
<Notification 
  variant="success"
  title="Profile Updated"
  description="Your changes have been saved successfully"
  duration={5000}
/>

// Error with action
<Notification 
  variant="error"
  title="Upload Failed"
  description="The file could not be uploaded"
  action={<Button size="sm">Retry</Button>}
/>
```

---

## 🧭 Navigation Components

### Tabs

**Purpose**: Content organization with multiple related sections.

**When to use**:
- Related content sections
- Settings panels
- Data views (table, chart, list)
- Step-by-step processes

**When NOT to use**:
- Unrelated content (use separate pages)
- Linear workflows (use stepper)
- Single content section

**API**:
```typescript
interface TabsProps {
  variant?: 'default' | 'underline' | 'pills'
  size?: 'sm' | 'md' | 'lg'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}
```

**Usage Examples**:
```tsx
<Tabs defaultValue="profile" variant="underline">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  
  <TabsContent value="profile">
    <ProfileForm />
  </TabsContent>
  
  <TabsContent value="settings">
    <SettingsPanel />
  </TabsContent>
  
  <TabsContent value="billing">
    <BillingInfo />
  </TabsContent>
</Tabs>
```

---

## 📊 Data Components

### Table

**Purpose**: Structured data display with sorting and selection.

**When to use**:
- Tabular data display
- Data comparison
- Bulk operations
- Sortable/filterable lists

**When NOT to use**:
- Simple lists (use List component)
- Card-based layouts
- Mobile-first interfaces (consider responsive alternatives)

**API**:
```typescript
interface TableProps {
  variant?: 'default' | 'striped' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  rowKey?: keyof T | ((record: T) => string)
  selectedRowKeys?: string[]
  onSelectChange?: (selectedRowKeys: string[]) => void
  onSort?: (key: string, direction: 'asc' | 'desc' | null) => void
  pagination?: PaginationConfig
}
```

**Usage Examples**:
```tsx
// Basic table
<Table variant="striped">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

// Advanced data table
<DataTable
  columns={columns}
  data={data}
  loading={loading}
  selectedRowKeys={selected}
  onSelectChange={setSelected}
  onSort={handleSort}
  pagination={paginationConfig}
/>
```

---

## 🎯 Usage Guidelines

### Component Composition

**DO**:
- Compose components to create complex interfaces
- Use consistent spacing and alignment
- Follow the established design patterns
- Leverage semantic HTML elements

**DON'T**:
- Override core component styles arbitrarily
- Mix different design systems
- Ignore accessibility requirements
- Create custom components when existing ones suffice

### Responsive Design

**Breakpoint Usage**:
- `xs` (320px): Mobile portrait
- `sm` (640px): Mobile landscape
- `md` (768px): Tablet
- `lg` (1024px): Desktop
- `xl` (1280px): Large desktop
- `2xl` (1536px): Extra large desktop

**Mobile-First Approach**:
```tsx
// Responsive component sizing
<Button 
  size="sm"           // Mobile
  className="md:size-md lg:size-lg"  // Tablet and desktop
>
  Responsive Button
</Button>
```

### Theme Customization

**CSS Variables**:
```css
:root {
  --color-primary-500: #0ea5e9;
  --color-neutral-900: #18181b;
  --radius-md: 0.375rem;
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

**Component Theming**:
```tsx
// Custom theme provider
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### Performance Considerations

**Bundle Size**:
- Tree-shakeable exports
- Lazy loading for complex components
- Minimal runtime dependencies

**Rendering**:
- Memoization for expensive computations
- Virtualization for large lists
- Optimized re-renders

---

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast**:
- Text: 4.5:1 minimum ratio
- Large text: 3:1 minimum ratio
- Interactive elements: 3:1 minimum ratio

**Keyboard Navigation**:
- Tab order follows logical sequence
- All interactive elements keyboard accessible
- Focus indicators clearly visible
- Escape key closes overlays

**Screen Reader Support**:
- Semantic HTML structure
- Proper ARIA labels and descriptions
- Live regions for dynamic content
- Meaningful alt text for images

**Focus Management**:
- Focus trapping in modals
- Focus restoration after interactions
- Skip links for navigation
- Logical tab sequences

### Testing Checklist

- [ ] Keyboard-only navigation works
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets requirements
- [ ] Focus indicators are visible
- [ ] Interactive elements have proper labels
- [ ] Error messages are associated with inputs
- [ ] Dynamic content updates are announced

---

## 🔧 Development Guidelines

### Component Structure

```
ComponentName/
├── index.ts                 # Main export
├── ComponentName.tsx        # Implementation
├── ComponentName.types.ts   # TypeScript definitions
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx   # Unit tests
├── ComponentName.docs.mdx   # Documentation
└── styles.ts               # Styled variants
```

### Code Standards

**TypeScript**:
- Strict type checking enabled
- Proper interface definitions
- Generic types for reusable components
- Exported type definitions

**React**:
- Functional components with hooks
- forwardRef for DOM element access
- Proper prop destructuring
- Memoization where appropriate

**Styling**:
- Tailwind CSS classes
- CSS variables for theming
- Class variance authority for variants
- Responsive design utilities

### Testing Strategy

**Unit Tests**:
- Component rendering
- Prop handling
- Event handling
- Accessibility features

**Integration Tests**:
- Component composition
- Theme integration
- Form validation
- User interactions

**Visual Regression**:
- Storybook snapshots
- Cross-browser testing
- Responsive breakpoints
- Theme variations 