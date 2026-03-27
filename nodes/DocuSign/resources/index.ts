import type { INodeProperties } from 'n8n-workflow';
import { accountCustomFieldOperations, accountCustomFieldFields } from './accountCustomField';
import { accountGroupOperations, accountGroupFields } from './accountGroup';
import { accountUserOperations, accountUserFields } from './accountUser';
import { billingOperations, billingFields } from './billing';
import { brandOperations, brandFields } from './brand';
import { bulkSendOperations, bulkSendFields } from './bulkSend';
import { chunkedUploadOperations, chunkedUploadFields } from './chunkedUpload';
import { cloudStorageOperations, cloudStorageFields } from './cloudStorage';
import { commentsOperations, commentsFields } from './comments';
import { compositeTemplateOperations, compositeTemplateFields } from './compositeTemplate';
import { connectConfigOperations, connectConfigFields } from './connectConfig';
import { connectEventOperations, connectEventFields } from './connectEvent';
import { contactOperations, contactFields } from './contact';
import { customTabOperations, customTabFields } from './customTab';
import { diagnosticsOperations, diagnosticsFields } from './diagnostics';
import { documentGenerationOperations, documentGenerationFields } from './documentGeneration';
import { emailArchiveOperations, emailArchiveFields } from './emailArchive';
import { envelopeOperations, envelopeFields } from './envelope';
import { envelopeAttachmentOperations, envelopeAttachmentFields } from './envelopeAttachment';
import {
  envelopeCustomFieldOperations,
  envelopeCustomFieldFields,
} from './envelopeCustomField';
import {
  envelopeDocumentFieldOperations,
  envelopeDocumentFieldFields,
} from './envelopeDocumentField';
import {
  envelopeEmailSettingOperations,
  envelopeEmailSettingFields,
} from './envelopeEmailSetting';
import { envelopeLockOperations, envelopeLockFields } from './envelopeLock';
import {
  envelopeNotificationOperations,
  envelopeNotificationFields,
} from './envelopeNotification';
import { envelopeTransferOperations, envelopeTransferFields } from './envelopeTransfer';
import { folderOperations, folderFields } from './folder';
import { idVerificationOperations, idVerificationFields } from './idVerification';
import { notaryOperations, notaryFields } from './notary';
import { paymentTabOperations, paymentTabFields } from './paymentTab';
import { permissionProfileOperations, permissionProfileFields } from './permissionProfile';
import { powerFormOperations, powerFormFields } from './powerForm';
import { recipientTabsOperations, recipientTabsFields } from './recipientTabs';
import { scheduledRoutingOperations, scheduledRoutingFields } from './scheduledRouting';
import { signingGroupOperations, signingGroupFields } from './signingGroup';
import { supplementalDocOperations, supplementalDocFields } from './supplementalDoc';
import { templateOperations, templateFields } from './template';
import {
  templateCustomFieldOperations,
  templateCustomFieldFields,
} from './templateCustomField';
import { templateDocumentOperations, templateDocumentFields } from './templateDocument';
import { templateLockOperations, templateLockFields } from './templateLock';
import {
  templateNotificationOperations,
  templateNotificationFields,
} from './templateNotification';
import { templateRecipientsOperations, templateRecipientsFields } from './templateRecipients';
import {
  trustServiceProviderOperations,
  trustServiceProviderFields,
} from './trustServiceProvider';
import { workspaceOperations, workspaceFields } from './workspace';

/**
 * Resource selector for the DocuSign node
 */
export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    {
      name: 'Account Custom Field',
      value: 'accountCustomField',
      description: 'Manage account-level custom field definitions',
    },
    {
      name: 'Account Group',
      value: 'accountGroup',
      description: 'Manage account permission groups',
    },
    {
      name: 'Account User',
      value: 'accountUser',
      description: 'Manage users in the DocuSign account',
    },
    {
      name: 'Billing',
      value: 'billing',
      description: 'View billing plan, invoices, and payments',
    },
    {
      name: 'Brand',
      value: 'brand',
      description: 'Create, get, update, and delete account branding',
    },
    {
      name: 'Bulk Send',
      value: 'bulkSend',
      description: 'Create bulk send lists and send envelopes in bulk',
    },
    {
      name: 'Chunked Upload',
      value: 'chunkedUpload',
      description: 'Upload large documents in chunks',
    },
    {
      name: 'Cloud Storage',
      value: 'cloudStorage',
      description: 'Browse cloud storage providers and files',
    },
    {
      name: 'Comments',
      value: 'comments',
      description: 'Add and retrieve comments on envelopes',
    },
    {
      name: 'Composite Template',
      value: 'compositeTemplate',
      description: 'Create envelopes combining multiple server templates',
    },
    {
      name: 'Connect Configuration',
      value: 'connectConfig',
      description: 'Manage DocuSign Connect webhook configurations',
    },
    {
      name: 'Connect Event',
      value: 'connectEvent',
      description: 'Monitor and retry Connect webhook deliveries',
    },
    {
      name: 'Contact',
      value: 'contact',
      description: 'Manage contacts in the DocuSign address book',
    },
    {
      name: 'Custom Tab',
      value: 'customTab',
      description: 'Manage reusable custom tab (field) definitions',
    },
    {
      name: 'Diagnostics',
      value: 'diagnostics',
      description: 'Manage API request logging settings',
    },
    {
      name: 'Document Generation',
      value: 'documentGeneration',
      description: 'Generate documents from templates with dynamic data fields',
    },
    {
      name: 'Email Archive',
      value: 'emailArchive',
      description: 'Manage BCC compliance email archive addresses',
    },
    {
      name: 'Envelope',
      value: 'envelope',
      description: 'Create, send, and manage signature envelopes',
    },
    {
      name: 'Envelope Attachment',
      value: 'envelopeAttachment',
      description: 'Manage file attachments on envelopes',
    },
    {
      name: 'Envelope Custom Field',
      value: 'envelopeCustomField',
      description: 'Manage custom metadata fields on envelopes',
    },
    {
      name: 'Envelope Document Field',
      value: 'envelopeDocumentField',
      description: 'Manage custom fields on individual documents in envelopes',
    },
    {
      name: 'Envelope Email Setting',
      value: 'envelopeEmailSetting',
      description: 'Override email settings per envelope',
    },
    {
      name: 'Envelope Lock',
      value: 'envelopeLock',
      description: 'Lock and unlock envelopes for safe editing',
    },
    {
      name: 'Envelope Notification',
      value: 'envelopeNotification',
      description: 'Manage reminder and expiration settings on envelopes',
    },
    {
      name: 'Envelope Transfer',
      value: 'envelopeTransfer',
      description: 'Manage envelope ownership transfer rules',
    },
    {
      name: 'Folder',
      value: 'folder',
      description: 'List folders and move envelopes between folders',
    },
    {
      name: 'ID Verification',
      value: 'idVerification',
      description: 'Get available identity verification workflows',
    },
    {
      name: 'Notary',
      value: 'notary',
      description: 'Manage remote online notarization profiles',
    },
    {
      name: 'Payment Tab',
      value: 'paymentTab',
      description: 'Create envelopes with payment collection',
    },
    {
      name: 'Permission Profile',
      value: 'permissionProfile',
      description: 'Manage permission profiles for account users',
    },
    {
      name: 'PowerForm',
      value: 'powerForm',
      description: 'Create and manage self-service signing forms',
    },
    {
      name: 'Recipient Tabs',
      value: 'recipientTabs',
      description: 'Get and update recipient tabs on envelopes',
    },
    {
      name: 'Scheduled Routing',
      value: 'scheduledRouting',
      description: 'Schedule envelope delivery for a future date',
    },
    {
      name: 'Signing Group',
      value: 'signingGroup',
      description: 'Manage groups where any member can sign on behalf of the group',
    },
    {
      name: 'Supplemental Document',
      value: 'supplementalDoc',
      description: 'Add supplemental documents like terms & conditions to envelopes',
    },
    {
      name: 'Template',
      value: 'template',
      description: 'Create, update, delete, and use envelope templates',
    },
    {
      name: 'Template Custom Field',
      value: 'templateCustomField',
      description: 'Manage custom metadata fields on templates',
    },
    {
      name: 'Template Document',
      value: 'templateDocument',
      description: 'Add and manage documents on templates',
    },
    {
      name: 'Template Lock',
      value: 'templateLock',
      description: 'Lock and unlock templates for safe editing',
    },
    {
      name: 'Template Notification',
      value: 'templateNotification',
      description: 'Manage default reminder/expiration settings on templates',
    },
    {
      name: 'Template Recipients',
      value: 'templateRecipients',
      description: 'Manage recipient roles on templates',
    },
    {
      name: 'Trust Service Provider',
      value: 'trustServiceProvider',
      description: 'List EU eIDAS seal providers',
    },
    {
      name: 'Workspace',
      value: 'workspace',
      description: 'Manage collaboration workspaces and files',
    },
  ],
  default: 'envelope',
};

/**
 * All operations for the DocuSign node
 */
export const allOperations: INodeProperties[] = [
  accountCustomFieldOperations,
  accountGroupOperations,
  accountUserOperations,
  billingOperations,
  brandOperations,
  bulkSendOperations,
  chunkedUploadOperations,
  cloudStorageOperations,
  commentsOperations,
  compositeTemplateOperations,
  connectConfigOperations,
  connectEventOperations,
  contactOperations,
  customTabOperations,
  diagnosticsOperations,
  documentGenerationOperations,
  emailArchiveOperations,
  envelopeOperations,
  envelopeAttachmentOperations,
  envelopeCustomFieldOperations,
  envelopeDocumentFieldOperations,
  envelopeEmailSettingOperations,
  envelopeLockOperations,
  envelopeNotificationOperations,
  envelopeTransferOperations,
  folderOperations,
  idVerificationOperations,
  notaryOperations,
  paymentTabOperations,
  permissionProfileOperations,
  powerFormOperations,
  recipientTabsOperations,
  scheduledRoutingOperations,
  signingGroupOperations,
  supplementalDocOperations,
  templateOperations,
  templateCustomFieldOperations,
  templateDocumentOperations,
  templateLockOperations,
  templateNotificationOperations,
  templateRecipientsOperations,
  trustServiceProviderOperations,
  workspaceOperations,
];

/**
 * All fields for the DocuSign node
 */
export const allFields: INodeProperties[] = [
  ...accountCustomFieldFields,
  ...accountGroupFields,
  ...accountUserFields,
  ...billingFields,
  ...brandFields,
  ...bulkSendFields,
  ...chunkedUploadFields,
  ...cloudStorageFields,
  ...commentsFields,
  ...compositeTemplateFields,
  ...connectConfigFields,
  ...connectEventFields,
  ...contactFields,
  ...customTabFields,
  ...diagnosticsFields,
  ...documentGenerationFields,
  ...emailArchiveFields,
  ...envelopeFields,
  ...envelopeAttachmentFields,
  ...envelopeCustomFieldFields,
  ...envelopeDocumentFieldFields,
  ...envelopeEmailSettingFields,
  ...envelopeLockFields,
  ...envelopeNotificationFields,
  ...envelopeTransferFields,
  ...folderFields,
  ...idVerificationFields,
  ...notaryFields,
  ...paymentTabFields,
  ...permissionProfileFields,
  ...powerFormFields,
  ...recipientTabsFields,
  ...scheduledRoutingFields,
  ...signingGroupFields,
  ...supplementalDocFields,
  ...templateFields,
  ...templateCustomFieldFields,
  ...templateDocumentFields,
  ...templateLockFields,
  ...templateNotificationFields,
  ...templateRecipientsFields,
  ...trustServiceProviderFields,
  ...workspaceFields,
];
