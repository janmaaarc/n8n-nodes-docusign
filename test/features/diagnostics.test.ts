import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Diagnostics', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getSettings', () => {
    it('should get diagnostic settings', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'diagnostics',
        operation: 'getSettings',
        params: {},
        apiResponse: { apiRequestLogging: 'false' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('updateSettings', () => {
    it('should enable API request logging', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'diagnostics',
        operation: 'updateSettings',
        params: { apiRequestLogging: true },
        apiResponse: { apiRequestLogging: 'true' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should disable API request logging', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'diagnostics',
        operation: 'updateSettings',
        params: { apiRequestLogging: false },
        apiResponse: { apiRequestLogging: 'false' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getLog', () => {
    it('should get a specific diagnostic log', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'diagnostics',
        operation: 'getLog',
        params: { requestLogId: 'log-123' },
        apiResponse: { requestLogId: 'log-123' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty requestLogId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'diagnostics',
        operation: 'getLog',
        params: { requestLogId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'diagnostics',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
