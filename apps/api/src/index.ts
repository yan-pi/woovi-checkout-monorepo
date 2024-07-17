import { createServer } from "./server";
import { log } from "@repo/logger";
import http from "http";
import { wss } from "./websocket";

const port = process.env.PORT || 3001;
const app = createServer();
const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  console.log('Handling upgrade request');
  log('Handling upgrade request');
  
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(port, () => {
  log(`api running on ${port}`);
  console.log(`API running on port ${port}`);
});
