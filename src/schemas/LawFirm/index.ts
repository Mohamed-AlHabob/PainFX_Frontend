import { z } from 'zod';

// Law Firm List Schema
export const lawFirmListSchema = z.array(z.object({
  id: z.number().int(),
  name: z.string().max(255),
  address: z.string().max(500).optional().nullable(),
  contactEmail: z.string().email(),
  phoneNumber: z.string().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}));

// Create/Update Law Firm Schema
export const createUpdateLawFirmSchema = z.object({
  name: z.string().max(255),
  address: z.string().max(500).optional().nullable(),
  contactEmail: z.string().email(),
  phoneNumber: z.string().optional().nullable(),
});



