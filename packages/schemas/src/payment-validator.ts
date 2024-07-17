import { z } from 'zod';

const paymentSchema = z.object({
  name: z.string(),
  amount: z.number(),
  paymentMethod: z.enum(['full', 'installment']),
  installments: z.number().int().min(1).optional(),
});

export const validatePayment = (data: any) => {
  return paymentSchema.safeParse(data);
};
