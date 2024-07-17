import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { PaymentService } from '../services/payment-service';
import { PaymentController } from '../controllers/payment-controller';

const prisma = new PrismaClient();
const paymentService = new PaymentService(prisma);
const paymentController = new PaymentController(paymentService);

const router: Router = Router();

router.post('/payment', (req, res) => paymentController.createPayment(req, res));
router.get('/payment/:slug', (req, res) => paymentController.getPaymentBySlug(req, res));

export default router;
