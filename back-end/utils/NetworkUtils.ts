import { ConfUtility, StoreUtility, OtherUtility} from "./utils"
import { IObject } from '../type/IObject'
import fetch from 'node-fetch'
import express from 'express';
import { IStatus } from "../type/IStatus";
import { IQuestionare } from "../type/IQuestionare";
export const myFetch = (way:"POST"|"GET",url: string, data?: IObject) => {
    if(way=="GET"){
        return fetch(url)
    }
    else{
        return fetch(url,
            {
                method:way,
                body:JSON.stringify(data),
                headers: { 
                    'Content-Type': 'application/json' 
                }
            }
        )
    }
    
}
export const myGet=(url:string,data:IObject)=>{
    const params=[]
    for(let key in data){
        params.push(`${key}=${data[key]}`)
    }
    let realUrl=`${url}${params.length===0?"":"?"}${params.join("&")}`
    return myFetch("GET",realUrl)
}
export const myPost=(url:string,data:IObject)=>{
    return myFetch("POST",url,data)
}
export const getToken=(authCode:string)=>{
    let {client_secret,client_ID}=ConfUtility.clientConf;
    return myGet(ConfUtility.getTokenUrl(),{authCode,client_secret,client_ID}).then(res=>res.json())
}
export const getUserInfo=(token:string)=>{
    return myPost(ConfUtility.getUserInfoUrl(),{token}).then(res=>res.json())
}

export const addQuestion=async(req:express.Request,res:express.Response)=>{
    let {token,title,subTitle}=req.body;
    let Token=token.toString();
    let userInfo:IStatus= await getUserInfo(Token)
    if(!userInfo.status){
        OtherUtility.myLog(`新建失败<问卷>[token错误]`)
        res.send(userInfo)
    }
    let newQ=await OtherUtility.createNewQuestionare(title,subTitle);
    let result4Question:IStatus=await StoreUtility.addQuestionare(newQ,userInfo.info?.data.ID)
    if(result4Question.status){
        OtherUtility.myLog(`新建成功<问卷>[${result4Question.detail}]`)
        res.send(result4Question)
        return;
    }
    else{
        OtherUtility.myLog(`新建失败<问卷>[${result4Question.detail}]`)
        res.send(result4Question)
        return;
    }
}

export const getQuestion=async(req:express.Request,res:express.Response)=>{
    let {token,id}=req.body;
    let Token=token.toString();
    let ID=parseInt(id);
    let DataInfo:IStatus=await StoreUtility.getQuestionByID(ID);
    let userInfo:IStatus= await getUserInfo(Token)
    if(!userInfo.status){
        OtherUtility.myLog(`查询失败<问卷>[token错误]`)
        res.send(userInfo)
    }
    if(DataInfo.status){
        if(DataInfo.info?.data.status===3||userInfo.info?.data.ID===DataInfo.info?.data.uid){
            //已发布或为问卷拥有者
            OtherUtility.myLog(`查询成功<问卷>[已发布或为问卷拥有者]`)
            
            res.send(DataInfo)
            return;
        }
        else{
            OtherUtility.myLog(`查询失败<问卷>[权限不足]`)
            DataInfo.status=false;
            DataInfo.detail="权限不足"
            res.send(DataInfo)
            return;
        }
    }
    else{
        //查询失败
        OtherUtility.myLog(`查询失败<问卷>[${ID}]`)
        DataInfo.status=false;
        DataInfo.detail="查询失败"
        res.send(DataInfo)
        return;
    }
}

export const updateQuestion=async(req:express.Request,res:express.Response)=>{
    let {token,newQuestion,id}=req.body;
    let Token=token.toString();
    let ID=parseInt(id);
    let newQ:IQuestionare=JSON.parse(newQuestion);
    
    let DataInfo:IStatus=await StoreUtility.getQuestionByID(ID);
    let userInfo:IStatus= await getUserInfo(Token)
    if(!userInfo.status){
        OtherUtility.myLog(`更新失败<问卷>[token错误]`)
        res.send(userInfo)
        return;
    }
    if(DataInfo.status){
        if(userInfo.info?.data.ID===DataInfo.info?.data.uid){
            //为问卷拥有者
            OtherUtility.myLog(`更新中<问卷>[为问卷拥有者]`)
            let oldQuestion:IQuestionare=DataInfo.info?.data;
            if(oldQuestion.status===0){
                //未发布，可修改
                OtherUtility.myLog(`更新中<问卷>[未发布]`)
                let time=new Date();
                newQ.answerCount=0;
                newQ.id=oldQuestion.id;
                newQ.status=oldQuestion.status;
                newQ.time=time.getTime().toString();
                newQ.uid=oldQuestion.uid;
                let res4Update=await StoreUtility.updateQuestionByID(ID,newQ)
                if(res4Update.status){
                    OtherUtility.myLog(`更新成功<问卷>[]`)
                }
                else{
                    OtherUtility.myLog(`更新失败<问卷>[]`)
                }
                res.send(res4Update)
            }
            else{
                OtherUtility.myLog(`更新中<问卷>[已经发布，只能新建]`)
                //已经发布，需要新建
                let newQModel:IQuestionare=await OtherUtility.createNewQuestionare("","");
                newQ.answerCount=0;
                newQ.id=newQModel.id;
                newQ.status=0;
                newQ.time=newQModel.time;
                let res4Update=await StoreUtility.addQuestionare(newQ,userInfo.info?.data.ID)
                if(res4Update.status){
                    OtherUtility.myLog(`新建成功<问卷>[]`)
                }
                else{
                    OtherUtility.myLog(`新建失败<问卷>[]`)
                }
                res.send(res4Update) 
            }
            return;
        }
        else{
            OtherUtility.myLog(`更新失败<问卷>[权限不足]`)
            DataInfo.status=false;
            DataInfo.detail="权限不足"
            res.send(DataInfo)
            return;
        }
    }
    else{
        //查询失败
        OtherUtility.myLog(`更新失败<问卷>[${ID}]`)
        DataInfo.status=false;
        DataInfo.detail="更新失败"
        res.send(DataInfo)
        return;
    }
}
export const deleteQuestion=async(req:express.Request,res:express.Response)=>{
    let {token,id}=req.body;
    let Token=token.toString();
    let ID=parseInt(id);
    let DataInfo:IStatus=await StoreUtility.getQuestionByID(ID);
    let userInfo:IStatus= await getUserInfo(Token)
    if(!userInfo.status){
        OtherUtility.myLog(`删除失败<问卷>[token错误]`)
        res.send(userInfo)
        return;
    }
    if(DataInfo.status){
        if(userInfo.info?.data.ID===DataInfo.info?.data[0].uid){
            //为问卷拥有者
            OtherUtility.myLog(`删除中<问卷>[为问卷拥有者]`)
            let oldQuestion:IQuestionare=DataInfo.info?.data[0];
            if(oldQuestion.status===2){
                //已经删除
                OtherUtility.myLog(`删除中<问卷>[已删除]`)
                DataInfo.status=true;
                DataInfo.detail="无需删除"
                DataInfo.info=undefined;
                res.send(DataInfo);
            }
            else{
                OtherUtility.myLog(`删除中<问卷>[非删除模式，可以删除]`)
                //已经发布，需要新建
                oldQuestion.status=2;
                let res4Update=await StoreUtility.updateQuestionByID(ID,oldQuestion);
                if(res4Update.status){
                    OtherUtility.myLog(`删除成功<问卷>[]`)
                }
                else{
                    OtherUtility.myLog(`删除失败<问卷>[]`)
                }
                res.send(res4Update) 
            }
            return;
        }
        else{
            OtherUtility.myLog(`删除失败<问卷>[权限不足]`)
            DataInfo.status=false;
            DataInfo.detail="权限不足"
            res.send(DataInfo)
            return;
        }
    }
    else{
        //查询失败
        OtherUtility.myLog(`删除失败<问卷>[${ID}]`)
        DataInfo.status=false;
        DataInfo.detail="删除失败"
        res.send(DataInfo)
        return;
    }
}