import type {
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
  IDataObject,
} from 'n8n-workflow';
import { verifyWebhookSignature } from './helpers';

/**
 * DocuSign Connect webhook events
 */
const WEBHOOK_EVENTS = [
  {
    name: 'Envelope Sent',
    value: 'envelope-sent',
    description: 'Triggered when an envelope is sent',
  },
  {
    name: 'Envelope Delivered',
    value: 'envelope-delivered',
    description: 'Triggered when an envelope is delivered to a recipient',
  },
  {
    name: 'Envelope Completed',
    value: 'envelope-completed',
    description: 'Triggered when all recipients have completed signing',
  },
  {
    name: 'Envelope Declined',
    value: 'envelope-declined',
    description: 'Triggered when a recipient declines to sign',
  },
  {
    name: 'Envelope Voided',
    value: 'envelope-voided',
    description: 'Triggered when an envelope is voided',
  },
  {
    name: 'Recipient Sent',
    value: 'recipient-sent',
    description: 'Triggered when an envelope is sent to a recipient',
  },
  {
    name: 'Recipient Delivered',
    value: 'recipient-delivered',
    description: 'Triggered when a recipient receives the envelope',
  },
  {
    name: 'Recipient Completed',
    value: 'recipient-completed',
    description: 'Triggered when a recipient completes signing',
  },
  {
    name: 'Recipient Declined',
    value: 'recipient-declined',
    description: 'Triggered when a recipient declines to sign',
  },
  {
    name: 'Recipient Authentication Failed',
    value: 'recipient-authenticationfailed',
    description: 'Triggered when a recipient fails authentication',
  },
  {
    name: 'Template Created',
    value: 'template-created',
    description: 'Triggered when a template is created',
  },
  {
    name: 'Template Modified',
    value: 'template-modified',
    description: 'Triggered when a template is modified',
  },
  {
    name: 'Template Deleted',
    value: 'template-deleted',
    description: 'Triggered when a template is deleted',
  },
];

export class DocuSignTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Trigger',
    name: 'docuSignTrigger',
    icon: 'file:docusign.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["events"].join(", ")}}',
    description: 'Receive real-time DocuSign Connect webhook notifications',
    defaults: {
      name: 'DocuSign Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'docuSignApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Events',
        name: 'events',
        type: 'multiOptions',
        options: WEBHOOK_EVENTS,
        default: ['envelope-completed'],
        required: true,
        description: 'The events to listen for. Configure matching events in DocuSign Connect.',
      },
      {
        displayName: 'Verify Signature',
        name: 'verifySignature',
        type: 'boolean',
        default: true,
        description:
          'Whether to verify the webhook signature using the secret from credentials. Recommended for security.',
      },
      {
        displayName: 'Setup Instructions',
        name: 'setupNotice',
        type: 'notice',
        default: '',
        displayOptions: {
          show: {},
        },
        description: `To receive webhooks, configure DocuSign Connect:
1. Go to DocuSign Admin > Integrations > Connect
2. Create a new configuration
3. Set the URL to the webhook URL shown above
4. Enable "Include Documents" if you want document data
5. Select the events matching your selection here
6. If verifying signatures, add an HMAC secret and save it in credentials`,
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject() as { headers: Record<string, string | string[] | undefined> };
    const body = this.getBodyData();
    const verifySignature = this.getNodeParameter('verifySignature', true) as boolean;
    const selectedEvents = this.getNodeParameter('events', []) as string[];

    // Verify webhook signature if enabled
    if (verifySignature) {
      const signature = req.headers['x-docusign-signature-1'] as string | undefined;

      if (!signature) {
        return {
          webhookResponse: {
            status: 401,
            body: { error: 'Missing signature header' },
          },
        };
      }

      try {
        const credentials = await this.getCredentials('docuSignApi');
        const webhookSecret = credentials.webhookSecret as string;

        if (!webhookSecret) {
          return {
            webhookResponse: {
              status: 500,
              body: { error: 'Webhook secret not configured in credentials' },
            },
          };
        }

        const rawBody = JSON.stringify(body);
        const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);

        if (!isValid) {
          return {
            webhookResponse: {
              status: 401,
              body: { error: 'Invalid signature' },
            },
          };
        }
      } catch {
        return {
          webhookResponse: {
            status: 500,
            body: { error: 'Signature verification failed' },
          },
        };
      }
    }

    // Extract event type from the payload
    const eventType = (body.event as string) || '';

    // Filter by selected events (if not matching, still accept but don't trigger)
    if (selectedEvents.length > 0 && !selectedEvents.includes(eventType)) {
      // Accept the webhook but don't trigger the workflow
      return {
        webhookResponse: {
          status: 200,
          body: { received: true, filtered: true },
        },
      };
    }

    // Extract envelope data
    const envelopeData = body.data as IDataObject || {};
    const envelopeSummary = (envelopeData.envelopeSummary || envelopeData) as IDataObject;

    // Extract sender info with proper typing
    const sender = envelopeSummary.sender as IDataObject | undefined;

    // Build output
    const output: IDataObject = {
      event: eventType,
      timestamp: new Date().toISOString(),
      envelopeId: envelopeSummary.envelopeId || body.envelopeId,
      status: envelopeSummary.status || body.status,
      emailSubject: envelopeSummary.emailSubject || body.emailSubject,
      senderEmail: sender?.email,
      senderName: sender?.userName,
      recipients: envelopeSummary.recipients,
      documents: envelopeSummary.documents,
      rawPayload: body,
    };

    return {
      workflowData: [
        [
          {
            json: output,
          },
        ],
      ],
    };
  }
}
