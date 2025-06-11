import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../src/styles/globals.css'
import '../src/styles/themes.css'
import '../src/styles/accessibility.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      toc: true
    },
    backgrounds: {
      disable: true, // Disable default backgrounds since we handle themes
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px'
          }
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px'
          }
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px'
          }
        },
        large: {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '900px'
          }
        }
      }
    },
    layout: 'centered'
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { 
            value: 'light', 
            title: 'Light Theme', 
            icon: 'sun',
            right: '☀️'
          },
          { 
            value: 'dark', 
            title: 'Dark Theme', 
            icon: 'moon',
            right: '🌙'
          },
          { 
            value: 'purple', 
            title: 'Purple Theme', 
            icon: 'paintbrush',
            right: '💜'
          },
          { 
            value: 'green', 
            title: 'Green Theme', 
            icon: 'paintbrush',
            right: '💚'
          },
          { 
            value: 'orange', 
            title: 'Orange Theme', 
            icon: 'paintbrush',
            right: '🧡'
          }
        ],
        dynamicTitle: true
      }
    },
    contrast: {
      description: 'Accessibility contrast level',
      defaultValue: 'normal',
      toolbar: {
        title: 'Contrast',
        icon: 'accessibility',
        items: [
          { 
            value: 'normal', 
            title: 'Normal Contrast',
            right: '🔍'
          },
          { 
            value: 'high', 
            title: 'High Contrast',
            right: '🔍+'
          }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      const contrast = context.globals.contrast;
      
      // Apply theme classes to document
      React.useEffect(() => {
        const root = document.documentElement;
        
        // Remove all theme classes
        root.classList.remove('dark', 'theme-purple', 'theme-green', 'theme-orange', 'contrast-high');
        
        // Apply selected theme
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme !== 'light') {
          root.classList.add(`theme-${theme}`);
        }
        
        // Apply contrast setting
        if (contrast === 'high') {
          root.classList.add('contrast-high');
        }
      }, [theme, contrast]);
      
      // Theme-specific background colors with improved contrast
      const getThemeStyles = () => {
        const baseStyles = {
          minHeight: '100vh',
          padding: '1rem',
          transition: 'all 0.3s ease'
        };
        
        switch (theme) {
          case 'dark':
            return {
              ...baseStyles,
              backgroundColor: contrast === 'high' ? '#000000' : '#0f172a',
              color: contrast === 'high' ? '#ffffff' : '#f1f5f9'
            };
          case 'purple':
            return {
              ...baseStyles,
              backgroundColor: contrast === 'high' ? '#f8f4ff' : '#faf5ff',
              color: contrast === 'high' ? '#4c1d95' : '#581c87'
            };
          case 'green':
            return {
              ...baseStyles,
              backgroundColor: contrast === 'high' ? '#ecfdf5' : '#f0fdf4',
              color: contrast === 'high' ? '#064e3b' : '#14532d'
            };
          case 'orange':
            return {
              ...baseStyles,
              backgroundColor: contrast === 'high' ? '#fff7ed' : '#fff7ed',
              color: contrast === 'high' ? '#7c2d12' : '#9a3412'
            };
          default: // light
            return {
              ...baseStyles,
              backgroundColor: contrast === 'high' ? '#ffffff' : '#ffffff',
              color: contrast === 'high' ? '#000000' : '#0f172a'
            };
        }
      };
      
      return (
        <div 
          className={`theme-wrapper ${theme === 'dark' ? 'dark' : theme !== 'light' ? `theme-${theme}` : ''} ${contrast === 'high' ? 'contrast-high' : ''}`}
          style={getThemeStyles()}
        >
          <Story />
        </div>
      );
    }
  ]
}

export default preview 