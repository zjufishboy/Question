export interface IAppInfo {
  client_ID: number,
  client_secret: string,
  //App权限设置，目前只允许三种权限：1.修改用户密码（未开放），2.修改用户签名，3.获取用户id
  client_type: string,
  client_info: string;
}
