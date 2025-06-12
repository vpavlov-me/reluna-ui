# Using Reluna Design System in Angular

## Overview

This guide shows how to integrate Reluna Design System tokens into Angular applications. While the React components aren't directly usable in Angular, the design tokens provide a consistent foundation for building Angular components that match the design system.

## Installation

### Install Tokens Package

```bash
npm install @reluna/tokens
# or
yarn add @reluna/tokens
```

## Setup

### 1. Import CSS Variables

Add the CSS tokens to your global styles:

```scss
// src/styles.scss
@import '@reluna/tokens/css/tokens.css';

// Optional: Import theme-specific tokens
@import '@reluna/tokens/css/light-theme.css';
@import '@reluna/tokens/css/dark-theme.css';
```

### 2. Import SCSS Variables (Alternative)

If you prefer SCSS variables over CSS custom properties:

```scss
// src/styles.scss
@import '@reluna/tokens/scss/tokens';

// Now you can use SCSS variables like $color-semantic-text-primary
```

### 3. Angular Configuration

Update your `angular.json` to include the token styles:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@reluna/tokens/css/tokens.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

## Using Design Tokens

### 1. CSS Custom Properties Approach

```scss
// component.scss
.custom-button {
  background-color: var(--color-component-button-primary-background);
  color: var(--color-component-button-primary-text);
  border: 1px solid var(--color-component-button-primary-border);
  border-radius: var(--radius-component-button-border-radius);
  padding: var(--spacing-component-button-padding-y) var(--spacing-component-button-padding-x);
  
  &:hover {
    background-color: var(--color-component-button-primary-background-hover);
  }
  
  &:disabled {
    background-color: var(--color-component-button-primary-background-disabled);
    color: var(--color-component-button-primary-text-disabled);
  }
}
```

### 2. SCSS Variables Approach

```scss
// component.scss
@import '@reluna/tokens/scss/tokens';

.custom-button {
  background-color: $color-component-button-primary-background;
  color: $color-component-button-primary-text;
  border: 1px solid $color-component-button-primary-border;
  border-radius: $radius-component-button-border-radius;
  padding: $spacing-component-button-padding-y $spacing-component-button-padding-x;
  
  &:hover {
    background-color: $color-component-button-primary-background-hover;
  }
}
```

## Building Angular Components

### Button Component Example

```typescript
// button.component.ts
import { Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'rl-button',
  template: `
    <button 
      [class]="getButtonClasses()"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;

  onClick(event: Event) {
    if (!this.disabled) {
      // Handle click
    }
  }

  getButtonClasses(): string {
    return `rl-button rl-button--${this.variant} rl-button--${this.size}`;
  }
}
```

```scss
// button.component.scss
.rl-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: var(--typography-font-family-sans);
  font-weight: var(--typography-font-weight-medium);
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: 2px solid var(--color-semantic-border-focus);
    outline-offset: 2px;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  // Variants
  &--primary {
    background-color: var(--color-component-button-primary-background);
    color: var(--color-component-button-primary-text);
    border-radius: var(--radius-component-button-border-radius);
    
    &:hover:not(:disabled) {
      background-color: var(--color-component-button-primary-background-hover);
    }
    
    &:active:not(:disabled) {
      background-color: var(--color-component-button-primary-background-pressed);
    }
  }
  
  &--secondary {
    background-color: var(--color-component-button-secondary-background);
    color: var(--color-component-button-secondary-text);
    border: 1px solid var(--color-component-button-secondary-border);
    border-radius: var(--radius-component-button-border-radius);
    
    &:hover:not(:disabled) {
      background-color: var(--color-component-button-secondary-background-hover);
      border-color: var(--color-component-button-secondary-border-hover);
    }
  }
  
  &--ghost {
    background-color: var(--color-component-button-ghost-background);
    color: var(--color-component-button-ghost-text);
    border: 1px solid var(--color-component-button-ghost-border);
    border-radius: var(--radius-component-button-border-radius);
    
    &:hover:not(:disabled) {
      background-color: var(--color-component-button-ghost-background-hover);
      color: var(--color-component-button-ghost-text-hover);
    }
  }
  
  // Sizes
  &--small {
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--typography-font-size-sm);
    height: var(--spacing-8);
  }
  
  &--medium {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--typography-font-size-base);
    height: var(--spacing-10);
  }
  
  &--large {
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--typography-font-size-lg);
    height: var(--spacing-12);
  }
}
```

### Input Component Example

```typescript
// input.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rl-input',
  template: `
    <div [class]="getWrapperClasses()">
      <label *ngIf="label" [for]="inputId" class="rl-input__label">
        {{ label }}
      </label>
      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class]="getInputClasses()"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      />
      <div *ngIf="error" class="rl-input__error">
        {{ error }}
      </div>
    </div>
  `,
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() error?: string;
  @Input() inputId: string = `rl-input-${Math.random().toString(36).substr(2, 9)}`;

  value: string = '';
  focused: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.onTouched();
  }

  getWrapperClasses(): string {
    return 'rl-input';
  }

  getInputClasses(): string {
    let classes = 'rl-input__field';
    if (this.error) classes += ' rl-input__field--error';
    if (this.focused) classes += ' rl-input__field--focused';
    return classes;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

```scss
// input.component.scss
.rl-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);

  &__label {
    font-size: var(--typography-font-size-sm);
    font-weight: var(--typography-font-weight-medium);
    color: var(--color-semantic-text-primary);
  }

  &__field {
    background-color: var(--color-component-input-background);
    border: 1px solid var(--color-component-input-border);
    border-radius: var(--radius-component-input-border-radius);
    padding: var(--spacing-component-input-padding-y) var(--spacing-component-input-padding-x);
    font-size: var(--typography-font-size-base);
    color: var(--color-component-input-text);
    transition: all 0.2s ease-in-out;

    &::placeholder {
      color: var(--color-component-input-text-placeholder);
    }

    &:hover:not(:disabled) {
      border-color: var(--color-component-input-border-hover);
    }

    &:focus,
    &--focused {
      outline: none;
      border-color: var(--color-component-input-border-focus);
      box-shadow: 0 0 0 3px var(--color-component-input-border-focus)25; // 25 = 15% opacity
    }

    &:disabled {
      background-color: var(--color-component-input-background-disabled);
      cursor: not-allowed;
    }

    &--error {
      border-color: var(--color-component-input-border-error);
    }
  }

  &__error {
    font-size: var(--typography-font-size-sm);
    color: var(--color-semantic-status-error);
  }
}
```

## Theming Support

### Theme Service

```typescript
// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>('light');
  public theme$ = this.currentTheme.asObservable();

  constructor() {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('reluna-theme') as Theme;
    const systemTheme = this.getSystemTheme();
    
    this.setTheme(savedTheme || systemTheme);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.next(theme);
    localStorage.setItem('reluna-theme', theme);
    
    const resolvedTheme = theme === 'auto' ? this.getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }

  getTheme(): Theme {
    return this.currentTheme.value;
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
```

### Theme Toggle Component

```typescript
// theme-toggle.component.ts
import { Component } from '@angular/core';
import { ThemeService, Theme } from './theme.service';

@Component({
  selector: 'rl-theme-toggle',
  template: `
    <rl-button 
      variant="ghost" 
      (click)="toggleTheme()"
      [attr.aria-label]="'Switch to ' + getNextTheme() + ' theme'"
    >
      <span class="theme-icon">{{ getThemeIcon() }}</span>
      {{ getThemeLabel() }}
    </rl-button>
  `,
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    const currentTheme = this.themeService.getTheme();
    const nextTheme = this.getNextTheme();
    this.themeService.setTheme(nextTheme);
  }

  getNextTheme(): Theme {
    const currentTheme = this.themeService.getTheme();
    const themes: Theme[] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(currentTheme);
    return themes[(currentIndex + 1) % themes.length];
  }

  getThemeIcon(): string {
    const theme = this.themeService.getTheme();
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'auto': return '🔄';
      default: return '☀️';
    }
  }

  getThemeLabel(): string {
    const theme = this.themeService.getTheme();
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  }
}
```

## Angular Material Integration

If you're using Angular Material, you can create a custom theme using Reluna tokens:

```scss
// custom-theme.scss
@use '@angular/material' as mat;
@import '@reluna/tokens/scss/tokens';

// Define custom palettes using Reluna tokens
$reluna-primary: mat.define-palette((
  50: #{$color-primitive-blue-50},
  100: #{$color-primitive-blue-100},
  200: #{$color-primitive-blue-200},
  300: #{$color-primitive-blue-300},
  400: #{$color-primitive-blue-400},
  500: #{$color-primitive-blue-500},
  600: #{$color-primitive-blue-600},
  700: #{$color-primitive-blue-700},
  800: #{$color-primitive-blue-800},
  900: #{$color-primitive-blue-900},
  contrast: (
    50: #{$color-primitive-gray-900},
    100: #{$color-primitive-gray-900},
    200: #{$color-primitive-gray-900},
    300: #{$color-primitive-white},
    400: #{$color-primitive-white},
    500: #{$color-primitive-white},
    600: #{$color-primitive-white},
    700: #{$color-primitive-white},
    800: #{$color-primitive-white},
    900: #{$color-primitive-white},
  )
));

// Create the theme
$reluna-theme: mat.define-light-theme((
  color: (
    primary: $reluna-primary,
    accent: $reluna-primary,
  ),
  typography: mat.define-typography-config(
    $font-family: #{$typography-font-family-sans},
  ),
));

// Apply the theme
@include mat.all-component-themes($reluna-theme);
```

## Best Practices

### 1. Use CSS Custom Properties for Theming

```scss
// ✅ Good - Supports runtime theme switching
.component {
  color: var(--color-semantic-text-primary);
  background: var(--color-semantic-background-primary);
}

// ❌ Avoid - SCSS variables are compile-time only
.component {
  color: $color-semantic-text-primary;
  background: $color-semantic-background-primary;
}
```

### 2. Create Reusable Mixins

```scss
// _mixins.scss
@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: var(--typography-font-family-sans);
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: 2px solid var(--color-semantic-border-focus);
    outline-offset: 2px;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

@mixin button-variant($variant) {
  @if $variant == 'primary' {
    background-color: var(--color-component-button-primary-background);
    color: var(--color-component-button-primary-text);
    
    &:hover:not(:disabled) {
      background-color: var(--color-component-button-primary-background-hover);
    }
  }
  // ... other variants
}
```

### 3. Component Architecture

```typescript
// Create a base component class for common functionality
export abstract class BaseComponent {
  protected getTokenValue(tokenPath: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${tokenPath}`)
      .trim();
  }
}

// Extend in your components
@Component({...})
export class ButtonComponent extends BaseComponent {
  // Component implementation
}
```

## Testing

### Unit Testing with Tokens

```typescript
// button.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should apply correct CSS classes', () => {
    component.variant = 'primary';
    component.size = 'large';
    
    expect(component.getButtonClasses()).toBe('rl-button rl-button--primary rl-button--large');
  });

  it('should use design tokens for styling', () => {
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    const computedStyle = getComputedStyle(buttonElement);
    
    // Verify that CSS custom properties are being used
    expect(computedStyle.getPropertyValue('background-color')).toBeTruthy();
  });
});
```

## Migration Guide

### From Angular Material

```typescript
// Before (Angular Material)
<mat-button color="primary">Click me</mat-button>

// After (Reluna)
<rl-button variant="primary">Click me</rl-button>
```

### From Bootstrap

```html
<!-- Before (Bootstrap) -->
<button class="btn btn-primary btn-lg">Click me</button>

<!-- After (Reluna) -->
<rl-button variant="primary" size="large">Click me</rl-button>
```

## Examples

### Complete Form Example

```typescript
// form-example.component.ts
@Component({
  selector: 'app-form-example',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-example">
      <rl-input
        label="Full Name"
        placeholder="Enter your full name"
        formControlName="name"
        [error]="getFieldError('name')"
      ></rl-input>
      
      <rl-input
        label="Email"
        type="email"
        placeholder="Enter your email"
        formControlName="email"
        [error]="getFieldError('email')"
      ></rl-input>
      
      <div class="form-actions">
        <rl-button type="button" variant="secondary" (click)="onCancel()">
          Cancel
        </rl-button>
        <rl-button type="submit" variant="primary" [disabled]="form.invalid">
          Submit
        </rl-button>
      </div>
    </form>
  `,
  styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}

  getFieldError(fieldName: string): string | undefined {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
    }
    return undefined;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }

  onCancel() {
    this.form.reset();
  }
}
```

```scss
// form-example.component.scss
.form-example {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  max-width: 400px;
  margin: 0 auto;
  padding: var(--spacing-6);
  background: var(--color-semantic-background-primary);
  border: 1px solid var(--color-semantic-border-secondary);
  border-radius: var(--radius-lg);
}

.form-actions {
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
  margin-top: var(--spacing-2);
}
```

## Resources

- [Reluna Design System Documentation](https://reluna-ui.dev)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 