import type { INodeProperties } from 'n8n-workflow';

/**
 * Workspace operations — manage collaboration workspaces and files
 */
export const workspaceOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['workspace'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a workspace',
      description: 'Create a new collaboration workspace',
    },
    {
      name: 'Create File',
      value: 'createFile',
      action: 'Create a file in workspace',
      description: 'Upload a file to a workspace folder',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a workspace',
      description: 'Delete an existing workspace',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get a workspace',
      description: 'Get details of a specific workspace',
    },
    {
      name: 'Get Files',
      value: 'getFiles',
      action: 'Get files in workspace folder',
      description: 'Get all files in a workspace folder',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many workspaces',
      description: 'Get all workspaces in the account',
    },
  ],
  default: 'getAll',
};

/**
 * Workspace fields
 */
export const workspaceFields: INodeProperties[] = [
  {
    displayName: 'Workspace Name',
    name: 'workspaceName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['workspace'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the workspace',
  },
  {
    displayName: 'Workspace ID',
    name: 'workspaceId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['workspace'],
        operation: ['get', 'delete', 'createFile', 'getFiles'],
      },
    },
    default: '',
    description: 'The ID of the workspace',
  },
  {
    displayName: 'Folder ID',
    name: 'folderId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['workspace'],
        operation: ['createFile', 'getFiles'],
      },
    },
    default: '',
    description: 'The ID of the folder within the workspace',
  },
  {
    displayName: 'File Name',
    name: 'fileName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['workspace'],
        operation: ['createFile'],
      },
    },
    default: '',
    description: 'The name of the file to upload',
  },
  {
    displayName: 'File Content (Base64)',
    name: 'fileContent',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['workspace'],
        operation: ['createFile'],
      },
    },
    default: '',
    description: 'Base64-encoded content of the file',
  },
];
