import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Template Lock', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create a template lock', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateLock',
        operation: 'create',
        params: {
          templateId: VALID_UUID,
          lockDurationInSeconds: 300,
          lockedByApp: 'n8n',
        },
        apiResponse: { lockToken: 'tok-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid templateId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateLock',
        operation: 'create',
        params: {
          templateId: 'not-a-uuid',
          lockDurationInSeconds: 300,
          lockedByApp: 'n8n',
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('should get a template lock', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateLock',
        operation: 'get',
        params: { templateId: VALID_UUID },
        apiResponse: { lockToken: 'tok-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update a template lock', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateLock',
        operation: 'update',
        params: {
          templateId: VALID_UUID,
          lockToken: 'tok-1',
          lockDurationInSeconds: 600,
        },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty lockToken', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateLock',
        operation: 'update',
        params: {
          templateId: VALID_UUID,
          lockToken: '',
          lockDurationInSeconds: 600,
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a template lock', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateLock',
        operation: 'delete',
        params: {
          templateId: VALID_UUID,
          lockToken: 'tok-1',
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
        resource: 'templateLock',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
