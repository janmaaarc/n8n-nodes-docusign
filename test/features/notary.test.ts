import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_EMAIL } from '../setup/constants';

describe('Notary', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('get', () => {
    it('should get notary information', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'notary',
        operation: 'get',
        params: {},
        apiResponse: { notaryId: 'n-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getJurisdictions', () => {
    it('should get notary jurisdictions', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'notary',
        operation: 'getJurisdictions',
        params: {},
        apiResponse: { jurisdictions: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('create', () => {
    it('should create a notary', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'notary',
        operation: 'create',
        params: {
          firstName: 'John',
          lastName: 'Doe',
          email: VALID_EMAIL,
          additionalFields: {},
        },
        apiResponse: { notaryId: 'n-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid email', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'notary',
        operation: 'create',
        params: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'bad-email',
          additionalFields: {},
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject empty firstName', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'notary',
        operation: 'create',
        params: {
          firstName: '',
          lastName: 'Doe',
          email: VALID_EMAIL,
          additionalFields: {},
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject empty lastName', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'notary',
        operation: 'create',
        params: { firstName: 'John', lastName: '', email: 'test@example.com' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'notary',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
