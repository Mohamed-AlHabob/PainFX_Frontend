// src/schemas/patient.ts

import { z } from 'zod';
import { createUpdateUserProfileSchema, userProfileSchema } from '../user-profile';


export const patientSchema = z.object({
  id: z.string().uuid(),
  user: userProfileSchema,
  medicalHistory: z.string().optional(), // Add if applicable
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export const patientListSchema = z.array(patientSchema);

export type Patient = z.infer<typeof patientSchema>;


export const createUpdatePatientSchema = z.object({
  user: createUpdateUserProfileSchema,
  medicalHistory: z.string().optional(),
});

export type CreateUpdatePatient = z.infer<typeof createUpdatePatientSchema>;
