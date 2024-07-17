import { IWebSocketService } from '../interfaces/interface-websocket-service';
import { PrismaClient } from '@prisma/client';

export class WebSocketService implements IWebSocketService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handleConnection(slug: string): Promise<void> {
    await this.prisma.payment.update({
      where: { slug },
      data: { paymentStatus: 'completed', payedAt: new Date() }
    });
  }
}
