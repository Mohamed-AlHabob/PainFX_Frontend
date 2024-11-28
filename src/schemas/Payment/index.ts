import { z } from 'zod';

// Payment Method and Status Choices
const PaymentMethod = z.enum(['credit_card', 'bank_transfer', 'paypal']);
const PaymentStatus = z.enum(['successful', 'failed']);

// Payment Schema
export const PaymentSchema = z.object({
  id: z.number().int(), // Primary key
  invoiceId: z.number().int(), // Foreign key to Invoice
  amount: z.number().positive().max(1000000), // Ensure valid payment amount
  paymentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  paymentMethod: PaymentMethod,
  status: PaymentStatus,
});

// TypeScript Type
export type Payment = z.infer<typeof PaymentSchema>;

