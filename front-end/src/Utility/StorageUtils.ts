export const storeDefault={
    name:"Question",
    token:"",
    userName:""
}
export const storeForQuestion:IStoreForQuestion=storeDefault

export const storeLoad=()=>{
    let storeStr=window.localStorage.getItem("Question")
    if(!storeStr){
       storeSave()
    }
    else{
        const {name,token}=JSON.parse(storeStr)
        storeForQuestion.name=name;
        storeForQuestion.token=token;
    }
}
export const storeSave=()=>{
    window.localStorage.setItem("Question",JSON.stringify(storeForQuestion))
}
export const getStore=()=>{
    return storeDefault;
}
export const setToken=(token:string)=>{
    storeForQuestion.token=token;
    storeSave()
}
export const getToken=()=>{
    storeLoad()
    return storeForQuestion.token;
}

export const setUserName=(userName:string)=>{
    storeForQuestion.userName=userName;
    storeSave()
}
export const getUserName=()=>storeForQuestion.userName