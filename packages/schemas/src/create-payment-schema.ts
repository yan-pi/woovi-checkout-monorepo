import { z } from 'zod';

export const CreatePaymentSchema = z.object({
  name: z.string(),
  amount: z.number(),
  paymentMethod: z.enum(['upfront', 'installments']),
  installments: z.number().optional()
});

export type CreatePaymentSchemaType = z.infer<typeof CreatePaymentSchema>;
