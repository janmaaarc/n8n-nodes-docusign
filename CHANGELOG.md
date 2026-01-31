# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **DocuSign Trigger Node**: Real-time webhook notifications via DocuSign Connect
  - Supports envelope and recipient events
  - HMAC-SHA256 signature verification
  - Event filtering
- **Regional Support**: NA, EU, AU, and CA regions for production environments
- **Multiple Signers**: Support for adding multiple signers per envelope
- **Multiple Documents**: Support for adding multiple documents per envelope
- **New Envelope Operations**:
  - `Resend`: Resend notification emails to recipients
  - `Get Recipients`: Retrieve recipient list for an envelope
  - `Update Recipients`: Update recipient email or name
  - `Get Audit Events`: Access envelope audit trail
- **Webhook Secret**: Added credential field for webhook signature verification

### Changed
- Improved error messages with sanitization to prevent credential leakage
- Enhanced input validation with SSRF protection for URLs
- Updated documentation with comprehensive examples

### Fixed
- Fixed file extension extraction for documents without extensions
- Fixed regional URL selection for production environments

## [1.0.0] - Initial Release

### Added
- **Envelope Operations**:
  - Create envelope with document upload
  - Create envelope from template
  - Get envelope details
  - Get all envelopes with filtering and pagination
  - Send draft envelope
  - Void envelope
  - Download documents
- **Template Operations**:
  - Get template details
  - Get all templates with filtering
- **Authentication**:
  - JWT authentication with RSA key
  - Token caching with automatic refresh
- **Reliability**:
  - Rate limit handling with automatic retry
  - Exponential backoff for server errors
  - Comprehensive input validation
- **Pagination**:
  - Full pagination support for list operations
  - Configurable timeout and page size
