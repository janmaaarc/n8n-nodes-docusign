# Contributing to n8n-nodes-docusign

Thank you for your interest in contributing to the DocuSign n8n community node!

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm
- n8n installed locally for testing
- A DocuSign developer account (free at [developers.docusign.com](https://developers.docusign.com))

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/n8n-nodes-docusign.git
   cd n8n-nodes-docusign
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the node:
   ```bash
   npm run build
   ```

4. Link to your local n8n installation:
   ```bash
   npm link
   cd ~/.n8n/nodes
   npm link n8n-nodes-docusign
   ```

5. Restart n8n to load the node

### Development Commands

```bash
npm run build     # Build the TypeScript files
npm run dev       # Watch mode for development
npm run lint      # Run ESLint
npm run lint:fix  # Fix linting issues
npm run test      # Run tests
```

## Code Guidelines

### TypeScript

- Use strict TypeScript (no `any` types unless absolutely necessary)
- Define interfaces for all data structures
- Use proper n8n workflow types from `n8n-workflow`

### Code Style

- Follow the existing code patterns in the repository
- Use meaningful variable and function names
- Add JSDoc comments for exported functions
- Keep functions focused and under 50 lines when possible
- Use immutable patterns (don't mutate objects)

### Input Validation

All user inputs must be validated:
- Email addresses: Use `validateField(name, value, 'email')`
- UUIDs: Use `validateField(name, value, 'uuid')`
- Required fields: Use `validateField(name, value, 'required')`
- Base64: Use `validateField(name, value, 'base64')`

### Error Handling

- Always catch errors and provide meaningful messages
- Sanitize error messages to avoid leaking credentials
- Use `NodeApiError` for API-related errors

### Security

- Never log or expose credentials
- Validate all URLs to prevent SSRF
- Use timing-safe comparison for signatures
- Follow the guidelines in SECURITY.md

## Pull Request Process

1. **Fork** the repository and create your branch from `main`
2. **Write tests** for any new functionality
3. **Update documentation** (README, CHANGELOG)
4. **Run linting and tests** before submitting
5. **Create a pull request** with a clear description

### PR Title Format

Use conventional commit format:
- `feat: Add envelope resend operation`
- `fix: Handle rate limit errors correctly`
- `docs: Update authentication guide`
- `refactor: Extract validation helpers`

### PR Description

Include:
- What the change does
- Why the change is needed
- How to test the change
- Screenshots if UI changes are involved

## Testing

### Running Tests

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Writing Tests

- Place tests in the `test/` directory
- Use descriptive test names
- Test both success and error cases
- Mock external API calls

Example:
```typescript
describe('validateField', () => {
  it('should validate email format', () => {
    expect(() => validateField('Email', 'invalid', 'email')).toThrow();
    expect(() => validateField('Email', 'test@example.com', 'email')).not.toThrow();
  });
});
```

## Adding New Features

### New Operations

1. Add the operation to `resources/envelope.ts` or `resources/template.ts`
2. Add required fields with proper `displayOptions`
3. Create a handler function in `DocuSign.node.ts`
4. Add the case to the switch statement in `execute()`
5. Update README and CHANGELOG

### New Trigger Events

1. Add the event to `WEBHOOK_EVENTS` in `DocuSignTrigger.node.ts`
2. Handle any event-specific data extraction
3. Update documentation

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Be respectful and constructive in discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
