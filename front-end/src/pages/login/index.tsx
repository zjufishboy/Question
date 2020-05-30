import React, { useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import * as Utility from '@/Utility/utils';

export default () => {
  useEffect(() => {
    Utility.OtherUtility.checkToken();
  });

  return (
    <div
      className={Utility.styleMerge([
        styles.loginPage,
        stylesCommon.centerBG,
        stylesCommon.ccFlexColumn,
      ])}
    >
      <div
        className={Utility.styleMerge([
          styles.TitleDiv,
          stylesCommon.ccFlexColumn,
        ])}
      >
        <div
          className={
            Utility.styleMerge([
              styles.Title, 
              stylesCommon.containBG
            ])}
        />
        <div 
          className={
            Utility.styleMerge([
              styles.SubTitle
            ])}
        >
          做一只会思考的鲸鱼
        </div>
      </div>
      <button 
        className={
          styles.button
        } 
        onClick={
          Utility.NetworkUtility.login
        }
      >
        登录/注册
      </button>
    </div>
  );
};
