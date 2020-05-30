export interface IStatus {
  //状态：成功或失败
  status: boolean,
  //信息：失败时为失败信息，成功时为数据
  info?: {
    data?:any,
    length?:number
  },
  detail:string
}
