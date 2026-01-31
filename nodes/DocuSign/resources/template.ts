import type { INodeProperties } from 'n8n-workflow';

/**
 * Template operations available in the DocuSign node
 */
export const templateOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['template'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      action: 'Get a template',
      description: 'Get details of a specific template',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many templates',
      description: 'Get a list of templates',
    },
  ],
  default: 'getAll',
};

/**
 * Template fields for input parameters
 */
export const templateFields: INodeProperties[] = [
  // ==========================================================================
  // Get Operation Fields
  // ==========================================================================
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['get'],
      },
    },
    default: '',
    description: 'The ID of the template to retrieve',
  },

  // ==========================================================================
  // Get All Operation Fields
  // ==========================================================================
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Search Text',
        name: 'searchText',
        type: 'string',
        default: '',
        description: 'Search for templates by name',
      },
      {
        displayName: 'Folder ID',
        name: 'folderId',
        type: 'string',
        default: '',
        description: 'Filter by folder ID',
      },
      {
        displayName: 'Shared By Me',
        name: 'sharedByMe',
        type: 'boolean',
        default: false,
        description: 'Whether to only return templates shared by the current user',
      },
    ],
  },
];
