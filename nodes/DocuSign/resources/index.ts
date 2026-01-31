import type { INodeProperties } from 'n8n-workflow';
import { envelopeOperations, envelopeFields } from './envelope';
import { templateOperations, templateFields } from './template';

/**
 * Resource selector for the DocuSign node
 */
export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    {
      name: 'Envelope',
      value: 'envelope',
      description: 'Create, send, and manage signature envelopes',
    },
    {
      name: 'Template',
      value: 'template',
      description: 'Manage and use envelope templates',
    },
  ],
  default: 'envelope',
};

/**
 * All operations for the DocuSign node
 */
export const allOperations: INodeProperties[] = [envelopeOperations, templateOperations];

/**
 * All fields for the DocuSign node
 */
export const allFields: INodeProperties[] = [...envelopeFields, ...templateFields];
