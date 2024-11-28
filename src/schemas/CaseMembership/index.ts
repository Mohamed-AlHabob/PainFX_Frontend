import { z } from 'zod';

export const createUpdateCaseMembershipSchema = z.object({
  userId: z.string().uuid(), // UUID of the user
  caseId: z.string().uuid(), // UUID of the case
  role: z.enum(['admin', 'partner', 'associate', 'staff']), // Role of the user in the case
  permissions: z.object({
    // Define your permissions structure here, e.g.,
    view: z.boolean().optional(),
    edit: z.boolean().optional(),
    delete: z.boolean().optional(),
    // Add other permission fields as needed
  }).optional().default({}), // Default to an empty permissions object if not provided
});


export const caseMembershipSchema = z.object({
    id: z.string().uuid(), // UUID of the case membership
    userId: z.string().uuid(), // UUID of the user
    caseId: z.string().uuid(), // UUID of the case
    role: z.enum(['admin', 'partner', 'associate', 'staff']), // Role of the user in the case
    permissions: z.object({
      view: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean(),
    }), // Define permissions fields as required
  });
  
  export const caseMembershipListSchema = z.array(caseMembershipSchema);