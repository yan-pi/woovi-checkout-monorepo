import WebSocket from 'ws';
import { PrismaClient } from '@prisma/client';
import { WebSocketService } from './services/websocket-service';

const prisma = new PrismaClient();
const webSocketService = new WebSocketService(prisma);

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', async (ws, req) => {
  console.log('New connection established');
  const slug = req.url?.split('/').pop();
  console.log(`Received connection with slug: ${slug}`);

  if (slug) {
    try {
      await webSocketService.handleConnection(slug);
      ws.send(JSON.stringify({ message: 'Payment completed' }));
    } catch (error: any) {
      console.error(`Error handling connection: ${error.message}`);
      ws.send(JSON.stringify({ error: error.message }));
    }
  } else {
    console.error('Slug not found in the URL');
    ws.send(JSON.stringify({ error: 'Slug not found in the URL' }));
  }
});

wss.on('error', (error) => {
  console.error(`WebSocket error: ${error.message}`);
});

export { wss };
