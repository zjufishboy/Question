import React, { createRef, useEffect, useState } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { StyleUtility, ConfUtility } from '@/Utility/utils';
import { IFolder } from '@/type/IFolder';
import { Photo } from '../Photo';

export default (props:{setClassType:(type:number)=>void,handler:Function[]}) => {
    const [choice, setChoice] = useState(0);
    const coverFolder = (item: IFolder, key: number) => (
      <div
        key={`folder${key}`}
        className={StyleUtility.styleMerge([
          styles.folder,
          stylesCommon.scFlexRow,
          key == choice ? styles.folderCur : '',
        ])}
        onClick={() => {
          setChoice(key);
          props.setClassType(key)
        }}
      >
        <div style={{ marginLeft: 20, marginRight: 10 }}>
          <Photo style={{ width: 20, height: 20, url: item.icon }} />
        </div>
        {item.name}
      </div>
    );
    return (
      <div
        className={StyleUtility.styleMerge([
          stylesCommon.scFlexColumn,
          styles.functionList,
        ])}
      >
        <div
          className={StyleUtility.styleMerge([
            stylesCommon.ccFlexColumn,
            styles.addButton,
          ])}
          onClick={()=>{props.handler[0]()}}
        >
          创建问卷
        </div>
        <div
          className={StyleUtility.styleMerge([
            stylesCommon.ccFlexColumn,
            styles.folders,
          ])}
        >
          {ConfUtility.folders.map(coverFolder)}
        </div>
      </div>
    );
  };