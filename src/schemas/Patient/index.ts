// src/schemas/patient.ts

import { z } from 'zod';
import { createUpdateUserProfileSchema, userProfileSchema } from '../user-profile';


export const patientSchema = z.object({
  user: userProfileSchema.optional(),
  medical_history: z.string().nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const patientListSchema = z.array(patientSchema);

export type Patient = z.infer<typeof patientSchema>;


export const createUpdatePatientSchema = z.object({
  medicalHistory: z.string().optional(),
});

export type CreateUpdatePatient = z.infer<typeof createUpdatePatientSchema>;
