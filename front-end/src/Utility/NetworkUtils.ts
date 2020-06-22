import { ConfUtility, StoreUtility } from "./utils"
import { IObject } from '@/type/IObject'
import { IQuestionare } from '@/type/IQuestionare'
import { QUESTION_STATUS } from '@/constant/questionare'
import { IAnswer } from '@/type/IAnswer'

export const myFetch = (way:"POST"|"GET",url: string, data?: IObject) => {
    let requestInit:RequestInit = {
        headers: {
            "Content-Type":"application/json",
        },
        method: way,
        mode: "cors",
        body: data?JSON.stringify(data):null
    }
    return fetch(url,requestInit)
}

export const myPost=(url:string,data:IObject)=>{
    return myFetch("POST",url,data)
}
export const myGet=(url:string,data:IObject)=>{
    const params=[]
    for(let key in data){
        params.push(`${key}=${data[key]}`)
    }
    let realUrl=`${url}${params.length===0?"":"?"}${params.join("&")}`
    return myFetch("GET",realUrl)
}
export const login=()=>{
    window.location.href=ConfUtility.loginOrRegisterUrl();
}
export const getToken=(authCode:string)=>{
    return myPost(ConfUtility.getTokenUrl(),{authCode}).then(res=>res.json())
}
export const getUserInfo=(token:string)=>{
    return myPost(ConfUtility.getUserInfoUrl(),{token}).then(res=>res.json())
}
export const getQuestionList=(token:string,status:number)=>{
    return myPost(ConfUtility.getQuestionListUrl(),{token,status}).then(res=>res.json())
}
export const addQuestionList=(title:string,subTitle:string,token:string)=>{
    return myPost(ConfUtility.getAddQuestionListUrl(),{title,subTitle,token}).then(res=>res.json())
}
export const getQuestion=(id:number)=>{
    let token=StoreUtility.getToken()
    return myPost(ConfUtility.getQuestionUrl(),{token,id}).then(res=>res.json())
}
export const updateQuestion=(id:number,newQuestion:IQuestionare)=>{
    let token=StoreUtility.getToken()
    return myPost(ConfUtility.getUpdateQuestionUrl(),{
        token,id,newQuestion:JSON.stringify(newQuestion)}).then(res=>res.json())
}
export const operateQuestion=(to:QUESTION_STATUS,id:number)=>{
    let token=StoreUtility.getToken()
    return myPost(ConfUtility.getOperateQuestionUrl(),{
        token,id,status:to}).then(res=>res.json())
}
export const publishQuestion=(id:number)=>{
    return operateQuestion(QUESTION_STATUS.PUBLISHED,id);
}
export const stopQuestion=(id:number)=>{
    return operateQuestion(QUESTION_STATUS.STOP,id);
}
export const deleteQuestion=(id:number)=>{
    return operateQuestion(QUESTION_STATUS.DELETED,id);
}
export const handOnAnswer=(id:number,answer:IAnswer)=>{
    answer.QID=id;
    answer.userID=-1;
    answer.userIP="101.80.192.3";
    let token=StoreUtility.getToken()
    return myPost(ConfUtility.getAddAnswerUrl(),{
        token,answer:JSON.stringify(answer)}).then(res=>res.json())
}