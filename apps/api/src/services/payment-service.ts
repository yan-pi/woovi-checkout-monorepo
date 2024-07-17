import { PrismaClient, Payment } from '@prisma/client';
import { IPaymentService } from '../interfaces/interface-payment-service';
import { CreatePaymentSchemaType } from '@repo/schemas/src/create-payment-schema';
import { calculateInstallments } from '../utils/calculate-installments';
import crypto from 'crypto';

export class PaymentService implements IPaymentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createPayment(data: CreatePaymentSchemaType): Promise<{ slug: string; totalAmount: number; installments: string[] }> {
    const { name, amount, paymentMethod, installments } = data;

    let finalInstallments: string[] = [];
    let totalAmount = amount;

    if (paymentMethod === 'installments' && installments && installments > 2) {
      finalInstallments = calculateInstallments(amount, installments);
      totalAmount = finalInstallments.reduce((acc, val) => acc + parseFloat(val), 0);
    }

    const slug = crypto.randomBytes(16).toString('hex');
    
    const payment = await this.prisma.payment.create({
      data: {
        name,
        amount: totalAmount,
        paymentMethod,
        installments: installments || 1,
        paymentStatus: 'pending',
        slug
      }
    });

    return {
      slug: payment.slug,
      totalAmount,
      installments: finalInstallments.length ? finalInstallments : [totalAmount.toFixed(2)]
    };
  }

  async getPaymentBySlug(slug: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { slug } });
  }
}
