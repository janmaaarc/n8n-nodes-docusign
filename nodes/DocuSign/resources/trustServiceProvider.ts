import type { INodeProperties } from 'n8n-workflow';

/**
 * Trust Service Provider operations — list EU eIDAS seal providers
 */
export const trustServiceProviderOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['trustServiceProvider'],
    },
  },
  options: [
    {
      name: 'Get Seal Providers',
      value: 'getSealProviders',
      action: 'Get seal providers',
      description: 'List all available EU eIDAS trust service seal providers',
    },
  ],
  default: 'getSealProviders',
};

/**
 * Trust Service Provider fields
 */
export const trustServiceProviderFields: INodeProperties[] = [];
