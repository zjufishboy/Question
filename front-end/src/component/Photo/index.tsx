import React from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';

interface IPhoto{
    style:{
        width:number|string,
        height:number|string,
        url:string
    }
}

export const Photo=(props:IPhoto)=>{
    const {width,height,url}=props.style;
    const PhotoStyle={width,height,backgroundImage:`url(${url})`}

    return <div className={stylesCommon.centerBG} style={PhotoStyle}/>
}