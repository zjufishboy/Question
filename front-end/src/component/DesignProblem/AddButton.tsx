import React, { createRef, useState, useEffect } from 'react';
import styles from './AddButton.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { ProblemChoice } from './problemChoice';
export const AddChoice=(props:{addChoice:()=>void})=>{
    return (
        <div
            className={StyleUtility.styleMerge([
                styles.addChoice,
                stylesCommon.ccFlexRow
            ])}
            onClick={props.addChoice}
        >
            添加选项
        </div>
    )
}
export const AddDepend=(props:{addDepend:()=>void})=>{
    return (
        <div
            className={StyleUtility.styleMerge([
                styles.addChoice,
                stylesCommon.ccFlexRow
            ])}
            onClick={props.addDepend}
        >
            添加依赖
        </div>
    )
}