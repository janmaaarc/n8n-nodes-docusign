# n8n-nodes-docusign

[![npm version](https://badge.fury.io/js/n8n-nodes-docusign.svg)](https://badge.fury.io/js/n8n-nodes-docusign)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n-community](https://img.shields.io/badge/n8n-community%20node-orange)](https://docs.n8n.io/integrations/community-nodes/)

This is an n8n community node for [DocuSign](https://www.docusign.com/) - the world's leading eSignature platform.

Send documents for signature, manage envelopes, and automate your document workflows directly from n8n.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- **Create Envelopes**: Send documents for signature with custom recipient settings
- **Multiple Signers & Documents**: Support for multiple signers and documents per envelope
- **Use Templates**: Send envelopes using pre-configured templates
- **Manage Envelopes**: Get, list, send, resend, void, and manage recipients
- **Download Documents**: Retrieve signed documents programmatically
- **Audit Trail**: Access envelope audit events for compliance
- **Template Management**: List and get template details
- **Webhook Trigger**: Real-time notifications via DocuSign Connect
- **Regional Support**: North America, Europe, Australia, and Canada regions
- **Token Caching**: Efficient JWT token caching to minimize API calls
- **Rate Limiting**: Automatic retry with exponential backoff for rate limits
- **Full Pagination**: Retrieve all items when using "Return All" option
- **Input Validation**: Comprehensive validation for emails, UUIDs, dates, and more

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install n8n-nodes-docusign
```

## Nodes

### DocuSign

The main node for interacting with the DocuSign eSignature API.

### DocuSign Trigger

Webhook trigger node for receiving real-time DocuSign Connect notifications.

## Operations

### Envelope

| Operation | Description |
|-----------|-------------|
| **Create** | Create a new envelope with documents and recipients (supports multiple) |
| **Create From Template** | Create and send an envelope using a template |
| **Get** | Get details of a specific envelope |
| **Get Many** | Get a list of envelopes with filtering and pagination |
| **Send** | Send a draft envelope for signing |
| **Resend** | Resend notification emails to recipients |
| **Void** | Void an envelope to cancel the signing process |
| **Download Document** | Download signed documents |
| **Get Recipients** | Get the list of recipients for an envelope |
| **Update Recipients** | Update recipient email or name |
| **Get Audit Events** | Get the audit trail for an envelope |

### Template

| Operation | Description |
|-----------|-------------|
| **Get** | Get details of a specific template |
| **Get Many** | Get a list of templates with filtering and pagination |

### Trigger Events

| Event | Description |
|-------|-------------|
| **Envelope Sent** | Triggered when an envelope is sent |
| **Envelope Delivered** | Triggered when an envelope is delivered |
| **Envelope Completed** | Triggered when all recipients complete signing |
| **Envelope Declined** | Triggered when a recipient declines |
| **Envelope Voided** | Triggered when an envelope is voided |
| **Recipient Sent/Delivered/Completed/Declined** | Recipient-level events |
| **Template Created/Modified/Deleted** | Template lifecycle events |

## Credentials

To use this node, you need DocuSign API credentials:

1. Go to [DocuSign Admin](https://admin.docusign.com/)
2. Navigate to **Settings > Apps and Keys**
3. Create an **Integration Key** (Client ID)
4. Note your **User ID** and **Account ID**
5. Generate an **RSA Key Pair** and save the private key

### Required Credentials

| Field | Description |
|-------|-------------|
| Environment | Production or Demo/Sandbox |
| Region | NA, EU, AU, or CA (production only) |
| Integration Key | Your app's Client ID |
| User ID | GUID of the user to impersonate |
| Account ID | Your DocuSign Account ID |
| Private Key | RSA Private Key for JWT auth |
| Webhook Secret | HMAC secret for webhook verification (optional) |

### Granting Consent

Before first use, you must grant consent for your integration:

**Demo:** `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=YOUR_INTEGRATION_KEY&redirect_uri=YOUR_REDIRECT_URI`

**Production:** `https://account.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=YOUR_INTEGRATION_KEY&redirect_uri=YOUR_REDIRECT_URI`

## Example Usage

### Send a Document for Signature

1. Add a **DocuSign** node
2. Select **Envelope > Create**
3. Fill in:
   - Email Subject: "Please sign this contract"
   - Signer Email: recipient@example.com
   - Signer Name: John Doe
   - Document: (binary data or base64)
   - Document Name: contract.pdf
4. Enable "Send Immediately"

### Send to Multiple Signers

1. Add a **DocuSign** node
2. Select **Envelope > Create**
3. Fill in primary signer details
4. In Additional Options:
   - Add "Additional Signers" with email, name, and routing order
   - Add "Additional Documents" if needed

### Use a Template

1. Add a **DocuSign** node
2. Select **Envelope > Create From Template**
3. Fill in:
   - Template ID: (from DocuSign)
   - Email Subject: "Your document is ready"
   - Role Name: Signer (must match template role)
   - Recipient Email/Name

### Set Up Webhooks

1. Add a **DocuSign Trigger** node
2. Select the events you want to receive
3. Copy the webhook URL
4. In DocuSign Admin > Connect, create a configuration pointing to this URL
5. (Recommended) Configure HMAC signing and add the secret to credentials

## Configuration Options

### Envelope Create Options

| Option | Description |
|--------|-------------|
| Email Message | Body text of the email |
| Carbon Copy | Add recipients who receive a copy |
| Signature Position | X/Y coordinates or anchor text |
| Send Immediately | Send or save as draft |
| Additional Signers | Add more signers with routing order |
| Additional Documents | Include multiple documents |

### Envelope Filters

| Filter | Description |
|--------|-------------|
| Status | Filter by envelope status |
| From/To Date | Date range filter |
| Search Text | Search by subject or recipient |

## Technical Features

### Token Caching

The node caches JWT access tokens to minimize authentication overhead. Tokens are automatically refreshed 5 minutes before expiration.

### Rate Limiting & Retry

When DocuSign returns a rate limit error (HTTP 429), the node automatically:
1. Reads the `Retry-After` header
2. Waits the specified time
3. Retries the request (up to 3 attempts)

For server errors (5xx), exponential backoff is used.

### Input Validation

All inputs are validated before making API calls:
- **Email addresses**: RFC 5322 compliant validation
- **UUIDs**: Format validation for envelope/template IDs
- **Base64**: Document content validation
- **Dates**: ISO 8601 format validation
- **URLs**: SSRF protection (blocks internal/private network URLs)

### Pagination

When using "Return All", the node automatically handles pagination:
- Follows DocuSign's pagination parameters
- Configurable timeout (default: 5 minutes)
- Memory-efficient page-by-page fetching

### Webhook Signature Verification

DocuSign Connect webhooks support HMAC-SHA256 signature verification:
- Configure a secret in DocuSign Connect
- Add the same secret to your n8n credentials
- Enable "Verify Signature" in the trigger node

### Regional Support

The node supports all DocuSign regions:
- **NA**: North America (default)
- **EU**: European Union
- **AU**: Australia
- **CA**: Canada

Select your region in the credentials when using production environment.

## Development

```bash
npm install    # Install dependencies
npm run build  # Build the node
npm run dev    # Watch mode
npm run lint   # Lint code
npm run test   # Run tests
```

### Project Structure

```
n8n-nodes-docusign/
├── credentials/
│   └── DocuSignApi.credentials.ts   # JWT auth with token caching
├── nodes/
│   └── DocuSign/
│       ├── DocuSign.node.ts         # Main node with handlers
│       ├── DocuSignTrigger.node.ts  # Webhook trigger node
│       ├── helpers.ts               # Validation, API, retry logic
│       ├── constants.ts             # API URLs, defaults
│       ├── types.ts                 # TypeScript interfaces
│       └── resources/               # UI field definitions
├── test/
│   └── DocuSign.test.ts             # Unit tests
└── package.json
```

## Security

- JWT tokens are cached in memory (not persisted)
- Error messages are sanitized to prevent credential leakage
- Input validation prevents injection attacks
- SSRF protection blocks internal network URLs
- Webhook signatures verified using timing-safe comparison

## Resources

- [DocuSign Developer Center](https://developers.docusign.com/)
- [eSignature REST API Reference](https://developers.docusign.com/docs/esign-rest-api/reference/)
- [JWT Authentication Guide](https://developers.docusign.com/platform/auth/jwt/)
- [DocuSign Connect Guide](https://developers.docusign.com/platform/webhooks/connect/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
