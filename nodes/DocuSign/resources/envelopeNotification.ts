import type { INodeProperties } from 'n8n-workflow';

/**
 * Envelope Notification operations — manage reminder and expiration settings
 */
export const envelopeNotificationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['envelopeNotification'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      action: 'Get envelope notification settings',
      description: 'Get reminder and expiration settings for an envelope',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update envelope notification settings',
      description: 'Update reminder and expiration settings for an envelope',
    },
  ],
  default: 'get',
};

/**
 * Envelope Notification fields
 */
export const envelopeNotificationFields: INodeProperties[] = [
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeNotification'],
        operation: ['get', 'update'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },
  {
    displayName: 'Use Account Defaults',
    name: 'useAccountDefaults',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['envelopeNotification'],
        operation: ['update'],
      },
    },
    default: false,
    description:
      'Whether to use account-level reminder/expiration defaults instead of custom values',
  },
  {
    displayName: 'Reminder Settings',
    name: 'reminderSettings',
    type: 'collection',
    placeholder: 'Add Reminder Setting',
    default: {},
    displayOptions: {
      show: {
        resource: ['envelopeNotification'],
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
        resource: ['envelopeNotification'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Enable Expiration',
        name: 'expireEnabled',
        type: 'boolean',
        default: false,
        description: 'Whether to enable envelope expiration',
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
