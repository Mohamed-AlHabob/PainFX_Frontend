import { z } from 'zod';

// Document List Schema
export const documentListSchema = z.array(z.object({
  id: z.number().int(),
  caseId: z.number().int(), // Reference to the Case
  title: z.string().max(255),
  file: z.string().url(), // Assuming files can be accessed via a URL
  uploadedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}));

// Create/Update Document Schema
export const createUpdateDocumentSchema = z.object({
  caseId: z.string(),
  title: z.string().max(255),
  file: z.instanceof(Blob),
});


