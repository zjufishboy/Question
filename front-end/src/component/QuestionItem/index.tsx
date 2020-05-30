import React, { createRef, useEffect, useState } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { StyleUtility, ConfUtility, OtherUtility } from '@/Utility/utils';
import { IFolder } from '@/type/IFolder';
import { Photo } from '../Photo';
import { IQuestionare } from '@/type/IQuestionare';
import { Link, history } from 'umi';
import QRCode  from 'qrcode.react';


const action=["发布问卷","暂停问卷","还原问卷","删除问卷"]
export default (props: { data: IQuestionare;choice: number }) => {
  const [show,setShow]=useState(false);
  return(
  <div
    className={StyleUtility.styleMerge([
      styles.QuestionListItem,
      stylesCommon.bcFlexColumn,
    ])}
    style={{ display: props.data.status == props.choice ? '' : 'none' }}
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
      <div
        className={stylesCommon.nostatic}
      >
        <div className={
          StyleUtility.styleMerge([
            styles.button,
            stylesCommon.csFlexColumn
          ])}
          onMouseEnter={()=>{setShow(true)}}
          onMouseLeave={()=>{setShow(false)}}
        >
          {action[props.data.status]}
          <QRCode
            value={`http://question.fishstar.xyz/answer/${props.data.id}`}  //value参数为生成二维码的链接
                size={100} //二维码的宽高尺寸
                fgColor="#000000"  //二维码的颜色
              className={
                StyleUtility.styleMerge([
                  styles.qrcode,
                  show?styles.show:styles.hide
                ])
              }

          />
          </div>
      </div>
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
);
}
