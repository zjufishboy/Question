import { ConfUtility, StoreUtility } from "./utils"
import { IObject } from '@/type/IObject'
import { IQuestionare } from '@/type/IQuestionare'

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