import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Template Custom Field', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create a template custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'create',
        params: {
          templateId: VALID_UUID,
          fieldName: 'OrderNum',
          fieldValue: 'ORD-1',
          show: true,
          required: false,
        },
        apiResponse: { fieldId: '1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty fieldName', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'create',
        params: {
          templateId: VALID_UUID,
          fieldName: '',
          fieldValue: 'ORD-1',
          show: true,
          required: false,
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject invalid templateId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'create',
        params: {
          templateId: 'not-uuid',
          fieldName: 'OrderNum',
          fieldValue: 'ORD-1',
          show: true,
          required: false,
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('should get template custom fields', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'get',
        params: { templateId: VALID_UUID },
        apiResponse: { textCustomFields: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update a template custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'update',
        params: {
          templateId: VALID_UUID,
          fieldId: 'f1',
          updateFields: { name: 'NewName', value: 'NewVal' },
        },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty updateFields', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'update',
        params: {
          templateId: VALID_UUID,
          fieldId: 'f1',
          updateFields: {},
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('At least one update field');
    });
  });

  describe('delete', () => {
    it('should delete a template custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'delete',
        params: { templateId: VALID_UUID, fieldId: 'f1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty fieldId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'delete',
        params: { templateId: VALID_UUID, fieldId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'templateCustomField',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
