// src/schemas/payment.ts

import { z } from 'zod';
import { userProfileSchema } from '../user-profile';
import { paymentMethodSchema } from '../PaymentMethod';


export const PaymentStatusEnum = z.enum(['pending', 'completed', 'failed']);

export const paymentSchema = z.object({
  id: z.string().uuid(),
  user: userProfileSchema,
  amount: z.number().nonnegative(),
  method: paymentMethodSchema,
  paymentStatus: PaymentStatusEnum,
  relatedObjectId: z.string().uuid().optional(), // Adjust as needed
  createdAt: z.string().datetime(),
});

export const paymentListSchema = z.array(paymentSchema);

export type Payment = z.infer<typeof paymentSchema>;
