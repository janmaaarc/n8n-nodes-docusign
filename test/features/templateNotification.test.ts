import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Template Notification', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('get', () => {
    it('should get template notification settings', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateNotification',
        operation: 'get',
        params: { templateId: VALID_UUID },
        apiResponse: { useAccountDefaults: 'false' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid templateId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateNotification',
        operation: 'get',
        params: { templateId: 'not-a-uuid' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update with reminder settings', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateNotification',
        operation: 'update',
        params: {
          templateId: VALID_UUID,
          useAccountDefaults: false,
          reminderSettings: {
            reminderEnabled: true,
            reminderDelay: 2,
            reminderFrequency: 1,
          },
          expirationSettings: {},
        },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should update with expiration settings', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateNotification',
        operation: 'update',
        params: {
          templateId: VALID_UUID,
          useAccountDefaults: false,
          reminderSettings: {},
          expirationSettings: {
            expireEnabled: true,
            expireAfter: 120,
            expireWarn: 3,
          },
        },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateNotification',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
