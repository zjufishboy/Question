export const env:string="production";
export const tokenUrl=["http://localhost:8000/token","http://api.fishstar.xyz/account/token"]
export const getTokenUrl=()=>tokenUrl[env==="debug"?0:1]
export const clientConf={
    client_ID:1,
    client_secret:"B6Wh2KUV-ZGOV-D43r-7Frj-BGXzlcHBvOHK",
    scope:"TTT",
    redirect_uri:"http://localhost:8001",
    response_type: "code",                 //返回模式：code
}

export const userInfoUrl=["http://localhost:8000/userInfo","http://api.fishstar.xyz/account/userInfo"]
export const getUserInfoUrl=()=>userInfoUrl[env==="debug"?0:1]

export const mongodbUrl=["mongdb://localhost:39000","mongodb://api.fishstar.xyz:39000"]
export const dbName="Question"
export const getMongodbUrl=()=>mongodbUrl[env==="debug"?0:1]

