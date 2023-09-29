import { Inject } from '@nestjs/common';
import { WSBaseEvent, WSClient } from './base.event';
import { IWSMessage, WS_MESSAGE_EVENT } from './types';
import { SimpleService } from 'src/services';

export class WSCreateSimpleEvent implements WSBaseEvent {
  constructor(
    @Inject(SimpleService) private simpleService: SimpleService
  ) {}
  async execute(ws: WSClient, sendMessage: (ws: WSClient, message: string | IWSMessage, isBinary?: boolean) => void, data?: any) {
    const result = await this.simpleService.create({
      name: data.name,
      description: data.description,
    })
    sendMessage(ws, {
      event: WS_MESSAGE_EVENT.hello,
      data: result
    })
  }
}
