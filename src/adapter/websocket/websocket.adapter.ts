import { INestApplication, Logger } from '@nestjs/common';
import { WebSocketServer } from 'ws';
import { v4 } from 'uuid'
import { WS_MESSAGE_EVENT } from './events/types';
import { WebSocketEvent } from './events';

export class WebSocketAdapter {
  wss;
  isAlive = true
  private logger: Logger = new Logger('WSGateway');
  webSocketEvent: WebSocketEvent
  constructor(private app: INestApplication) {
    this.wss = new WebSocketServer({ server: app.getHttpServer() });
    this.webSocketEvent = app.get(WebSocketEvent)
  }

  heartbeat() {
    this.isAlive = true;
  }
  init() {
    const _this = this;
    this.wss.on('connection', (ws, req) => {
      _this.logger.log(`Connection size: ${this.wss.clients.size}`);
      ws.binaryType = 'arraybuffer';
      ws.id = v4(); // client_id
      ws.isAlive = true;
      ws.on('pong', this.heartbeat); // Keep alive the connection

      this.logger.log(`id: ${ws.id} connect`);
      ws.on('message', async (data, isBinary) => {
        try {
          if(isBinary) {
              const uint8Array = new Uint8Array(data);
              const decoder = new TextDecoder('utf-8');
              data = decoder.decode(uint8Array); 
          }
          const message = JSON.parse(data);
          _this.logger.log(`${ws.id} Event: ${message.event}`);
          this.webSocketEvent.request(ws, message)
        } catch (error) {
          console.log('error', error);
        }
      });  
      // handling what to do when clients disconnects from server
      ws.on('close', async (e) => {
        this.logger.log(`id: ${ws.id} Disconnect`);
      });
      // handling client connection error
      ws.onerror = function () {
        console.log('Some Error occurred');
      };
    });
    // const _this = this
    const interval = setInterval(function ping() {
      _this.wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
    this.wss.on('close', function close() {
      clearInterval(interval);
    });
  }
}
