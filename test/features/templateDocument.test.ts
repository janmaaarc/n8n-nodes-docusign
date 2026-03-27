import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Template Document', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getAll', () => {
    it('should get all template documents', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateDocument',
        operation: 'getAll',
        params: { templateId: VALID_UUID },
        apiResponse: { templateDocuments: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('get', () => {
    it('should get a template document by ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateDocument',
        operation: 'get',
        params: { templateId: VALID_UUID, documentId: '1' },
        apiResponse: { documentId: '1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid templateId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateDocument',
        operation: 'get',
        params: { templateId: 'not-a-uuid', documentId: '1' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('add', () => {
    it('should add a document to a template', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateDocument',
        operation: 'add',
        params: {
          templateId: VALID_UUID,
          documentName: 'test.pdf',
          documentBase64: 'dGVzdA==',
          fileExtension: 'pdf',
          documentOrder: 1,
        },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty documentName', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateDocument',
        operation: 'add',
        params: {
          templateId: VALID_UUID,
          documentName: '',
          documentBase64: 'dGVzdA==',
          fileExtension: 'pdf',
          documentOrder: 1,
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject invalid base64 content', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateDocument',
        operation: 'add',
        params: {
          templateId: VALID_UUID,
          documentName: 'test.pdf',
          documentBase64: 'not-base64!!!',
          fileExtension: 'pdf',
          documentOrder: 1,
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a document from a template', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateDocument',
        operation: 'remove',
        params: { templateId: VALID_UUID, documentId: '1' },
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
        resource: 'templateDocument',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
