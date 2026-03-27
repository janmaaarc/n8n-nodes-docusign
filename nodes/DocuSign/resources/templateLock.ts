import type { INodeProperties } from 'n8n-workflow';

/**
 * Template Lock operations — lock and unlock templates for safe editing
 */
export const templateLockOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['templateLock'],
    },
  },
  options: [
    {
      name: 'Lock',
      value: 'create',
      action: 'Lock a template',
      description: 'Lock a template for safe editing',
    },
    {
      name: 'Get Lock',
      value: 'get',
      action: 'Get lock information',
      description: 'Get lock information for a template',
    },
    {
      name: 'Update Lock',
      value: 'update',
      action: 'Update a template lock',
      description: 'Update the duration or properties of an existing lock',
    },
    {
      name: 'Unlock',
      value: 'delete',
      action: 'Unlock a template',
      description: 'Remove lock from a template',
    },
  ],
  default: 'create',
};

/**
 * Template Lock fields
 */
export const templateLockFields: INodeProperties[] = [
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateLock'],
        operation: ['create', 'get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the template to lock or unlock',
  },
  {
    displayName: 'Lock Duration (Seconds)',
    name: 'lockDurationInSeconds',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateLock'],
        operation: ['create'],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1800,
    },
    default: 300,
    description: 'Duration of the lock in seconds (max 1800 = 30 minutes)',
  },
  {
    displayName: 'Locked By App',
    name: 'lockedByApp',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['templateLock'],
        operation: ['create'],
      },
    },
    default: 'n8n',
    description: 'A friendly name of the application holding the lock',
  },
  {
    displayName: 'Lock Token',
    name: 'lockToken',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateLock'],
        operation: ['update', 'delete'],
      },
    },
    default: '',
    description: 'The lock token returned from the Lock operation. Required to update or unlock.',
  },
  {
    displayName: 'Lock Duration (Seconds)',
    name: 'lockDurationInSeconds',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['templateLock'],
        operation: ['update'],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1800,
    },
    default: 300,
    description: 'New duration of the lock in seconds',
  },
];
