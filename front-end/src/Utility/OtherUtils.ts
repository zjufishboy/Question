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