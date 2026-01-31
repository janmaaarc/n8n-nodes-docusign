# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2025-02-01

### Added
- **DocuSign Trigger Node** - Real-time webhook notifications via DocuSign Connect
  - Supports envelope events (sent, delivered, completed, declined, voided)
  - Supports recipient events (sent, delivered, completed, declined, auth failed)
  - Supports template events (created, modified, deleted)
  - HMAC-SHA256 signature verification
  - Event filtering by type
- **Regional Support** - NA, EU, AU, and CA regions for production environments
- **Multiple Signers** - Support for adding multiple signers per envelope with routing order
- **Multiple Documents** - Support for adding multiple documents per envelope
- **Envelope Operations**:
  - `Create` - Create envelope with documents and recipients
  - `Create From Template` - Create envelope from pre-configured template
  - `Get` - Get envelope details
  - `Get Many` - List envelopes with filtering and pagination
  - `Send` - Send a draft envelope
  - `Resend` - Resend notification emails to recipients
  - `Void` - Void an envelope with reason
  - `Download Document` - Download signed documents
  - `Get Recipients` - Get recipient list for an envelope
  - `Update Recipients` - Update recipient email or name
  - `Get Audit Events` - Get envelope audit trail
- **Template Operations**:
  - `Get` - Get template details
  - `Get Many` - List templates with filtering
- **Authentication**:
  - JWT authentication with RSA key
  - Token caching with automatic refresh (5 min buffer)
- **Reliability**:
  - Rate limit handling with automatic retry (up to 3 attempts)
  - Exponential backoff for server errors (5xx)
  - Configurable request timeout (default: 30 seconds)
- **Input Validation**:
  - Email validation (RFC 5322 compliant)
  - UUID validation for envelope/template IDs
  - Base64 validation for document content
  - ISO 8601 date validation
  - URL validation with SSRF protection
- **Pagination**:
  - Full pagination support for list operations
  - Configurable timeout (default: 5 minutes)
  - Memory-efficient page-by-page fetching
- **Tests** - 61 tests with comprehensive coverage
- **Documentation** - README, CHANGELOG, CONTRIBUTING, SECURITY, CLAUDE

---

## Migration Guide

### Initial Setup (v0.1.0)

#### Granting Consent
Before first use, grant consent for your integration:

**Demo:**
```
https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=YOUR_INTEGRATION_KEY&redirect_uri=YOUR_REDIRECT_URI
```

**Production:**
```
https://account.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=YOUR_INTEGRATION_KEY&redirect_uri=YOUR_REDIRECT_URI
```

#### Webhook Setup
1. Go to DocuSign Admin > Integrations > Connect
2. Create a new configuration
3. Set the URL to the webhook URL from n8n
4. Configure HMAC secret (recommended: `openssl rand -hex 32`)
5. Add the same secret to your n8n credentials
