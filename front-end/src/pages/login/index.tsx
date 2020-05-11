import React, { useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { Navigation } from '@/component/Navigation';
import * as Utility from '@/Utility/utils';
import { LoginOrRegister } from '@/component/Login/Login';
import { history } from 'umi';

{/* <Navigation onClick={handleClick}/>
<div className={Utility.styleMerge([styles.LoginArea,stylesCommon.ccFlexRow])}>
  <LoginOrRegister isLogin={isLogin}/>
</div> */}




export default () => {
  useEffect(()=>{
    Utility.StoreUtility.storeLoad()
    let token=Utility.StoreUtility.getToken()
    console.log(token)
    Utility.NetworkUtility.getUserInfo(token)
      .then((res)=>{
        console.log(res)
        if(res.status){
          Utility.StoreUtility.setUserName(res.info.data.userName)
          history.push("/manage")
        }
      })
  })
  return (
    <div className={Utility.styleMerge([styles.loginPage,stylesCommon.centerBG,stylesCommon.ccFlexColumn])}>
        <div className={Utility.styleMerge([styles.TitleDiv,stylesCommon.ccFlexColumn])}>
          <div className={Utility.styleMerge([styles.Title,stylesCommon.containBG])}/>
          <div className={Utility.styleMerge([styles.SubTitle])}>做一只会思考的鲸鱼</div>
        </div>
        <button className={styles.button} onClick={Utility.NetworkUtility.login}>登录/注册</button>
    </div>
  );
}
