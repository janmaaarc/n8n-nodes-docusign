import type { INodeProperties } from 'n8n-workflow';
import { ENVELOPE_STATUSES } from '../constants';

/**
 * Envelope operations available in the DocuSign node
 */
export const envelopeOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['envelope'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create an envelope',
      description: 'Create a new envelope with documents and recipients',
    },
    {
      name: 'Create From Template',
      value: 'createFromTemplate',
      action: 'Create from template',
      description: 'Create and send an envelope using a template',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get an envelope',
      description: 'Get details of a specific envelope',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many envelopes',
      description: 'Get a list of envelopes',
    },
    {
      name: 'Send',
      value: 'send',
      action: 'Send an envelope',
      description: 'Send a draft envelope for signing',
    },
    {
      name: 'Void',
      value: 'void',
      action: 'Void an envelope',
      description: 'Void an envelope to cancel the signing process',
    },
    {
      name: 'Download Document',
      value: 'downloadDocument',
      action: 'Download document',
      description: 'Download a signed document from an envelope',
    },
    {
      name: 'Get Audit Events',
      value: 'getAuditEvents',
      action: 'Get audit events',
      description: 'Get the audit trail for an envelope',
    },
    {
      name: 'Get Recipients',
      value: 'getRecipients',
      action: 'Get recipients',
      description: 'Get the list of recipients for an envelope',
    },
    {
      name: 'Resend',
      value: 'resend',
      action: 'Resend an envelope',
      description: 'Resend notification emails to recipients',
    },
    {
      name: 'Update Recipients',
      value: 'updateRecipients',
      action: 'Update recipients',
      description: 'Update recipient email or name for an envelope',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete an envelope',
      description: 'Delete a draft envelope (only works for drafts)',
    },
  ],
  default: 'create',
};

/**
 * Envelope fields for input parameters
 */
export const envelopeFields: INodeProperties[] = [
  // ==========================================================================
  // Create Operation Fields
  // ==========================================================================
  {
    displayName: 'Email Subject',
    name: 'emailSubject',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['create'],
      },
    },
    default: '',
    placeholder: 'Please sign this document',
    description: 'Subject line of the email sent to recipients',
  },
  {
    displayName: 'Signer Email',
    name: 'signerEmail',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['create'],
      },
    },
    default: '',
    placeholder: 'signer@example.com',
    description: 'Email address of the person who needs to sign',
  },
  {
    displayName: 'Signer Name',
    name: 'signerName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['create'],
      },
    },
    default: '',
    placeholder: 'John Doe',
    description: 'Full name of the signer',
  },
  {
    displayName: 'Document',
    name: 'document',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['create'],
      },
    },
    default: '',
    description:
      'Binary property name containing the document to send, or a base64-encoded string',
  },
  {
    displayName: 'Document Name',
    name: 'documentName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['create'],
      },
    },
    default: 'document.pdf',
    description: 'Name of the document file',
  },
  {
    displayName: 'Send Immediately',
    name: 'sendImmediately',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['create'],
      },
    },
    default: true,
    description: 'Whether to send the envelope immediately after creation',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Email Message',
        name: 'emailBlurb',
        type: 'string',
        default: '',
        description: 'Email body text sent to recipients',
        typeOptions: {
          rows: 3,
        },
      },
      {
        displayName: 'Carbon Copy Email',
        name: 'ccEmail',
        type: 'string',
        default: '',
        description: 'Email address to send a copy to (will not sign)',
      },
      {
        displayName: 'Carbon Copy Name',
        name: 'ccName',
        type: 'string',
        default: '',
        description: 'Name of the carbon copy recipient',
      },
      {
        displayName: 'Signature Position X',
        name: 'signatureX',
        type: 'number',
        default: 100,
        description: 'X coordinate for signature field placement (in pixels)',
      },
      {
        displayName: 'Signature Position Y',
        name: 'signatureY',
        type: 'number',
        default: 100,
        description: 'Y coordinate for signature field placement (in pixels)',
      },
      {
        displayName: 'Signature Page',
        name: 'signaturePage',
        type: 'number',
        default: 1,
        description: 'Page number for signature field',
      },
      {
        displayName: 'Use Anchor Tag',
        name: 'useAnchor',
        type: 'boolean',
        default: false,
        description: 'Whether to use anchor text instead of coordinates for signature placement',
      },
      {
        displayName: 'Anchor String',
        name: 'anchorString',
        type: 'string',
        default: '/sig/',
        description: 'Text in document to anchor signature field to',
        displayOptions: {
          show: {
            useAnchor: [true],
          },
        },
      },
      {
        displayName: 'Additional Signers',
        name: 'additionalSigners',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        description: 'Add more signers to the envelope',
        options: [
          {
            name: 'signers',
            displayName: 'Signer',
            values: [
              {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
                required: true,
                description: 'Email address of the signer',
              },
              {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                required: true,
                description: 'Full name of the signer',
              },
              {
                displayName: 'Routing Order',
                name: 'routingOrder',
                type: 'number',
                default: 2,
                description: 'Order in which this signer receives the envelope',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Additional Documents',
        name: 'additionalDocuments',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        description: 'Add more documents to the envelope',
        options: [
          {
            name: 'documents',
            displayName: 'Document',
            values: [
              {
                displayName: 'Document',
                name: 'document',
                type: 'string',
                default: '',
                required: true,
                description: 'Binary property name or base64-encoded content',
              },
              {
                displayName: 'Document Name',
                name: 'documentName',
                type: 'string',
                default: '',
                required: true,
                description: 'Name of the document file',
              },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // Create From Template Fields
  // ==========================================================================
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['createFromTemplate'],
      },
    },
    default: '',
    description: 'The ID of the template to use',
  },
  {
    displayName: 'Email Subject',
    name: 'emailSubject',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['createFromTemplate'],
      },
    },
    default: '',
    placeholder: 'Please sign this document',
    description: 'Subject line of the email sent to recipients',
  },
  {
    displayName: 'Role Name',
    name: 'roleName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['createFromTemplate'],
      },
    },
    default: 'Signer',
    description: 'The role name defined in the template (e.g., "Signer", "Client")',
  },
  {
    displayName: 'Recipient Email',
    name: 'recipientEmail',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['createFromTemplate'],
      },
    },
    default: '',
    placeholder: 'recipient@example.com',
    description: 'Email address of the recipient',
  },
  {
    displayName: 'Recipient Name',
    name: 'recipientName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['createFromTemplate'],
      },
    },
    default: '',
    placeholder: 'John Doe',
    description: 'Full name of the recipient',
  },

  // ==========================================================================
  // Get Operation Fields
  // ==========================================================================
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['get', 'send', 'void', 'downloadDocument', 'resend', 'getRecipients', 'updateRecipients', 'getAuditEvents', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },

  // ==========================================================================
  // Get All Operation Fields
  // ==========================================================================
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: ENVELOPE_STATUSES.map((status) => ({
          name: status.name,
          value: status.value,
          description: status.description,
        })),
        default: '',
        description: 'Filter by envelope status',
      },
      {
        displayName: 'From Date',
        name: 'fromDate',
        type: 'dateTime',
        default: '',
        description: 'Start date for the date range filter',
      },
      {
        displayName: 'To Date',
        name: 'toDate',
        type: 'dateTime',
        default: '',
        description: 'End date for the date range filter',
      },
      {
        displayName: 'Search Text',
        name: 'searchText',
        type: 'string',
        default: '',
        description: 'Search for envelopes by text in subject or recipient',
      },
    ],
  },

  // ==========================================================================
  // Void Operation Fields
  // ==========================================================================
  {
    displayName: 'Void Reason',
    name: 'voidReason',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['void'],
      },
    },
    default: '',
    placeholder: 'Document no longer needed',
    description: 'Reason for voiding the envelope',
  },

  // ==========================================================================
  // Download Document Fields
  // ==========================================================================
  {
    displayName: 'Document ID',
    name: 'documentId',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['downloadDocument'],
      },
    },
    default: 'combined',
    description:
      'ID of the document to download. Use "combined" for all documents, "certificate" for the certificate of completion, or a specific document ID.',
  },
  {
    displayName: 'Binary Property',
    name: 'binaryPropertyName',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['downloadDocument'],
      },
    },
    default: 'data',
    description: 'Name of the binary property to store the downloaded document',
  },

  // ==========================================================================
  // Resend Operation Fields
  // ==========================================================================
  {
    displayName: 'Resend Reason',
    name: 'resendReason',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['resend'],
      },
    },
    default: '',
    placeholder: 'Reminder to sign the document',
    description: 'Optional reason for resending (included in email)',
  },

  // ==========================================================================
  // Update Recipients Fields
  // ==========================================================================
  {
    displayName: 'Recipient ID',
    name: 'recipientId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['updateRecipients'],
      },
    },
    default: '',
    description: 'The ID of the recipient to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['envelope'],
        operation: ['updateRecipients'],
      },
    },
    options: [
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: 'New email address for the recipient',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the recipient',
      },
    ],
  },
];
