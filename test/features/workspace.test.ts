import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Workspace', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create a workspace', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'create',
        params: { workspaceName: 'Test Workspace' },
        apiResponse: { workspaceId: 'ws-123' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty workspaceName', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'create',
        params: { workspaceName: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('should get a workspace by ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'get',
        params: { workspaceId: 'ws-123' },
        apiResponse: { workspaceId: 'ws-123', workspaceName: 'Test Workspace' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty workspaceId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'get',
        params: { workspaceId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should get all workspaces', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'getAll',
        params: {},
        apiResponse: { workspaces: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete a workspace', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'delete',
        params: { workspaceId: 'ws-123' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty workspaceId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'delete',
        params: { workspaceId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('createFile', () => {
    it('should create a file in a workspace folder', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'createFile',
        params: {
          workspaceId: 'ws-123',
          folderId: 'f-1',
          fileName: 'test.pdf',
          fileContent: 'dGVzdA==',
        },
        apiResponse: { fileId: 'file-1', fileName: 'test.pdf' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty fileName', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'createFile',
        params: { workspaceId: 'ws-1', folderId: 'f-1', fileName: '', fileContent: 'dGVzdA==' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('getFiles', () => {
    it('should get files from a workspace folder', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'getFiles',
        params: { workspaceId: 'ws-123', folderId: 'f-1' },
        apiResponse: { files: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty folderId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'getFiles',
        params: { workspaceId: 'ws-1', folderId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'workspace',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
