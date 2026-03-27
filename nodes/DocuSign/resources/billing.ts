import type { INodeProperties } from 'n8n-workflow';

/**
 * Billing operations — view billing plan, invoices, and payments
 */
export const billingOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['billing'],
    },
  },
  options: [
    {
      name: 'Get Invoice',
      value: 'getInvoice',
      action: 'Get a billing invoice',
      description: 'Get a specific billing invoice',
    },
    {
      name: 'Get Many Invoices',
      value: 'getAllInvoices',
      action: 'Get many billing invoices',
      description: 'Get all billing invoices',
    },
    {
      name: 'Get Many Payments',
      value: 'getAllPayments',
      action: 'Get many billing payments',
      description: 'Get all billing payments',
    },
    {
      name: 'Get Payment',
      value: 'getPayment',
      action: 'Get a billing payment',
      description: 'Get a specific billing payment',
    },
    {
      name: 'Get Plan',
      value: 'getPlan',
      action: 'Get billing plan',
      description: 'Get the current billing plan for the account',
    },
  ],
  default: 'getPlan',
};

/**
 * Billing fields
 */
export const billingFields: INodeProperties[] = [
  {
    displayName: 'Invoice ID',
    name: 'invoiceId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['billing'],
        operation: ['getInvoice'],
      },
    },
    default: '',
    description: 'The ID of the billing invoice',
  },
  {
    displayName: 'Payment ID',
    name: 'paymentId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['billing'],
        operation: ['getPayment'],
      },
    },
    default: '',
    description: 'The ID of the billing payment',
  },
];
