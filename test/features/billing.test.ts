import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Billing', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getPlan', () => {
    it('should get the billing plan', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'getPlan',
        apiResponse: { planId: 'plan-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getAllInvoices', () => {
    it('should get all invoices', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'getAllInvoices',
        apiResponse: { billingInvoices: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getInvoice', () => {
    it('should get an invoice by ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'getInvoice',
        params: { invoiceId: 'inv-1' },
        apiResponse: { invoiceId: 'inv-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty invoiceId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'getInvoice',
        params: { invoiceId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('getAllPayments', () => {
    it('should get all payments', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'getAllPayments',
        apiResponse: { billingPayments: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getPayment', () => {
    it('should get a payment by ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'getPayment',
        params: { paymentId: 'pay-1' },
        apiResponse: { paymentId: 'pay-1' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty paymentId', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'getPayment',
        params: { paymentId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'billing',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
