export enum WS_MESSAGE_EVENT {
  create_simple = 'create_simple',
  hello = 'hello',
}
export interface IWSMessage {
  event: string;
  data?: any;
}