//这里是和数据库交互相关的模块
import mongodb = require("mongodb");
import { ConfUtility  } from "./utils";
import { IObject } from '../type/IObject'
import { IStatus } from '../type/IStatus'
import { IQuestionare } from "../type/IQuestionare";
import { IAnswer } from "../type/IAnswer";

const MongoClient = mongodb.MongoClient;

const mySelect = (target: IObject, cName: string) => {
    let res: IStatus= {status:false,detail:"未知错误"}
    return new Promise((resolve:(res:IStatus)=>void, _reject) => {
        MongoClient.connect(ConfUtility.getMongodbUrl(), { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                res.detail = "连接错误"
                resolve(res)
            }
            let database = client.db(ConfUtility.dbName);
            database.collection(cName).find(target).toArray((err, result) => {
                if (err) {
                    res.detail = "查询错误"
                    resolve(res)
                }
                if (result.length == 0) {
                    res.status = false;
                    res.detail = "查无数据"
                }
                else {
                    res.status = true;
                    res.detail="查询成功"
                    res.info = {data:result[0],length:result.length};
                }
                resolve(res)
            });
        });
    })
}
const myUpdate = (target: IObject,newtarget:IObject, cName: string) => {
    let res: IStatus= {status:false,detail:"未知错误"}
    return new Promise((resolve:(res:IStatus)=>void, _reject) => {
        MongoClient.connect(ConfUtility.getMongodbUrl(), { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                res.detail = "连接错误"
                resolve(res)
            }
            let database = client.db(ConfUtility.dbName);
            database.collection(cName).findOneAndUpdate(target,{$set:newtarget})
            .then((_result)=>{
                res.status=true;
                res.detail="更新成功",
                resolve(res)
            })
        });
    })
}
// const mySelectAll = (cName: string) => {
//     let res: IStatus= {status:false,detail:"未知错误"}
//     return new Promise((resolve:(res:IStatus)=>void, _reject) => {
//         MongoClient.connect(ConfUtility.getMongodbUrl(), { useUnifiedTopology: true }, (err, client) => {
//             if (err) {
//                 res.detail = "连接错误"
//                 resolve(res)
//             }
//             let database = client.db(ConfUtility.dbName);
//             database.collection(cName).find().toArray((err, result) => {
//                 if (err) {
//                     res.detail = "查询错误"
//                     resolve(res)
//                 }
//                 if (result.length == 0) {
//                     res.status = false;
//                     res.detail = "查无数据"
//                 }
//                 else {
//                     res.status = true;
//                     res.detail="查询成功"
//                     res.info = {data:result,length:result.length};
//                 }
//                 resolve(res)
//             });
//         });
//     })
// }
const mySelectAllWidthOption = (target:IObject,cName: string) => {
    let res: IStatus= {status:false,detail:"未知错误"}
    return new Promise((resolve:(res:IStatus)=>void, _reject) => {
        MongoClient.connect(ConfUtility.getMongodbUrl(), { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                res.detail = "连接错误"
                resolve(res)
            }
            let database = client.db(ConfUtility.dbName);
            database.collection(cName).find(target).toArray((err, result) => {
                if (err) {
                    res.detail = "查询错误"
                    resolve(res)
                }
                if (result.length == 0) {
                    res.status = false;
                    res.detail = "查无数据"
                }
                else {
                    res.status = true;
                    res.detail="查询成功"
                    res.info = {data:result,length:result.length};
                }
                resolve(res)
            });
        });
    })
}

const myInsert = (target: IObject, cName: string) => {
    let res: IStatus= {status:false,detail:"未知错误"}
    return new Promise((resolve:(res:IStatus)=>void, _reject) => {
        MongoClient.connect(ConfUtility.getMongodbUrl(), { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                res.detail = "连接错误"
                resolve(res)
            }
            let database = client.db(ConfUtility.dbName);
            database.collection(cName).insertOne(target, (err, _result) => {
                if (err) {
                    res.detail = "插入错误"
                    resolve(res)
                }
                res.status = true;
                res.detail = "插入成功"
                res.info={data:target}
                resolve(res)
            })
        });
    })
}

export const getAllQuestionare=(status:number,userID:number)=>{
    return mySelectAllWidthOption({status,uid:userID},"questionare")
}
export const addQuestionare=async(questionare:IQuestionare,userID:number)=>{
    questionare.uid=userID;
    return myInsert(questionare,"questionare")
}
export const addCount=(cName:string)=>{
    let res: IStatus= {status:false,detail:"未知错误"}
    return new Promise((resolve:(res:IStatus)=>void, _reject) => {
        MongoClient.connect(ConfUtility.getMongodbUrl(), { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                res.detail = "连接错误"
                resolve(res)
            }
            let database = client.db(ConfUtility.dbName);
            database.collection("counter").findOneAndUpdate(
                {
                    name: cName 
                },
                {
                    $inc:{
                        count:1
                    },
                })
            .then(result=>{
                res.status=true;
                res.detail="查询成功",
                res.info={}
                res.info.data=result.value.count+1;
                resolve(res);
            });
        });
    });
}

export const getQuestionByID=(ID:number)=>{
    return mySelect({id:ID},"questionare");
}
export const updateQuestionByID=async(ID:number,newQuestion:IQuestionare)=>{
    return myUpdate({id:ID},newQuestion,"questionare");
}
export const addAnswer=async(answer:IAnswer)=>{
    return myInsert(answer,"answer");
}