// src/schemas/reservation.ts

import { z } from 'zod';
import { clinicSchema } from '../Clinic';
import { patientSchema } from '../Patient';
import { doctorSchema } from '../Doctor';


export const ReservationStatusEnum = z.enum([
  'pending',
  'approved',
  'rejected',
  'cancelled',
]);

export const reservationSchema = z.object({
  id: z.string().uuid(),
  patient: patientSchema,
  clinic:z.string().optional(),
  status: ReservationStatusEnum,
  reasonForCancellation: z.string().optional(),
  reservationDate: z.string().datetime().optional(),
  reservationTime: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const reservationListSchema = z.array(reservationSchema);

export type Reservation = z.infer<typeof reservationSchema>;


// src/schemas/reservationDoctor.ts


export const reservationDoctorSchema = z.object({
  id: z.string().uuid(),
  reservation: reservationSchema,
  doctor: doctorSchema,
  assignedAt: z.string().datetime(),
});

export const reservationDoctorListSchema = z.array(reservationDoctorSchema);

export type ReservationDoctor = z.infer<typeof reservationDoctorSchema>;


export const createUpdateReservationSchema = z.object({
  patientId: z.string().uuid(),
  clinicId: z.string().uuid(),
  reservationDate: z.string(),
  reservationTime: z.string(),
});
export type createUpdateReservation = z.infer<typeof createUpdateReservationSchema>;