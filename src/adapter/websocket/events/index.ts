import { Inject, Logger } from '@nestjs/common';
import { WSCreateSimpleEvent } from './connect.event';
import { IWSMessage, WS_MESSAGE_EVENT } from './types';

export * from './connect.event';
export class WebSocketEvent {
  private logger: Logger = new Logger('WebSocketEvent');
  constructor(@Inject(WSCreateSimpleEvent) private wsCreateSimpleEvent: WSCreateSimpleEvent) {}
  request(ws: any, message: IWSMessage) {
    console.log("message", message)
    switch (message.event) {
      case WS_MESSAGE_EVENT.create_simple:
        this.wsCreateSimpleEvent.execute(ws, this.sendMessage, message.data);
        break;

      default:
        break;
    }
  }

  sendMessage = (ws: any, message: string, isBinary?: boolean) => {
    if (ws) {
      let data = message;
      if (typeof message === 'object') {
        data = JSON.stringify(message);
      }
      ws.send(data, { binary: isBinary || false });
    }
  };
}
