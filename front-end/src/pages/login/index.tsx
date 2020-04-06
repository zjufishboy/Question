import React, { useState } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { Navigation } from '@/component/Navigation';
import * as Utility from '@/Utility/utils';
import { LoginOrRegister } from '@/component/Login/Login';

export default () => {
  const [isLogin,setIsLogin]=useState(true);
  const handleClick=()=>{
    setIsLogin(!isLogin);
  }
  return (
    <div className={Utility.styleMerge([styles.loginPage,stylesCommon.centerBG])}>
        <Navigation onClick={handleClick}/>
        <div className={Utility.styleMerge([styles.LoginArea,stylesCommon.ccFlexRow])}>
          <LoginOrRegister isLogin={isLogin}/>
        </div>
    </div>
  );
}
