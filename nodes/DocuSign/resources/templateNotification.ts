import type { INodeProperties } from 'n8n-workflow';

/**
 * Template Notification operations — manage default reminder/expiration settings
 */
export const templateNotificationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['templateNotification'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      action: 'Get template notification settings',
      description: 'Get default reminder and expiration settings for a template',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update template notification settings',
      description: 'Update default reminder and expiration settings for a template',
    },
  ],
  default: 'get',
};

/**
 * Template Notification fields
 */
export const templateNotificationFields: INodeProperties[] = [
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateNotification'],
        operation: ['get', 'update'],
      },
    },
    default: '',
    description: 'The ID of the template',
  },
  {
    displayName: 'Use Account Defaults',
    name: 'useAccountDefaults',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['templateNotification'],
        operation: ['update'],
      },
    },
    default: false,
    description: 'Whether to use account-level reminder/expiration defaults',
  },
  {
    displayName: 'Reminder Settings',
    name: 'reminderSettings',
    type: 'collection',
    placeholder: 'Add Reminder Setting',
    default: {},
    displayOptions: {
      show: {
        resource: ['templateNotification'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Enable Reminders',
        name: 'reminderEnabled',
        type: 'boolean',
        default: false,
        description: 'Whether to enable reminder emails',
      },
      {
        displayName: 'Reminder Delay (Days)',
        name: 'reminderDelay',
        type: 'number',
        default: 2,
        typeOptions: { minValue: 1 },
        description: 'Days after sending before first reminder is sent',
      },
      {
        displayName: 'Reminder Frequency (Days)',
        name: 'reminderFrequency',
        type: 'number',
        default: 1,
        typeOptions: { minValue: 1 },
        description: 'Days between subsequent reminders',
      },
    ],
  },
  {
    displayName: 'Expiration Settings',
    name: 'expirationSettings',
    type: 'collection',
    placeholder: 'Add Expiration Setting',
    default: {},
    displayOptions: {
      show: {
        resource: ['templateNotification'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Enable Expiration',
        name: 'expireEnabled',
        type: 'boolean',
        default: false,
        description: 'Whether to enable template expiration',
      },
      {
        displayName: 'Expire After (Days)',
        name: 'expireAfter',
        type: 'number',
        default: 120,
        typeOptions: { minValue: 1 },
        description: 'Number of days until the envelope expires',
      },
      {
        displayName: 'Warn Before Expiry (Days)',
        name: 'expireWarn',
        type: 'number',
        default: 3,
        typeOptions: { minValue: 1 },
        description: 'Days before expiry to warn the sender',
      },
    ],
  },
];
