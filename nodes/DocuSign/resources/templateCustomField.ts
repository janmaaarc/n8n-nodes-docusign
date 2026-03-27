import type { INodeProperties } from 'n8n-workflow';

/**
 * Template Custom Field operations — manage custom metadata fields on templates
 */
export const templateCustomFieldOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['templateCustomField'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a template custom field',
      description: 'Add a custom metadata field to a template',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a template custom field',
      description: 'Remove a custom field from a template',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get template custom fields',
      description: 'Get all custom fields on a template',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a template custom field',
      description: 'Update a custom field on a template',
    },
  ],
  default: 'get',
};

/**
 * Template Custom Field fields
 */
export const templateCustomFieldFields: INodeProperties[] = [
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateCustomField'],
        operation: ['create', 'get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the template',
  },
  {
    displayName: 'Field Name',
    name: 'fieldName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateCustomField'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the custom field',
  },
  {
    displayName: 'Field Value',
    name: 'fieldValue',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateCustomField'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The value of the custom field',
  },
  {
    displayName: 'Show in UI',
    name: 'show',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['templateCustomField'],
        operation: ['create'],
      },
    },
    default: true,
    description: 'Whether the field is visible in the DocuSign UI',
  },
  {
    displayName: 'Required',
    name: 'required',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['templateCustomField'],
        operation: ['create'],
      },
    },
    default: false,
    description: 'Whether the field is required',
  },
  {
    displayName: 'Field ID',
    name: 'fieldId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateCustomField'],
        operation: ['update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the custom field to update or delete',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['templateCustomField'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Field Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the custom field',
      },
      {
        displayName: 'Field Value',
        name: 'value',
        type: 'string',
        default: '',
        description: 'New value for the custom field',
      },
      {
        displayName: 'Show in UI',
        name: 'show',
        type: 'boolean',
        default: true,
        description: 'Whether the field is visible in the DocuSign UI',
      },
    ],
  },
];
