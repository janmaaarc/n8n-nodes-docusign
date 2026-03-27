import type { INodeProperties } from 'n8n-workflow';

/**
 * Diagnostics operations — manage API request logging settings
 */
export const diagnosticsOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['diagnostics'],
    },
  },
  options: [
    {
      name: 'Get Log',
      value: 'getLog',
      action: 'Get a request log entry',
      description: 'Get a specific API request log entry',
    },
    {
      name: 'Get Settings',
      value: 'getSettings',
      action: 'Get diagnostics settings',
      description: 'Get the current API request logging settings',
    },
    {
      name: 'Update Settings',
      value: 'updateSettings',
      action: 'Update diagnostics settings',
      description: 'Enable or disable API request logging',
    },
  ],
  default: 'getSettings',
};

/**
 * Diagnostics fields
 */
export const diagnosticsFields: INodeProperties[] = [
  {
    displayName: 'API Request Logging',
    name: 'apiRequestLogging',
    type: 'boolean',
    required: true,
    displayOptions: {
      show: {
        resource: ['diagnostics'],
        operation: ['updateSettings'],
      },
    },
    default: false,
    description: 'Whether to enable API request logging for this account',
  },
  {
    displayName: 'Request Log ID',
    name: 'requestLogId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['diagnostics'],
        operation: ['getLog'],
      },
    },
    default: '',
    description: 'The ID of the request log entry to retrieve',
  },
];
