export default {
  source: [
    'tokens/colors.json',
    'tokens/typography.json', 
    'tokens/spacing.json',
    'tokens/breakpoints.json',
    'tokens/radii.json',
    'tokens/shadows.json'
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
    }
  },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          selector: ':root',
          options: {
            showFileHeader: false
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
          options: {
            showFileHeader: false
          }
        }
      ]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations',
          options: {
            showFileHeader: false
          }
        }
      ]
    }
  }
} 