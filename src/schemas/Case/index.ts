import { z } from 'zod';

// Case List Schema
export const caseListSchema = z.array(z.object({
  id: z.string(),
  caseName: z.string().max(255).optional(),
  description: z.string().optional().nullable(),
  status: z.enum(['open', 'closed', 'in_progress']),
  lawyerId: z.string().optional().nullable(), // Reference to the Lawyer
  clientId: z.string().optional().nullable(), // Reference to the Client
  priority: z.enum(['high', 'medium', 'low']),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
}));

// Create/Update Case Schema
export const createUpdateCaseSchema = z.object({
  caseName: z.string().max(255),
  description: z.string().optional().nullable(),
  status: z.enum(['open', 'closed', 'in_progress']),
  lawyerId: z.number().int().optional().nullable(),
  clientId: z.number().int().optional().nullable(),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
});

// Define the schema for an individual case request
const caseRequestSchema = z.object({
  id: z.string(), // Change to z.number() if IDs are integers
  client: z.object({
    id: z.string().optional(),
    user : z.object({
      id: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      email : z.string().optional(),
      role : z.string().optional(),
      phone_number : z.string().optional(),
      avatar: z.string().optional(),
      date_joined: z.string().refine((date) => !isNaN(Date.parse(date))).optional(),
    }),
    phone_number : z.string().optional(),
    address : z.string().optional(),
    avatar: z.string().optional(),
  }),
  lawyer: z.string(), // Add as object if lawyer has more properties
  request_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  slot: z.string().max(255),
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
  createdAt: z.string().optional().refine(
    (date) => !date || !isNaN(Date.parse(date)),
    { message: "Invalid createdAt date format" }
  ),
  updatedAt: z.string().optional().refine(
    (date) => !date || !isNaN(Date.parse(date)),
    { message: "Invalid updatedAt date format" }
  ),
});

// Define the schema for the list of case requests
export const caseRequestListSchema = z.array(caseRequestSchema);
export type CaseRequest = z.infer<typeof caseRequestSchema>;


// Define the schema for creating or updating a case request
export const createUpdateCaseRequestSchema = z.object({
  client: z.string().nonempty({ message: "Client ID is required" }), // ID of the client
  lawyer: z.string().nonempty({ message: "Lawyer ID is required" }), // ID of the lawyer
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']), // Status is optional on create
});