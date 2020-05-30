import React, { useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import * as Utility from '@/Utility/utils';
import { NavigationManage } from '@/component/Navigation';
import { Photo } from '@/component/Photo';
import { Link, history } from 'umi';
import {NewQuestion} from '@/component/NewQuestion'
import { IQuestionare } from '@/type/IQuestionare';
import { IFolder } from '@/type/IFolder';
import FolderBar from '@/component/FolderBar';
import QuestionItem from '@/component/QuestionItem';

const QuestionList = (props:{classType:number}) => {
  const [data, setData] = useState([] as IQuestionare[] );
  useEffect(()=>{
    updateData()
  },[])
  const updateData=()=>{
    let token=Utility.StoreUtility.getToken()
    console.log({token})
    Utility.NetworkUtility.getQuestionList(token,props.classType).then(res=>{
      if(res.status){
        setData(res.info.data)
      }
    })
  }

  const coverData=
    (data:IQuestionare,index:number)=>(
      <QuestionItem 
        data={data} 
        choice={props.classType} 
        key={`Question${index}`}
      />
    )
  return (
    <div
      className={Utility.styleMerge([
        styles.QuestionList,
        stylesCommon.scFlexColumn,
      ])}
    >
      {data.map(coverData)}
    </div>
  );
};

export default () => {
  const [isLogin, setIsLogin] = useState(true);
  const [classType, setClassType]=useState(0)
  const [userName,setUserName]=useState("未登录")
  const [newQ,setNewQ]=useState(false);
  useEffect(()=>{
    const callback=()=>{
      let theUserName=Utility.StoreUtility.getUserName();
      setUserName(theUserName);
    }
    Utility.OtherUtility.checkToken(callback)
  },[])
  const handler=[
    ()=>{setNewQ(!newQ)},
    ()=>{},
    ()=>{},
    ()=>{},
  ]
  const cancelDisplay=()=>{setNewQ(false)}
  return (
    <div
      className={Utility.styleMerge([
        styles.managePage,
        stylesCommon.scFlexColumn,
      ])}
    >
      <NewQuestion isDisplay={newQ} cancel={cancelDisplay}/>
      <NavigationManage name={userName}/>
      <div
        className={Utility.styleMerge([
          styles.manageContent,
          stylesCommon.bcFlexRow,
        ])}
      >
        <FolderBar setClassType={setClassType} handler={handler}/>
        <QuestionList classType={classType}/>
      </div>
    </div>
  );
};
