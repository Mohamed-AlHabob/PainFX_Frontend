// src/schemas/userProfile.ts

import { z } from 'zod';
export const userProfileSchema = z.object({
  id: z.number().int(),
  email: z.string().email('Invalid email address'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const userProfileListSchema = z.array(userProfileSchema);

export const createUpdateUserProfileSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
export type CreateUpdateUserProfile = z.infer<typeof createUpdateUserProfileSchema>;
