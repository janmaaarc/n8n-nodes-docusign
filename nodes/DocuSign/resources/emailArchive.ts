import type { INodeProperties } from 'n8n-workflow';

/**
 * Email Archive operations — manage BCC compliance email archive addresses
 */
export const emailArchiveOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['emailArchive'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create an email archive',
      description: 'Add an email address to the BCC compliance archive',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete an email archive',
      description: 'Remove an email address from the BCC archive',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many email archives',
      description: 'List all email archive addresses',
    },
  ],
  default: 'getAll',
};

/**
 * Email Archive fields
 */
export const emailArchiveFields: INodeProperties[] = [
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['emailArchive'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'Email address to add to the BCC compliance archive',
  },
  {
    displayName: 'BCC Archive ID',
    name: 'bccEmailArchiveId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['emailArchive'],
        operation: ['delete'],
      },
    },
    default: '',
    description: 'The ID of the BCC email archive entry to delete',
  },
];
