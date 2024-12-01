// src/schemas/doctor.ts

import { z } from 'zod';
import { createUpdateUserProfileSchema, userProfileSchema } from '../user-profile';


export const doctorSchema = z.object({
  id: z.string().uuid().optional(),
  user: userProfileSchema,
  specialization: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const doctorListSchema = z.array(doctorSchema);

export type Doctor = z.infer<typeof doctorSchema>;


export const createUpdateDoctorSchema = z.object({
  user: createUpdateUserProfileSchema,
  specialization: z.string().optional(),
});

export type CreateUpdateDoctor = z.infer<typeof createUpdateDoctorSchema>;