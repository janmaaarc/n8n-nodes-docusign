# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer directly at: janmarccolomaaa@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

You can expect:
- Acknowledgment within 48 hours
- Status update within 7 days
- Credit in the security advisory (if desired)

## Security Features

This node implements several security measures:

### Authentication Security

- **JWT Token Caching**: Tokens are cached in memory only, never persisted to disk
- **Token Refresh**: Tokens are refreshed 5 minutes before expiration
- **RSA Key Handling**: Private keys are handled securely through n8n's credential system

### Webhook Security

- **Mandatory Signature Verification**: All webhooks are verified using HMAC-SHA256 signatures
- **Timing-Safe Comparison**: Signature verification uses `crypto.timingSafeEqual` to prevent timing attacks
- **Secret Management**: Webhook secrets stored securely in n8n credentials

### Input Validation

- **Email Validation**: RFC 5322 compliant validation
- **UUID Validation**: Strict UUID format validation for envelope/template IDs
- **Base64 Validation**: Document content validation before upload
- **Date Validation**: ISO 8601 format validation
- **URL Validation**: Blocks internal/private network URLs to prevent SSRF attacks:
  - localhost, 127.0.0.1, 0.0.0.0
  - IPv6 loopback (::1, [::1])
  - Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x
  - Link-local: 169.254.x.x (AWS metadata endpoint)

### API Security

- **Bearer Token Authentication**: JWT tokens transmitted securely via Authorization header
- **HTTPS Only**: All API communication uses HTTPS
- **Rate Limit Handling**: Automatic retry with backoff prevents API abuse

### Error Handling

- **Safe Error Messages**: API errors are sanitized before display
- **No Credential Exposure**: Tokens and keys are never logged or exposed in errors
- **Filtered Sensitive Data**: Errors containing "token", "key", or "secret" are redacted

## Best Practices for Users

1. **Credential Management**
   - Store credentials securely in n8n
   - Rotate RSA keys periodically
   - Use separate integration keys for test/production

2. **Webhook Configuration**
   - Use strong, random webhook secrets (32+ characters)
   - Generate with: `openssl rand -hex 32`
   - Keep webhook URLs private
   - Monitor webhook logs for anomalies

3. **Environment Selection**
   - Always test with demo environment first
   - Use production only for live workflows

## Security Changelog

### v0.0.4
- Initial release with comprehensive security features
- JWT token caching with automatic refresh
- HMAC-SHA256 webhook signature verification
- Input validation for emails, UUIDs, base64, dates, URLs
- SSRF protection for URL inputs
- Error message sanitization
- Rate limit handling with exponential backoff
