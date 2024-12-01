// src/schemas/paymentMethod.ts

import { z } from 'zod';

export const paymentMethodSchema = z.object({
  id: z.string().uuid(),
  methodName: z.string().min(1, 'Method name is required'),
});

export const paymentMethodListSchema = z.array(paymentMethodSchema);

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
