# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Features

This node implements several security measures:

### Authentication Security

- **JWT Token Caching**: Tokens are cached in memory only, never persisted to disk
- **Token Refresh**: Tokens are refreshed 5 minutes before expiration
- **RSA Key Handling**: Private keys are handled securely through n8n's credential system

### Input Validation

- **Email Validation**: RFC 5322 compliant email format checking
- **UUID Validation**: Strict UUID format validation for envelope/template IDs
- **Base64 Validation**: Document content validation before upload
- **Date Validation**: ISO 8601 format validation

### SSRF Protection

URL validation blocks:
- `localhost` and `127.0.0.1`
- Private network ranges (`10.x.x.x`, `172.16-31.x.x`, `192.168.x.x`)
- Link-local addresses (`169.254.x.x` - AWS metadata endpoint)
- IPv6 loopback (`::1`)

### Webhook Security

- **HMAC-SHA256 Verification**: Webhook signatures verified using timing-safe comparison
- **Signature Validation**: Rejects webhooks with invalid or missing signatures
- **Secret Management**: Webhook secrets stored securely in n8n credentials

### Error Handling

- **Sanitized Messages**: Error messages are sanitized to prevent credential leakage
- **Filtered Sensitive Data**: Errors containing "token", "key", or "secret" are redacted
- **Limited Message Length**: Error messages truncated to prevent data exposure

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer directly with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Critical issues addressed within 14 days

### Responsible Disclosure

We follow responsible disclosure practices:
- We will work with you to understand and resolve the issue
- We will credit reporters in the changelog (unless you prefer anonymity)
- We will not take legal action against researchers who follow this policy

## Best Practices for Users

### Credential Management

1. **Use Demo for Testing**: Always test with the demo environment first
2. **Rotate Keys Regularly**: Generate new RSA keys periodically
3. **Limit Permissions**: Use the minimum required scopes
4. **Separate Environments**: Use different integration keys for dev/staging/prod

### Webhook Security

1. **Always Verify Signatures**: Enable signature verification in the trigger node
2. **Use Strong Secrets**: Generate webhook secrets with `openssl rand -hex 32`
3. **HTTPS Only**: Ensure your n8n instance uses HTTPS for webhooks
4. **Monitor Events**: Review webhook logs for suspicious activity

### n8n Security

1. **Secure n8n Instance**: Follow [n8n security best practices](https://docs.n8n.io/hosting/security/)
2. **Access Control**: Limit who can access n8n credentials
3. **Audit Logs**: Enable and monitor n8n execution logs
4. **Network Security**: Use firewalls to restrict n8n access

## Security Checklist

Before deploying to production:

- [ ] Using production DocuSign environment with proper credentials
- [ ] RSA private key is secured and not shared
- [ ] Webhook secret is configured and strong
- [ ] Signature verification is enabled for triggers
- [ ] n8n instance is properly secured
- [ ] Access to credentials is restricted
- [ ] Error handling tested with invalid inputs
- [ ] Rate limiting considered for high-volume workflows
