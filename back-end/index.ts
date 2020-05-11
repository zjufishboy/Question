//鱼塘登录系统后端支持
import express =require('express');
import cors =require('cors');
import bodyParser =require('body-parser');
// import fetch from 'node-fetch';
import {NetworkUtility, OtherUtility} from './utils/utils'
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


//route

app.listen(port,()=>{
    console.log(`serverForQuestion start to listen on port[${port}]`)
})