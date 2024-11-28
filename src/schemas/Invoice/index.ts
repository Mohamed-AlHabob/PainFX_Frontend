import { z } from 'zod';

// Invoice List Schema
export const invoiceListSchema = z.array(z.object({
  id: z.number().int(),
  lawyerId: z.number().int(), // Reference to the Lawyer
  amount: z.number().min(0), // Non-negative amount
  issueDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  status: z.enum(['paid', 'unpaid', 'overdue']),
  description: z.string().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}));

// Create/Update Invoice Schema
export const createUpdateInvoiceSchema = z.object({
  lawyerId: z.number().int(),
  amount: z.number().min(0),
  issueDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  status: z.enum(['paid', 'unpaid', 'overdue']),
  description: z.string().optional().nullable(),
});
