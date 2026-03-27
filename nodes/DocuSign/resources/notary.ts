import type { INodeProperties } from 'n8n-workflow';

/**
 * Notary operations — manage remote online notarization profiles
 */
export const notaryOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['notary'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a notary profile',
      description: 'Create a new notary profile',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get notary profile',
      description: 'Get the current notary profile',
    },
    {
      name: 'Get Jurisdictions',
      value: 'getJurisdictions',
      action: 'Get notary jurisdictions',
      description: 'Get available notary jurisdictions',
    },
  ],
  default: 'get',
};

/**
 * Notary fields
 */
export const notaryFields: INodeProperties[] = [
  {
    displayName: 'First Name',
    name: 'firstName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['notary'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The first name of the notary',
  },
  {
    displayName: 'Last Name',
    name: 'lastName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['notary'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The last name of the notary',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['notary'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The email address of the notary',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['notary'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Commission Number',
        name: 'commissionNumber',
        type: 'string',
        default: '',
        description: 'The notary commission number',
      },
      {
        displayName: 'Commission Expiry',
        name: 'commissionExpiry',
        type: 'dateTime',
        default: '',
        description: 'Commission expiry date',
      },
      {
        displayName: 'County',
        name: 'county',
        type: 'string',
        default: '',
        description: 'The county of the notary',
      },
      {
        displayName: 'State Code',
        name: 'stateCode',
        type: 'string',
        default: '',
        description: 'The state code of the notary (e.g. CA, NY)',
      },
    ],
  },
];
