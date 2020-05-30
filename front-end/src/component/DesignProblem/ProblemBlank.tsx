import React, { createRef, useState, useEffect } from 'react';
import styles from './ProblemBlank.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { AddChoice, AddDepend } from './AddButton';
export const ProblemBlank=(props:{problem:IProblem,update:(newProblem:IProblem)=>void,delete:()=>void})=>{
    const refTitle=createRef<HTMLInputElement>();
    const updateTitle=()=>{
        let newProblem:IProblem={...props.problem}
        if(refTitle.current){
            newProblem.title=refTitle.current.value;
            props.update(newProblem)
        }
    }
    const updateMust=()=>{
        let newProblem:IProblem={...props.problem}
        let newMust=!newProblem.must;
        newProblem.must=newMust;
        props.update(newProblem);
    }
    const addDepend=()=>{
        //TODO:依赖的具体实现
    }
    const updateInfoType=()=>{
        let newProblem:IProblem={...props.problem}
        if(newProblem.infoType===0)
            newProblem.infoType=1;
        else 
            newProblem.infoType=0
        props.update(newProblem);
    }
    const updateDataType=()=>{
        let newProblem:IProblem={...props.problem}
        if(newProblem.dataType===0)
            newProblem.dataType=1;
        else 
            newProblem.dataType=0
        props.update(newProblem);
    }
    return(
        <div 
            className={
                StyleUtility.styleMerge([
                    stylesCommon.csFlexColumn,
                    styles.problemPreviewDiv
                ])
            }
        >
            <div 
                className={
                    StyleUtility.styleMerge([
                        styles.problemTitle,
                        stylesCommon.scFlexRow,
                        stylesCommon.nostatic
                    ])
                }
            >
            <input 
                className={styles.inputs}
                style={{width:"70%"}} 
                defaultValue={props.problem.title} 
                onChange={updateTitle} 
                ref={refTitle}
            />
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.isBlankMelti,
                        stylesCommon.ccFlexRow
                    ])
                }
                style={{width:"10%"}}
                onClick={updateInfoType}
            >
                {props.problem.infoType===0?"单行":"多行"}
            </div>
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.isBlankNumber,
                        stylesCommon.ccFlexRow
                    ])
                }
                style={{width:"10%"}}
                onClick={updateDataType}
            >
                {props.problem.dataType===0?"文字":"数字"}
            </div>
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.isChoiceMelti,
                        stylesCommon.ccFlexRow
                    ])
                }
                style={{width:"10%"}}
                onClick={props.delete}
            >
                删除
            </div>
            <div className={StyleUtility.styleMerge([styles.ProblemMust,stylesCommon.scFlexRow])}>
                <span style={{width:30}}>必选</span>
                <input type={"checkbox"} checked={props.problem.must}  onChange={updateMust}/>
            </div>
            </div>
            <div
                className={StyleUtility.styleMerge([
                    stylesCommon.scFlexRow,
                    styles.ButtonBar
                ])}
            >
                <AddDepend addDepend={addDepend}/>
            </div>
        </div>
    );
}