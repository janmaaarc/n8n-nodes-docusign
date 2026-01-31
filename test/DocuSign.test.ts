import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidUUID,
  isValidBase64,
  isValidUrl,
  isValidIsoDate,
  validateField,
  validateRequired,
  validateEmail,
  getFileExtension,
  isRateLimitError,
  isRetryableError,
  getRetryAfterSeconds,
  buildSigner,
  buildCarbonCopy,
  buildDocument,
  buildSignHereTab,
  buildTemplateRole,
  getBaseUrl,
} from '../nodes/DocuSign/helpers';
import {
  ENVELOPE_STATUSES,
  RECIPIENT_TYPES,
  RESOURCE_ENDPOINTS,
  API_BASE_URL_PRODUCTION,
  API_BASE_URL_DEMO,
  DEFAULT_SIGNATURE_X,
  DEFAULT_SIGNATURE_Y,
} from '../nodes/DocuSign/constants';

// ============================================================================
// Constants Tests
// ============================================================================

describe('Constants', () => {
  describe('ENVELOPE_STATUSES', () => {
    it('should have all required statuses', () => {
      expect(ENVELOPE_STATUSES).toHaveLength(7);
      expect(ENVELOPE_STATUSES.map((s) => s.value)).toContain('created');
      expect(ENVELOPE_STATUSES.map((s) => s.value)).toContain('sent');
      expect(ENVELOPE_STATUSES.map((s) => s.value)).toContain('completed');
      expect(ENVELOPE_STATUSES.map((s) => s.value)).toContain('voided');
    });

    it('should have name, value, and description for each status', () => {
      ENVELOPE_STATUSES.forEach((status) => {
        expect(status.name).toBeTruthy();
        expect(status.value).toBeTruthy();
        expect(status.description).toBeTruthy();
      });
    });
  });

  describe('RECIPIENT_TYPES', () => {
    it('should have all required recipient types', () => {
      expect(RECIPIENT_TYPES).toHaveLength(4);
      expect(RECIPIENT_TYPES.map((t) => t.value)).toContain('signer');
      expect(RECIPIENT_TYPES.map((t) => t.value)).toContain('cc');
    });
  });

  describe('RESOURCE_ENDPOINTS', () => {
    it('should have correct endpoint mappings', () => {
      expect(RESOURCE_ENDPOINTS.envelope).toBe('envelopes');
      expect(RESOURCE_ENDPOINTS.template).toBe('templates');
    });
  });

  describe('API Base URLs', () => {
    it('should have correct production URL', () => {
      expect(API_BASE_URL_PRODUCTION).toBe('https://na1.docusign.net/restapi/v2.1');
    });

    it('should have correct demo URL', () => {
      expect(API_BASE_URL_DEMO).toBe('https://demo.docusign.net/restapi/v2.1');
    });
  });

  describe('Default Signature Position', () => {
    it('should have default signature X and Y values', () => {
      expect(DEFAULT_SIGNATURE_X).toBe(100);
      expect(DEFAULT_SIGNATURE_Y).toBe(100);
    });
  });
});

// ============================================================================
// Validation Tests
// ============================================================================

describe('Validation Helpers', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user+tag@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('no@domain')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('isValidUUID', () => {
    it('should return true for valid UUIDs', () => {
      expect(isValidUUID('12345678-1234-1234-1234-123456789abc')).toBe(true);
      expect(isValidUUID('ABCDEF12-3456-7890-ABCD-EF1234567890')).toBe(true);
    });

    it('should return false for invalid UUIDs', () => {
      expect(isValidUUID('')).toBe(false);
      expect(isValidUUID('invalid')).toBe(false);
      expect(isValidUUID('12345678-1234-1234-1234')).toBe(false);
      expect(isValidUUID('12345678-1234-1234-1234-123456789abcdef')).toBe(false);
    });
  });

  describe('isValidBase64', () => {
    it('should return true for valid base64 strings', () => {
      expect(isValidBase64('SGVsbG8gV29ybGQ=')).toBe(true);
      expect(isValidBase64('YWJjZGVm')).toBe(true);
    });

    it('should return false for invalid base64 strings', () => {
      expect(isValidBase64('')).toBe(false);
      expect(isValidBase64('not valid base64!!!')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid external URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://api.docusign.com/v1')).toBe(true);
    });

    it('should return false for internal/private URLs (SSRF protection)', () => {
      expect(isValidUrl('http://localhost:3000')).toBe(false);
      expect(isValidUrl('http://127.0.0.1')).toBe(false);
      expect(isValidUrl('http://192.168.1.1')).toBe(false);
      expect(isValidUrl('http://10.0.0.1')).toBe(false);
      expect(isValidUrl('http://169.254.169.254')).toBe(false); // AWS metadata
    });

    it('should return false for non-http protocols', () => {
      expect(isValidUrl('ftp://files.example.com')).toBe(false);
      expect(isValidUrl('file:///etc/passwd')).toBe(false);
    });

    it('should require HTTPS when specified', () => {
      expect(isValidUrl('https://example.com', true)).toBe(true);
      expect(isValidUrl('http://example.com', true)).toBe(false);
    });
  });

  describe('isValidIsoDate', () => {
    it('should return true for valid ISO 8601 dates', () => {
      expect(isValidIsoDate('2024-01-15')).toBe(true);
      expect(isValidIsoDate('2024-01-15T10:30:00Z')).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(isValidIsoDate('invalid')).toBe(false);
      expect(isValidIsoDate('01/15/2024')).toBe(false);
    });
  });

  describe('validateField', () => {
    it('should validate required fields', () => {
      expect(() => validateField('name', 'value', 'required')).not.toThrow();
      expect(() => validateField('name', '', 'required')).toThrow('name is required');
    });

    it('should validate email fields', () => {
      expect(() => validateField('email', 'user@example.com', 'email')).not.toThrow();
      expect(() => validateField('email', 'invalid', 'email')).toThrow('email must be a valid email address');
    });

    it('should validate UUID fields', () => {
      expect(() => validateField('id', '12345678-1234-1234-1234-123456789abc', 'uuid')).not.toThrow();
      expect(() => validateField('id', 'invalid', 'uuid')).toThrow('id must be a valid UUID');
    });

    it('should skip validation for empty optional fields', () => {
      expect(() => validateField('email', '', 'email')).not.toThrow();
      expect(() => validateField('id', undefined, 'uuid')).not.toThrow();
    });
  });

  describe('validateRequired (deprecated)', () => {
    it('should pass for non-empty strings', () => {
      expect(() => validateRequired('hello', 'field')).not.toThrow();
    });

    it('should throw for empty strings', () => {
      expect(() => validateRequired('', 'field')).toThrow('field is required');
    });

    it('should throw for undefined', () => {
      expect(() => validateRequired(undefined, 'field')).toThrow('field is required');
    });
  });

  describe('validateEmail (deprecated)', () => {
    it('should pass for valid emails', () => {
      expect(() => validateEmail('user@example.com', 'email')).not.toThrow();
    });

    it('should throw for invalid emails', () => {
      expect(() => validateEmail('invalid', 'email')).toThrow(
        'email must be a valid email address',
      );
    });
  });
});

// ============================================================================
// File Extension Tests
// ============================================================================

describe('getFileExtension', () => {
  it('should extract extension from filename', () => {
    expect(getFileExtension('document.pdf')).toBe('pdf');
    expect(getFileExtension('contract.docx')).toBe('docx');
    expect(getFileExtension('file.name.with.dots.xlsx')).toBe('xlsx');
  });

  it('should return default extension for files without extension', () => {
    expect(getFileExtension('noextension')).toBe('pdf');
    expect(getFileExtension('noextension', 'docx')).toBe('docx');
  });
});

// ============================================================================
// Rate Limiting Tests
// ============================================================================

describe('Rate Limiting Helpers', () => {
  describe('isRateLimitError', () => {
    it('should return true for 429 status code', () => {
      expect(isRateLimitError({ statusCode: 429 })).toBe(true);
      expect(isRateLimitError({ response: { statusCode: 429 } })).toBe(true);
    });

    it('should return false for other status codes', () => {
      expect(isRateLimitError({ statusCode: 400 })).toBe(false);
      expect(isRateLimitError({ statusCode: 500 })).toBe(false);
    });
  });

  describe('isRetryableError', () => {
    it('should return true for 5xx errors', () => {
      expect(isRetryableError({ statusCode: 500 })).toBe(true);
      expect(isRetryableError({ statusCode: 502 })).toBe(true);
      expect(isRetryableError({ statusCode: 503 })).toBe(true);
    });

    it('should return true for network errors', () => {
      expect(isRetryableError({ code: 'ECONNRESET' })).toBe(true);
      expect(isRetryableError({ code: 'ETIMEDOUT' })).toBe(true);
      expect(isRetryableError({ code: 'ECONNREFUSED' })).toBe(true);
    });

    it('should return false for client errors', () => {
      expect(isRetryableError({ statusCode: 400 })).toBe(false);
      expect(isRetryableError({ statusCode: 404 })).toBe(false);
    });
  });

  describe('getRetryAfterSeconds', () => {
    it('should extract Retry-After header value', () => {
      expect(getRetryAfterSeconds({
        response: { headers: { 'retry-after': '60' } }
      })).toBe(60);
    });

    it('should return undefined when no header present', () => {
      expect(getRetryAfterSeconds({})).toBe(undefined);
      expect(getRetryAfterSeconds({ response: { headers: {} } })).toBe(undefined);
    });
  });
});

// ============================================================================
// URL Helpers Tests
// ============================================================================

describe('getBaseUrl', () => {
  it('should return production URL for production environment', () => {
    expect(getBaseUrl('production')).toBe(API_BASE_URL_PRODUCTION);
  });

  it('should return demo URL for demo environment', () => {
    expect(getBaseUrl('demo')).toBe(API_BASE_URL_DEMO);
  });

  it('should return production URL for unknown environments (defaults to NA)', () => {
    // Unknown environments default to production NA since credentials only allow 'demo' or 'production'
    expect(getBaseUrl('unknown')).toBe(API_BASE_URL_PRODUCTION);
  });

  it('should return regional URL for production with region', () => {
    expect(getBaseUrl('production', 'eu')).toBe('https://eu.docusign.net/restapi/v2.1');
    expect(getBaseUrl('production', 'au')).toBe('https://au.docusign.net/restapi/v2.1');
    expect(getBaseUrl('production', 'ca')).toBe('https://ca.docusign.net/restapi/v2.1');
  });
});

// ============================================================================
// Builder Functions Tests
// ============================================================================

describe('Builder Functions', () => {
  describe('buildSigner', () => {
    it('should build a valid signer object', () => {
      const signer = buildSigner('test@example.com', 'John Doe', '1', '1');
      expect(signer).toEqual({
        email: 'test@example.com',
        name: 'John Doe',
        recipientId: '1',
        routingOrder: '1',
      });
    });

    it('should throw for invalid email', () => {
      expect(() => buildSigner('invalid', 'John Doe', '1')).toThrow(
        'Signer email must be a valid email address',
      );
    });

    it('should throw for empty name', () => {
      expect(() => buildSigner('test@example.com', '', '1')).toThrow('Signer name is required');
    });
  });

  describe('buildCarbonCopy', () => {
    it('should build a valid carbon copy object', () => {
      const cc = buildCarbonCopy('cc@example.com', 'Jane Doe', '2', '2');
      expect(cc).toEqual({
        email: 'cc@example.com',
        name: 'Jane Doe',
        recipientId: '2',
        routingOrder: '2',
      });
    });

    it('should throw for invalid email', () => {
      expect(() => buildCarbonCopy('invalid', 'Jane Doe', '2')).toThrow(
        'CC email must be a valid email address',
      );
    });
  });

  describe('buildDocument', () => {
    it('should build a valid document object', () => {
      const doc = buildDocument('base64content', '1', 'contract.pdf', 'pdf');
      expect(doc).toEqual({
        documentBase64: 'base64content',
        documentId: '1',
        name: 'contract.pdf',
        fileExtension: 'pdf',
      });
    });

    it('should throw for empty content', () => {
      expect(() => buildDocument('', '1', 'contract.pdf')).toThrow('Document content is required');
    });

    it('should throw for empty name', () => {
      expect(() => buildDocument('content', '1', '')).toThrow('Document name is required');
    });
  });

  describe('buildSignHereTab', () => {
    it('should build a tab with x/y coordinates', () => {
      const tab = buildSignHereTab('1', '1', { xPosition: '200', yPosition: '300' });
      expect(tab).toEqual({
        documentId: '1',
        pageNumber: '1',
        xPosition: '200',
        yPosition: '300',
      });
    });

    it('should build a tab with anchor string', () => {
      const tab = buildSignHereTab('1', '1', {
        anchorString: '/sign/',
        anchorXOffset: '10',
        anchorYOffset: '20',
      });
      expect(tab).toEqual({
        documentId: '1',
        pageNumber: '1',
        anchorString: '/sign/',
        anchorXOffset: '10',
        anchorYOffset: '20',
      });
    });

    it('should use default coordinates when no options provided', () => {
      const tab = buildSignHereTab('1', '1', {});
      expect(tab).toEqual({
        documentId: '1',
        pageNumber: '1',
        xPosition: '100',
        yPosition: '100',
      });
    });
  });

  describe('buildTemplateRole', () => {
    it('should build a valid template role', () => {
      const role = buildTemplateRole('test@example.com', 'John Doe', 'Signer');
      expect(role).toEqual({
        email: 'test@example.com',
        name: 'John Doe',
        roleName: 'Signer',
      });
    });

    it('should throw for invalid email', () => {
      expect(() => buildTemplateRole('invalid', 'John Doe', 'Signer')).toThrow(
        'Recipient email must be a valid email address',
      );
    });

    it('should throw for empty role name', () => {
      expect(() => buildTemplateRole('test@example.com', 'John Doe', '')).toThrow(
        'Role name is required',
      );
    });
  });
});

// ============================================================================
// Credential Tests
// ============================================================================

describe('Credentials', () => {
  it('should have correct credential name', async () => {
    const { DocuSignApi } = await import('../credentials/DocuSignApi.credentials');
    const credential = new DocuSignApi();
    expect(credential.name).toBe('docuSignApi');
    expect(credential.displayName).toBe('DocuSign API');
  });

  it('should have required properties', async () => {
    const { DocuSignApi } = await import('../credentials/DocuSignApi.credentials');
    const credential = new DocuSignApi();
    const propertyNames = credential.properties.map((p) => p.name);

    expect(propertyNames).toContain('environment');
    expect(propertyNames).toContain('integrationKey');
    expect(propertyNames).toContain('userId');
    expect(propertyNames).toContain('accountId');
    expect(propertyNames).toContain('privateKey');
  });
});

// ============================================================================
// Node Description Tests
// ============================================================================

describe('Node Description', () => {
  it('should have correct node name and display name', async () => {
    const { DocuSign } = await import('../nodes/DocuSign/DocuSign.node');
    const node = new DocuSign();
    expect(node.description.name).toBe('docuSign');
    expect(node.description.displayName).toBe('DocuSign');
  });

  it('should have correct icon', async () => {
    const { DocuSign } = await import('../nodes/DocuSign/DocuSign.node');
    const node = new DocuSign();
    expect(node.description.icon).toBe('file:docusign.svg');
  });

  it('should require docuSignApi credentials', async () => {
    const { DocuSign } = await import('../nodes/DocuSign/DocuSign.node');
    const node = new DocuSign();
    expect(node.description.credentials).toHaveLength(1);
    expect(node.description.credentials?.[0].name).toBe('docuSignApi');
    expect(node.description.credentials?.[0].required).toBe(true);
  });

  it('should have properties defined', async () => {
    const { DocuSign } = await import('../nodes/DocuSign/DocuSign.node');
    const node = new DocuSign();
    expect(node.description.properties.length).toBeGreaterThan(0);
  });
});
