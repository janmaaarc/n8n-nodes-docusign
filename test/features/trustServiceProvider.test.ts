import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Trust Service Provider', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getSealProviders', () => {
    it('should get seal providers', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'trustServiceProvider',
        operation: 'getSealProviders',
        params: {},
        apiResponse: { sealProviders: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'trustServiceProvider',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
