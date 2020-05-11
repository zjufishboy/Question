export const clientConf={
    client_id:1,
    client_secret:"B6Wh2KUV-ZGOV-D43r-7Frj-BGXzlcHBvOHK",
    scope:"TTT",
    redirect_uri:"http://localhost:8000",
    response_type: "code",                 //返回模式：code
}
export const env:string="production";
export const loginUrl=["http://localhost:4001","http://account.fishstar.xyz"]
export const loginOrRegisterUrl=()=>`${loginUrl[env==="debug"?0:1]}/?response_type=${clientConf.response_type}&client_ID=${clientConf.client_id}&redirect_uri=${clientConf.redirect_uri}&scope=${clientConf.scope}`

export const tokenUrl=["http://localhost:8002/token","http://api.fishstar.xyz/question/token"]
export const getTokenUrl=()=>tokenUrl[env==="debug"?0:1]
export const userInfoUrl=["http://localhost:8000/userInfo","http://account.fishstar.xyz/question/userInfo"]
export const getUserInfoUrl=()=>userInfoUrl[env==="debug"?0:1]
