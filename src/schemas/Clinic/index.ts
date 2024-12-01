// src/schemas/clinic.ts

import { z } from 'zod';
import { createUpdateUserProfileSchema, userProfileSchema } from '../user-profile';
import { createUpdateDoctorSchema, doctorSchema } from '../Doctor';


export const clinicSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  owner: userProfileSchema,
  doctors: z.array(doctorSchema),
  geolocation: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export const clinicListSchema = z.array(clinicSchema);

export type Clinic = z.infer<typeof clinicSchema>;


export const clinicDoctorSchema = z.object({
  id: z.string().uuid(),
  clinic: clinicSchema,
  doctor: doctorSchema,
  // Include any additional fields if present
});

export const clinicDoctorListSchema = z.array(clinicDoctorSchema);

export type ClinicDoctor = z.infer<typeof clinicDoctorSchema>;


export const createUpdateClinicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  owner: createUpdateUserProfileSchema,
  doctors: z.array(createUpdateDoctorSchema).optional(),
  geolocation: z.string().optional(),
});

export type CreateUpdateClinic = z.infer<typeof createUpdateClinicSchema>;