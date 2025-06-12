export default {
  source: [
    'tokens/src/core/**/*.tokens.json',
    'tokens/src/semantic/**/*.tokens.json',
    'tokens/src/themes/**/*.tokens.json'
  ],
  transform: {
    'size/px': {
      type: 'value',
      matcher: (token) => token.type === 'dimension',
      transformer: (token) => {
        const value = token.original.value;
        return parseFloat(value) + 'px';
      }
    },
    'color/css': {
      type: 'value',
      matcher: (token) => token.type === 'color',
      transformer: (token) => {
        return token.original.value;
      }
    },
    'duration/css': {
      type: 'value',
      matcher: (token) => token.type === 'duration',
      transformer: (token) => {
        return token.original.value;
      }
    },
    'name/cti/kebab': {
      type: 'name',
      transformer: (token) => {
        return token.path.join('-').toLowerCase();
      }
    },
    'name/cti/camel': {
      type: 'name',
      transformer: (token) => {
        const [first, ...rest] = token.path;
        return first.toLowerCase() + rest.map(part => 
          part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('');
      }
    }
  },
  platforms: {
    // CSS Variables for React, Angular, Browser Extensions
    css: {
      transformGroup: 'css',
      buildPath: 'tokens/build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          selector: ':root',
          options: {
            showFileHeader: true,
            fileHeader: 'custom',
            outputReferences: true
          }
        },
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          selector: '[data-theme="dark"]',
          filter: (token) => token.filePath.includes('dark'),
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    },
    
    // SCSS Variables for Angular
    scss: {
      transformGroup: 'scss',
      buildPath: 'tokens/build/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: '_tokens-dark.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('dark'),
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    },
    
    // JavaScript/TypeScript for React
    js: {
      transformGroup: 'js',
      buildPath: 'tokens/build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          options: {
            showFileHeader: true,
            outputReferences: false
          }
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
          options: {
            showFileHeader: true
          }
        }
      ]
    },
    
    // JSON for React Native
    'react-native': {
      transformGroup: 'js',
      buildPath: 'tokens/build/react-native/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
          options: {
            showFileHeader: true
          }
        },
        {
          destination: 'tokens-flat.json',
          format: 'json/flat',
          options: {
            showFileHeader: true
          }
        }
      ]
    },
    
    // Tailwind CSS Plugin
    tailwind: {
      transformGroup: 'js',
      buildPath: 'tokens/build/tailwind/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/object',
          options: {
            showFileHeader: true
          }
        }
      ]
    }
  },
  
  // Custom formats
  format: {
    'custom/css-variables': {
      formatter: function(dictionary) {
        return `:root {\n${dictionary.allTokens.map(token => 
          `  --${token.name}: ${token.value};`
        ).join('\n')}\n}`;
      }
    },
    'custom/react-native-stylesheet': {
      formatter: function(dictionary) {
        const tokens = dictionary.allTokens.reduce((acc, token) => {
          acc[token.name] = token.value;
          return acc;
        }, {});
        
        return `import { StyleSheet } from 'react-native';

export const tokens = ${JSON.stringify(tokens, null, 2)};

export const styles = StyleSheet.create({
  // Add common styles here
});`;
      }
    }
  }
}; 