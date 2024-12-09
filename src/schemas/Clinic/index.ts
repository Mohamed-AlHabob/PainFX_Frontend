// src/schemas/clinic.ts

import { z } from 'zod';
import { userProfileSchema } from '../user-profile';
import { doctorSchema, specializationSchema } from '../Doctor';


export const clinicSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  specialization: specializationSchema.nullable().optional(),
  owner: userProfileSchema.optional(),
  doctors: z.array(doctorSchema).optional(),
  reservation_open : z.boolean().optional(),
  privacy: z.boolean().optional(),
  geolocation: z.string().optional(),
  createdAt: z.string().datetime().optional(),
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
  name: z.string().min(5, 'Name is required'),
  address: z.string().optional(),
  specialization : z.string().optional(),
  license_number : z.string().optional(),
  license_expiry_date: z.string().optional(),
  description: z.string().optional(),
});

export type CreateUpdateClinic = z.infer<typeof createUpdateClinicSchema>;