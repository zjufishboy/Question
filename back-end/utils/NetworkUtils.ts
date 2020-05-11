import { ConfUtility} from "./utils"
import { IObject } from '../type/IObject'
import fetch from 'node-fetch'
export const myFetch = (_way:"POST"|"GET",url: string, _data?: IObject) => {
    return fetch(url)
}
export const myGet=(url:string,data:IObject)=>{
    const params=[]
    for(let key in data){
        params.push(`${key}=${data[key]}`)
    }
    let realUrl=`${url}${params.length===0?"":"?"}${params.join("&")}`
    return myFetch("GET",realUrl)
}
export const getToken=(authCode:string)=>{
    let {client_secret,client_ID}=ConfUtility.clientConf;
    return myGet(ConfUtility.getTokenUrl(),{authCode,client_secret,client_ID}).then(res=>res.json())
}