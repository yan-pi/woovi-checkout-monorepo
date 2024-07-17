import { Request, Response } from 'express';
import { CreatePaymentSchema, CreatePaymentSchemaType } from '@repo/schemas/src/create-payment-schema';
import { IPaymentService } from '../interfaces/interface-payment-service';

export class PaymentController {
  private paymentService: IPaymentService;

  constructor(paymentService: IPaymentService) {
    this.paymentService = paymentService;
  }

  async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: CreatePaymentSchemaType = CreatePaymentSchema.parse(req.body);
      const result = await this.paymentService.createPayment(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPaymentBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const payment = await this.paymentService.getPaymentBySlug(slug);
      if (!payment) {
        res.status(404).json({ error: 'Payment not found' });
      } else {
        res.status(200).json(payment);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
