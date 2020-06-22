import React, { createRef, useEffect, useState } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { StyleUtility, ConfUtility, OtherUtility, NetworkUtility } from '@/Utility/utils';
import { IFolder } from '@/type/IFolder';
import { Photo } from '../Photo';
import { IQuestionare } from '@/type/IQuestionare';
import { Link, history } from 'umi';
import QRCode  from 'qrcode.react';
import { QUESTION_STATUS } from '@/constant/questionare';


const action=["发布问卷","暂停问卷","还原问卷","删除问卷"]


export default (props: { data: IQuestionare;choice: number }) => {
  const getActions=()=>{
    let functName=["发布问卷","删除问卷","停止问卷"]
    const handler=[
      ()=>(NetworkUtility.publishQuestion(props.data.id)),
      ()=>(NetworkUtility.deleteQuestion(props.data.id)),
      ()=>(NetworkUtility.stopQuestion(props.data.id)),
    ]
    let choice:number[]=[];
    switch(props.data.status){
      case QUESTION_STATUS.UNPUBLISHED:choice=[0,1];break;
      case QUESTION_STATUS.PUBLISHED:choice=[1,2];break;
      case QUESTION_STATUS.DELETED:choice=[0];break;
      case QUESTION_STATUS.STOP:choice=[0];break;
      default:break;
    }
    return choice.map(c=>({name:functName[c],funct:handler[c]}))
  }
  const coverFunction=(data:{name:string,funct:()=>Promise<any>},idx:number)=>(
    <div className={
      StyleUtility.styleMerge([
        styles.button,
        stylesCommon.csFlexColumn
      ])}
      key={idx+"funct"}
      onClick={()=>{data.funct().then((res)=>{
        if(res.status){
          window.location.reload();
        }
        else{
          alert("操作失败")
        }
      })}}
    >
      {data.name}
      </div>
  )
  useEffect(()=>{
    console.log(props.data);
  })
  return(
    <div
      className={StyleUtility.styleMerge([
        stylesCommon.scFlexRow
      ])}
      style={{width:"100%"}}
    >
      <div
    className={StyleUtility.styleMerge([
      styles.QuestionListItem,
      stylesCommon.bcFlexColumn,
    ])}
    style={{display: props.data.status == props.choice ? '' : 'none' }}
  >
    <div
      className={StyleUtility.styleMerge([
        styles.QuestionListItemDetails,
        stylesCommon.bcFlexRow,
      ])}
    >
      <Link to="" className={styles.QuestionName}>
        {props.data.title}
      </Link>
      <div
        className={stylesCommon.bcFlexRow}
        style={{ width: 320, fontSize: 12 }}
      >
        <span>ID:{props.data.id}</span>
        <span>状态:{ConfUtility.QuestionStatus[props.data.status]}</span>
        <span>答卷:{props.data.answerCount}</span>
        <span>{OtherUtility.fmtDate(props.data.time)}</span>
      </div>
    </div>
    <div
      className={StyleUtility.styleMerge([
        styles.Buttons,
        stylesCommon.scFlexRow,
      ])}
    >
      <div
        className={
          StyleUtility.styleMerge([
            styles.button,
            stylesCommon.csFlexColumn
          ])
        }
        onClick={() => {
          history.push(`/design/${props.data.id}`);
        }}
      >
        设计问卷
      </div>
      {getActions().map(coverFunction)}
      <div className={
        StyleUtility.styleMerge([
          styles.button,
          stylesCommon.csFlexColumn
        ])}
      >
        答卷分析
      </div>
    </div>
  </div>
  <QRCode
    value={`http://question.fishstar.xyz/answer/${props.data.id}`}  //value参数为生成二维码的链接
                size={100} //二维码的宽高尺寸
                fgColor="#000000"  //二维码的颜色
              className={
                StyleUtility.styleMerge([
                  styles.qrcode,
                ])
              }
          />
    </div>
  
);
}
{/*  */}