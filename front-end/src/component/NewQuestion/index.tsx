import React, { useState, createRef } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import * as Utility from '@/Utility/utils';
import { history } from 'umi';

const MyInput=(props:{prefix:string,refs:any})=>{
    const [focus,setFocus]=useState(false)

    return (
    <div
        className={Utility.styleMerge([
          styles.inputOutSide,
          stylesCommon.ccFlexRow,
        ])}
      >
        <input 
        className={styles.inputs}  
        ref={props.refs}
        placeholder={focus?"":" "+props.prefix}
        onFocus={()=>{setFocus(true)}}
        onBlur={()=>{setFocus(false)}}/>
      </div>
    )
}

export const NewQuestion = (props:{
  isDisplay:boolean,
  cancel:(event: MouseEvent<HTMLDivElement, MouseEvent>) => void
  }) => {
    const refTitle=createRef<HTMLInputElement>();
    const refSubTitle=createRef<HTMLInputElement>();
    const createNewQ=()=>{
      let title=refTitle.current?.value.toString();
      let subTitle=refSubTitle.current?.value.toString();
      let Title=title?title:"";
      let SubTitle=subTitle?subTitle:"";
      if(Title && SubTitle){
        let token=Utility.StoreUtility.getToken();
        Utility.NetworkUtility.addQuestionList(Title,SubTitle,token)
        .then(res=>{
          if(res.status){
            window.location.reload()
          }
          else{
            props.cancel({});
            alert("创建失败")
          }
        })
      }
      else{
        alert("标题和副标题不能为空！");
      }
      
    }
  return (
    <div
      className={Utility.styleMerge([
        styles.fullscreen,
        stylesCommon.ccFlexColumn,
      ])}
      style={{display:props.isDisplay?"":"none"}}
      onClick={props.cancel}
    >
      <div
        className={Utility.styleMerge([
          stylesCommon.scFlexColumn,
          styles.NewQuestionOutside,
        ])}
        onClick={(e)=>{e.stopPropagation();}}
      >
        <div className={styles.NQtitle}>新建问卷</div>
        <MyInput refs={refTitle} prefix={"问卷标题"}/>
        <MyInput refs={refSubTitle} prefix={"问卷副标题"}/>
        <div
          className={Utility.styleMerge([
            styles.buttonBar,
            stylesCommon.ccFlexRow,
          ])}
        >
          <div
            className={Utility.styleMerge([
              styles.createButton,
              stylesCommon.ccFlexRow,
            ])}
            onClick={()=>{createNewQ()}}
          >

            创建
          </div>
          <div
            className={Utility.styleMerge([
              styles.cancelButton,
              stylesCommon.ccFlexRow,
            ])}
            onClick={props.cancel}
          >
            取消
          </div>
        </div>
      </div>
    </div>
  );
};
