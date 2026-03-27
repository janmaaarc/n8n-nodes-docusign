import type { INodeProperties } from 'n8n-workflow';

/**
 * Cloud Storage operations — browse connected cloud storage providers and files
 */
export const cloudStorageOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['cloudStorage'],
    },
  },
  options: [
    {
      name: 'Get File',
      value: 'getFile',
      action: 'Get a file from cloud storage',
      description: 'Get a specific file from a cloud storage provider folder',
    },
    {
      name: 'List Files',
      value: 'listFiles',
      action: 'List files in cloud storage folder',
      description: 'List files in a cloud storage provider folder',
    },
    {
      name: 'List Providers',
      value: 'listProviders',
      action: 'List cloud storage providers',
      description: 'List all connected cloud storage providers',
    },
  ],
  default: 'listProviders',
};

/**
 * Cloud Storage fields
 */
export const cloudStorageFields: INodeProperties[] = [
  {
    displayName: 'Service ID',
    name: 'serviceId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['cloudStorage'],
        operation: ['listFiles', 'getFile'],
      },
    },
    default: '',
    description: 'The cloud storage provider service ID',
  },
  {
    displayName: 'Folder ID',
    name: 'folderId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['cloudStorage'],
        operation: ['getFile'],
      },
    },
    default: '',
    description: 'The folder ID in the cloud storage provider',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['cloudStorage'],
        operation: ['listFiles'],
      },
    },
    options: [
      {
        displayName: 'Folder ID',
        name: 'rootFolderId',
        type: 'string',
        default: '',
        description: 'Folder ID to list files from (omit for root)',
      },
    ],
  },
];
