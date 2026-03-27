import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_EMAIL } from '../setup/constants';

describe('Email Archive', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create an email archive entry', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'emailArchive',
        operation: 'create',
        params: { email: VALID_EMAIL },
        apiResponse: { bccEmailArchiveId: 'arch-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid email', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'emailArchive',
        operation: 'create',
        params: { email: 'not-an-email' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should get all email archive entries', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'emailArchive',
        operation: 'getAll',
        params: {},
        apiResponse: { bccEmailArchiveList: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete an email archive entry', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'emailArchive',
        operation: 'delete',
        params: { bccEmailArchiveId: 'arch-1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty bccEmailArchiveId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'emailArchive',
        operation: 'delete',
        params: { bccEmailArchiveId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'emailArchive',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
