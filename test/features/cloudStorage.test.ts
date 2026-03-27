import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Cloud Storage', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('listProviders', () => {
    it('should list cloud storage providers', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'cloudStorage',
        operation: 'listProviders',
        params: {},
        apiResponse: { storageProviders: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('listFiles', () => {
    it('should list files for a service', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'cloudStorage',
        operation: 'listFiles',
        params: { serviceId: 'dropbox-123' },
        apiResponse: { items: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty serviceId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'cloudStorage',
        operation: 'listFiles',
        params: { serviceId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should list files with optional folderId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'cloudStorage',
        operation: 'listFiles',
        params: { serviceId: 'svc-1', additionalOptions: { rootFolderId: 'folder-1' } },
        apiResponse: { items: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getFile', () => {
    it('should get a file by serviceId and folderId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'cloudStorage',
        operation: 'getFile',
        params: { serviceId: 'dropbox-123', folderId: 'folder-1' },
        apiResponse: { fileId: 'file-1', name: 'document.pdf' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty folderId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'cloudStorage',
        operation: 'getFile',
        params: { serviceId: 'dropbox-123', folderId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'cloudStorage',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
