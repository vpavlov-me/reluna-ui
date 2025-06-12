# 🔒 Security Guidelines

## Environment Variables

This project uses environment variables to store sensitive information like API tokens. **Never commit actual tokens to the repository.**

### Required Environment Variables

Copy `.env.example` to `.env` and fill in your actual values:

```bash
cp .env.example .env
```

### Figma Integration

To use Figma Code Connect features:

1. Go to [Figma Settings > Personal Access Tokens](https://www.figma.com/settings)
2. Create a new token with appropriate permissions
3. Add it to your `.env` file:
   ```
   FIGMA_ACCESS_TOKEN=your_actual_token_here
   ```

### Chromatic Integration

For visual testing with Chromatic:

1. Get your project token from [Chromatic](https://www.chromatic.com/)
2. Add it to your `.env` file:
   ```
   CHROMATIC_PROJECT_TOKEN=your_actual_token_here
   ```

## GitHub Actions Secrets

For CI/CD, add these secrets to your GitHub repository:

- `CHROMATIC_PROJECT_TOKEN` - For visual testing
- `NPM_TOKEN` - For publishing to npm (if needed)
- `FIGMA_ACCESS_TOKEN` - For Figma integration (if needed in CI)

## Best Practices

1. **Never commit `.env` files** - they are already in `.gitignore`
2. **Use `.env.example`** to document required variables
3. **Rotate tokens regularly** for better security
4. **Use minimal permissions** when creating tokens
5. **Monitor token usage** in respective services

## Reporting Security Issues

If you discover a security vulnerability, please email us at security@reluna.dev instead of creating a public issue.

## Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] No hardcoded tokens in source code
- [ ] GitHub secrets are properly configured
- [ ] Tokens have minimal required permissions
- [ ] Regular token rotation schedule is in place 