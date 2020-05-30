import React, { createRef, useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { AddChoice, AddDepend } from './AddButton';
export const ProblemRank=(props:{problem:IProblem,update:(newProblem:IProblem)=>void,delete:()=>void})=>{
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
                style={{width:"90%"}} 
                defaultValue={props.problem.title} 
                onChange={updateTitle} 
                ref={refTitle}
            />
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