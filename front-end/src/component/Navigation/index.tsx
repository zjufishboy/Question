import React, { useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { Photo } from '../Photo';
import * as Utility from '@/Utility/utils';
import { setUserName } from '@/Utility/StorageUtils';

const PhotoLogo = 'https://www.wjx.cn/images/register-login/logo.png';
const PhotoLogo2= 'https://www.wjx.cn/images/commonImgPC/logo@2x.png';

export const Navigation = (props: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div
      className={Utility.styleMerge([
        styles.Navigation,
        stylesCommon.bcFlexRow,
      ])}
    >
      <Photo style={{ width: 150, height: 60, url: PhotoLogo }} />
      <div
        className={Utility.styleMerge([styles.button, stylesCommon.ccFlexRow])}
        onClick={props.onClick}
      >
        注册
      </div>
    </div>
  );
};
const UserInfo=(props:{name:string})=>{
  return (
    <div className={styles.userInfo}>
      {props.name}
    </div>
  )
  
}
export const NavigationManage = (props: {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  name:string
}) => {
  return (
    <div>
      <div
      className={Utility.styleMerge([
        styles.NavigationManage,
        stylesCommon.bcFlexRow,
      ])}
    >
      <div className={stylesCommon.ccFlexRow} style={{fontSize:16}}>
      <Photo style={{ width: 32, height: 32, url: PhotoLogo2 }} />
      <span style={{marginLeft:12}}>游鱼星的问卷系统</span>
      </div>
      <UserInfo name={props.name}/>
    </div>
    <div className={styles.block}>

    </div>
    </div>
  );
};