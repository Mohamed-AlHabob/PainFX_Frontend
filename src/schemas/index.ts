import { z } from 'zod';

// Invoice Status Choices
const InvoiceStatus = z.enum(['paid', 'unpaid', 'overdue']);

// Invoice Schema
export const InvoiceSchema = z.object({
  id: z.number().int(), // Primary key
  lawyerId: z.number().int(), // Foreign key to Lawyer
  amount: z.number().positive().max(1000000), // Decimal field (Max 1M for example)
  issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  status: InvoiceStatus,
  description: z.string().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// TypeScript Type
export type Invoice = z.infer<typeof InvoiceSchema>;


// Case Status and Priority Choices
const CaseStatus = z.enum(['open', 'closed', 'in_progress']);
const CasePriority = z.enum(['high', 'medium', 'low']);

// Case Schema
export const CaseSchema = z.object({
  id: z.number().int(), // Primary key
  caseName: z.string().max(255),
  description: z.string().optional().nullable(),
  status: CaseStatus,
  lawyerId: z.number().int().nullable(), // Foreign key to Lawyer, can be null
  clientId: z.number().int().nullable(), // Foreign key to Client, can be null
  priority: CasePriority.default('medium'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// TypeScript Type
export type Case = z.infer<typeof CaseSchema>;

// Custom Validator for File Size (5 MB max)
const validateFileSize = (size: number) => size <= 5 * 1024 * 1024;

// Document Schema
export const DocumentSchema = z.object({
  id: z.number().int(), // Primary key
  caseId: z.number().int(), // Foreign key to Case
  title: z.string().max(255),
  file: z.object({
    name: z.string().regex(/\.(pdf|docx|doc)$/i, "Unsupported file type"),
    size: z.number().refine(validateFileSize, "File size must be under 5 MB"),
  }),
  uploadedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// TypeScript Type
export type Document = z.infer<typeof DocumentSchema>;


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
