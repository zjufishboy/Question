import React, { useState, useEffect } from 'react';
import * as Utility from '@/Utility/utils';
import { history } from 'umi';

export default () => {
    useEffect(()=>{
        let authCode= Utility.OtherUtility.getQueryVariable("code")
        if(authCode!=undefined){
          let token   = Utility.NetworkUtility.getToken(authCode)
            .then(res=>{
              Utility.StoreUtility.setToken(res.info.data.token)
            })
            .then(res=>{history.replace('/')})
        }
    },[])
  return (
    <div/>
  );
}
