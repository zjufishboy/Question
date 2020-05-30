//鱼塘登录系统后端支持
import express =require('express');
import cors =require('cors');
import bodyParser =require('body-parser');
// import fetch from 'node-fetch';
import {NetworkUtility, OtherUtility, StoreUtility} from './utils/utils'
import {IStatus} from './type/IStatus'
//lib
const port =8001;
const prefix="/question"
//config

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//prepare



app.get(prefix+"/",(_req,res)=>{res.send("Question:Server")})
app.post(prefix+"/token",(req,res)=>{
    let {authCode}=req.body
    OtherUtility.myLog(`Token转发请求:${authCode}`)
    NetworkUtility
        .getToken(authCode)
        .then((result:IStatus)=>{res.send(result)})         
})
app.post(prefix+'/getQuestionList',async(req,res)=>{
    let {token,status}=req.body;
    let Token=token.toString();
    let userInfo= await NetworkUtility.getUserInfo(Token)
    if(!userInfo.status){
        res.send(userInfo)
        return;
    }
    let result4Question:IStatus=await StoreUtility.getAllQuestionare(status,userInfo.info.data.ID)
    if(result4Question.status){
        res.send(result4Question)
        return;
    }
    else{
        OtherUtility.myLog("获取问卷失败")
        OtherUtility.myLog(`原因：${result4Question.detail}`)
        res.send(result4Question)
        return;
    }
})
app.post(prefix+'/AddQuestion',NetworkUtility.addQuestion)
app.post(prefix+'/getQuestion',NetworkUtility.getQuestion)
app.post(prefix+'/updateQuestion',NetworkUtility.updateQuestion)
app.post(prefix+'/deleteQuestion',NetworkUtility.deleteQuestion)

//route

app.listen(port,()=>{
    console.log(`serverForQuestion start to listen on port[${port}]`)
})