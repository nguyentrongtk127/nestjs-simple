import { IWSMessage } from './types';

export type WSClient = {
  id: string;
  [key: string]: any;
  send: (data: string, options?: any) => void;
};
export interface WSBaseEvent {
  execute(
    ws: WSClient,
    sendMessage: (
      ws: WSClient,
      message: IWSMessage | string,
      isBinary?: boolean,
    ) => void,
    data?: any,
  );
}