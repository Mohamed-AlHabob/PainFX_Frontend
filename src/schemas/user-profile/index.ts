// src/schemas/userProfile.ts

import { z } from 'zod';

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').nullable().optional(),
  html_content: z.string().optional(),
  json_content: z.record(z.any()).nullable().optional(),
  avatar: z.string().url().nullable().optional(),
  geolocation: z
    .tuple([
      z.number().min(-90).max(90), // Latitude range: -90 to 90
      z.number().min(-180).max(180), // Longitude range: -180 to 180
    ])
    .nullable()
    .optional(),
});

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email('Invalid email address'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profile: ProfileSchema,
  date_joined: z.string().datetime().optional(),
  last_login: z.string().datetime().optional(),
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
