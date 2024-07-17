import { Payment } from '@prisma/client';
import { CreatePaymentSchemaType } from '@repo/schemas/src/create-payment-schema';

export interface IPaymentService {
  createPayment(data: CreatePaymentSchemaType): Promise<{ slug: string; totalAmount: number; installments: string[] }>;
  getPaymentBySlug(slug: string): Promise<Payment | null>;
}
