export interface IToken {
  client_ID: number,
  uid: number,
  authCode: string;
  token: string;
  token_time: Date;
}