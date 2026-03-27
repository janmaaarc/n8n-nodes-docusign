import type { INodeProperties } from 'n8n-workflow';

/**
 * Template Document operations — add and manage documents on templates
 */
export const templateDocumentOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['templateDocument'],
    },
  },
  options: [
    {
      name: 'Add',
      value: 'add',
      action: 'Add a document to a template',
      description: 'Add a new document to an existing template',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get a template document',
      description: 'Get a specific document from a template',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many template documents',
      description: 'Get all documents in a template',
    },
    {
      name: 'Remove',
      value: 'remove',
      action: 'Remove a template document',
      description: 'Remove a document from a template',
    },
  ],
  default: 'getAll',
};

/**
 * Template Document fields
 */
export const templateDocumentFields: INodeProperties[] = [
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateDocument'],
        operation: ['get', 'getAll', 'add', 'remove'],
      },
    },
    default: '',
    description: 'The ID of the template',
  },
  {
    displayName: 'Document ID',
    name: 'documentId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateDocument'],
        operation: ['get', 'remove'],
      },
    },
    default: '',
    description: 'The ID of the document within the template',
  },
  {
    displayName: 'Document Name',
    name: 'documentName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateDocument'],
        operation: ['add'],
      },
    },
    default: '',
    description: 'The name of the document',
  },
  {
    displayName: 'Document Content (Base64)',
    name: 'documentBase64',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateDocument'],
        operation: ['add'],
      },
    },
    default: '',
    description: 'Base64-encoded content of the document',
  },
  {
    displayName: 'File Extension',
    name: 'fileExtension',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['templateDocument'],
        operation: ['add'],
      },
    },
    default: 'pdf',
    description: 'The file extension of the document (e.g. pdf, docx)',
  },
  {
    displayName: 'Document Order',
    name: 'documentOrder',
    type: 'number',
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ['templateDocument'],
        operation: ['add'],
      },
    },
    default: 1,
    description: 'The order position of the document in the template',
  },
];
