import { IQuestionare, IProblem, IProblemChoiceSingleDefault, IProblemChoiceMeltiDefault, IProblemBlankSingleDefault,IProblemBlankSingleNumberDefault, IProblemBlankMeltiDefault, IProblemBlankMeltiNumberDefault,IProblemRankDefault } from '@/type/IQuestionare';
import { IObject } from '@/type/IObject';
import { StoreUtility, NetworkUtility } from './utils';
import { history } from 'umi';

export const getQueryVariable = (v: string) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++){
        let pair = vars[i].split("=");
        if (pair[0] === v) {
            return pair[1];
        }
    }
    return "";
};
export const getUrlParam = () => {
    return {
        response_type: getQueryVariable(
            "response_type"
        ),
        client_ID: parseInt(
            getQueryVariable("client_ID")
        ),
        redirect_uri: getQueryVariable(
            "redirect_uri"
        ),
        scope: getQueryVariable("scope"),
    };
};
//密码单向加密
//TODO:未实现加密效果。
export const dealWithPassword=(password:string)=>password

export const checkType=(type:string)=>{
    if(type.length!==3)
        return false;
    for(let chr of type)
        if(chr!=='T'&&chr!=='F')
            return false;
    return true;
}
export const fmtDate=(date:string)=>{
    let D=new Date(parseInt(date));
    let y=D.getFullYear();
    let m=D.getMonth()+1;
    let d=D.getDate();
    return `${y>=10?y:"0"+y}-${m>=10?m:"0"+m}-${d>=10?d:"0"+d}`;
}

//构造新的单选/多选/等题目类型

export const createNewProblem=(type:number)=>{
    let newProblem:IProblem;
    switch(type){
        case 0:newProblem={...IProblemChoiceSingleDefault,choice:['A','B','C','D']};break;
        case 1:newProblem={...IProblemBlankSingleDefault};break;
        case 2:newProblem={...IProblemRankDefault};break;
        default :throw("Type is error");
    }
    return newProblem;
}

//核查token
export const checkToken=(callback?:Function)=>{
    StoreUtility.storeLoad()
    let token=StoreUtility.getToken()
    NetworkUtility.getUserInfo(token)
    .then((res)=>{
        if(res.status){
            StoreUtility.setUserName(res.info.data.userName)
            history.replace("/manage")
        }
    })
    .then(()=>{
        if(callback)
            callback()
    })
  }