//这里是其他的一些通用模块

import { ConfUtility, StoreUtility } from "./utils"
import stringRandom from 'string-random';
import { IQuestionare } from "../type/IQuestionare";

//创建随机固定长度的字符串
export const createRandomString=(length:number)=>stringRandom(length)

export const myLog=(data:any)=>{
    if(ConfUtility.env==="debug"){
        console.log(data);
    }
    else{
        //写入日志文件
        console.log(data)
    }
}
export const createNewQuestionare=async(title:string,subTitle:string)=>{
    let res4ID=await StoreUtility.addCount("questionare");
    let newID=res4ID.info?.data;
    myLog(`新建问卷：${newID}`)
    let curDate = new Date();
    let newQ:IQuestionare={
        id:newID,
        uid:0,
        title,
        subtitle:subTitle,
        status:0,
        problem:[],
        time:curDate.getTime().toString(),
        answerCount:0
    }
    return newQ;
}