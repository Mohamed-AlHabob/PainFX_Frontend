// src/schemas/subscription.ts

import { z } from 'zod';
import { userProfileSchema } from '../user-profile';
import { categorySchema } from '../Social';
import { paymentSchema } from '../Payment';


export const SubscriptionStatusEnum = z.enum(['active', 'cancelled']);

export const subscriptionSchema = z.object({
  id: z.string().uuid(),
  user: userProfileSchema,
  category: categorySchema,
  status: SubscriptionStatusEnum,
  payment: paymentSchema.optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export const subscriptionListSchema = z.array(subscriptionSchema);

export type Subscription = z.infer<typeof subscriptionSchema>;
