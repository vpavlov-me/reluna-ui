# Advanced Angular Integration with Reluna Design System

## Overview

This guide covers advanced integration patterns for using Reluna Design System in Angular applications, including token-based styling, theming, and creating custom components that follow the design system patterns.

## Installation & Setup

### 1. Install Dependencies

```bash
npm install @reluna/ui
# For Angular Material integration (optional)
npm install @angular/material @angular/cdk
```

### 2. Import Design Tokens

```scss
// src/styles.scss
@import '@reluna/ui/tokens/build/scss/tokens';
@import '@reluna/ui/tokens/build/scss/tokens-dark';

// Global styles
:root {
  // Light theme (default)
  @include reluna-tokens-light;
}

[data-theme='dark'] {
  // Dark theme
  @include reluna-tokens-dark;
}

// Alternative: CSS custom properties approach
@import '@reluna/ui/tokens/build/css/tokens.css';
```

### 3. Configure Angular Module

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RelunaModule } from '@reluna/ui/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RelunaModule.forRoot({
      theme: 'light',
      prefix: 'rl-' // Optional: customize component prefix
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Token-Based Component Development

### 1. Creating Token-Based Angular Components

```typescript
// button.component.ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'rl-button',
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;

  get buttonClasses(): string {
    return [
      'rl-button',
      `rl-button--${this.variant}`,
      `rl-button--${this.size}`,
      this.disabled ? 'rl-button--disabled' : '',
      this.loading ? 'rl-button--loading' : ''
    ].filter(Boolean).join(' ');
  }

  onClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
```

```scss
// button.component.scss
.rl-button {
  // Base styles using design tokens
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  white-space: nowrap;
  font-weight: var(--typography-font-weight-medium);
  transition-duration: var(--button-transition-duration);
  transition-timing-function: var(--button-transition-easing);
  border-radius: var(--button-border-radius);
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;

  // Focus styles
  &:focus-visible {
    outline: 2px solid var(--color-semantic-focus);
    outline-offset: 2px;
  }

  // Variants
  &--primary {
    background-color: var(--button-primary-background-default);
    color: var(--button-primary-text-default);
    border-color: var(--button-primary-border-default);
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--button-primary-background-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--button-primary-background-pressed);
    }
  }

  &--secondary {
    background-color: var(--button-secondary-background-default);
    color: var(--button-secondary-text-default);
    border-color: var(--button-secondary-border-default);

    &:hover:not(:disabled) {
      background-color: var(--button-secondary-background-hover);
      border-color: var(--button-secondary-border-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--button-secondary-background-pressed);
    }
  }

  &--success {
    background-color: var(--button-variants-success-background-default);
    color: var(--button-variants-success-text-default);
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--button-variants-success-background-hover);
    }
  }

  &--warning {
    background-color: var(--button-variants-warning-background-default);
    color: var(--button-variants-warning-text-default);
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--button-variants-warning-background-hover);
    }
  }

  &--danger {
    background-color: var(--button-variants-danger-background-default);
    color: var(--button-variants-danger-text-default);
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--button-variants-danger-background-hover);
    }
  }

  // Sizes
  &--small {
    height: var(--button-size-small-height);
    padding: var(--button-size-small-padding-vertical) var(--button-size-small-padding-horizontal);
    font-size: var(--button-size-small-font-size);
  }

  &--medium {
    height: var(--button-size-medium-height);
    padding: var(--button-size-medium-padding-vertical) var(--button-size-medium-padding-horizontal);
    font-size: var(--button-size-medium-font-size);
  }

  &--large {
    height: var(--button-size-large-height);
    padding: var(--button-size-large-padding-vertical) var(--button-size-large-padding-horizontal);
    font-size: var(--button-size-large-font-size);
  }

  // States
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--loading {
    position: relative;
    color: transparent;

    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### 2. Theme Service

```typescript
// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'reluna-theme';
  private themeSubject = new BehaviorSubject<Theme>('light');
  
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const systemTheme = this.getSystemTheme();
    
    const theme = savedTheme || systemTheme;
    this.setTheme(theme);
  }

  private getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    
    const resolvedTheme = theme === 'auto' ? this.getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    
    // Also set class for compatibility
    document.documentElement.className = `theme-${resolvedTheme}`;
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  toggleTheme(): void {
    const current = this.getCurrentTheme();
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }
}
```

### 3. Theme Toggle Component

```typescript
// theme-toggle.component.ts
import { Component } from '@angular/core';
import { ThemeService, Theme } from './theme.service';

@Component({
  selector: 'rl-theme-toggle',
  template: `
    <rl-button 
      variant="secondary" 
      size="medium"
      (click)="toggleTheme()"
      [attr.aria-label]="'Switch to ' + getNextTheme() + ' theme'"
    >
      <span class="theme-icon">
        {{ currentTheme === 'light' ? '🌙' : '☀️' }}
      </span>
      {{ currentTheme === 'light' ? 'Dark' : 'Light' }} Mode
    </rl-button>
  `,
  styles: [`
    .theme-icon {
      margin-right: var(--spacing-1);
    }
  `]
})
export class ThemeToggleComponent {
  currentTheme: Theme = 'light';

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getNextTheme(): string {
    return this.currentTheme === 'light' ? 'dark' : 'light';
  }
}
```

## Advanced Patterns

### 1. Custom Directive for Token-Based Styling

```typescript
// token-style.directive.ts
import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[rlTokenStyle]'
})
export class TokenStyleDirective implements OnInit, OnChanges {
  @Input() rlTokenStyle: { [key: string]: string } = {};

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.applyStyles();
  }

  ngOnChanges(): void {
    this.applyStyles();
  }

  private applyStyles(): void {
    Object.entries(this.rlTokenStyle).forEach(([property, tokenValue]) => {
      // Convert camelCase to kebab-case for CSS properties
      const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      
      // Apply the token value as a CSS custom property
      this.el.nativeElement.style.setProperty(
        cssProperty, 
        `var(--${tokenValue})`
      );
    });
  }
}
```

Usage:
```html
<div [rlTokenStyle]="{
  backgroundColor: 'color-semantic-background-primary',
  color: 'color-semantic-text-primary',
  padding: 'spacing-4',
  borderRadius: 'radius-md'
}">
  Custom styled element using tokens
</div>
```

### 2. Responsive Design with Breakpoint Tokens

```scss
// responsive.scss
@mixin respond-to($breakpoint) {
  @media (min-width: var(--breakpoint-#{$breakpoint})) {
    @content;
  }
}

// Usage in components
.my-component {
  padding: var(--spacing-2);
  
  @include respond-to('md') {
    padding: var(--spacing-4);
  }
  
  @include respond-to('lg') {
    padding: var(--spacing-6);
  }
}
```

### 3. Form Components with Token Integration

```typescript
// input.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rl-input',
  template: `
    <div class="rl-input-wrapper">
      <label *ngIf="label" [for]="inputId" class="rl-input-label">
        {{ label }}
        <span *ngIf="required" class="rl-input-required">*</span>
      </label>
      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class]="inputClasses"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      />
      <div *ngIf="error" class="rl-input-error">
        {{ error }}
      </div>
      <div *ngIf="hint && !error" class="rl-input-hint">
        {{ hint }}
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
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'default' | 'error' = 'default';
  @Input() disabled = false;
  @Input() required = false;
  @Input() error = '';
  @Input() hint = '';

  value = '';
  inputId = `rl-input-${Math.random().toString(36).substr(2, 9)}`;
  
  private onChange = (value: string) => {};
  private onTouched = () => {};

  get inputClasses(): string {
    return [
      'rl-input',
      `rl-input--${this.size}`,
      `rl-input--${this.variant}`,
      this.disabled ? 'rl-input--disabled' : ''
    ].filter(Boolean).join(' ');
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
    // Handle focus logic
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

## Best Practices

### 1. Token Naming Convention
- Always use semantic tokens over primitive tokens in components
- Follow the established naming pattern: `--component-element-property-state`
- Use CSS custom properties for maximum flexibility

### 2. Component Architecture
- Separate styling logic into dedicated `.scss` files
- Use TypeScript interfaces for consistent prop types
- Implement proper accessibility attributes

### 3. Theme Integration
- Always test components in both light and dark themes
- Use the theme service for consistent theme management
- Provide fallback values for custom properties

### 4. Performance Optimization
- Use OnPush change detection strategy where possible
- Minimize DOM manipulations in directives
- Leverage Angular's built-in optimization features

## Migration Guide

### From Existing Angular Material Components

```typescript
// Before (Angular Material)
import { MatButtonModule } from '@angular/material/button';

// After (Reluna)
import { RelunaButtonModule } from '@reluna/ui/angular';

// Template migration
// Before:
// <button mat-raised-button color="primary">Click me</button>

// After:
// <rl-button variant="primary">Click me</rl-button>
```

### From Custom CSS to Token-Based Styling

```scss
// Before
.my-button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
}

// After
.my-button {
  background-color: var(--button-primary-background-default);
  color: var(--button-primary-text-default);
  padding: var(--button-size-medium-padding-vertical) var(--button-size-medium-padding-horizontal);
  border-radius: var(--button-border-radius);
}
```

This advanced integration guide ensures that Angular applications can fully leverage the Reluna Design System's token-based architecture while maintaining Angular's best practices and patterns. 