interface IProblem{
  types:number,//0:选择，1:填空，2:评分
  title:String,
  choice?:String[],
  infoType?:number,//0:单行，1:多行
  dataType?:number//0:文字，1:纯数字
  choiceType?:number,//0:单选，1:多选
  must:boolean,//是否必填
  depend?:{
    id:number//题号,
    choice:number//选中
  }
}
export interface IQuestionare{
  uid:number,//用户id
  id:number,//问卷id
  title:String,//标题
  subtitle:String,//副标题
  status:number,//0:未发布，1:已发布，2:已删除，3:已暂停
  problem:IProblem[],
  time:string,
  answerCount:number
}