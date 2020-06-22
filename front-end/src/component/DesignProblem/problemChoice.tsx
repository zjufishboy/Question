import React, { createRef, useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { AddChoice, AddDepend } from './AddButton';
const ChoiceDesign=(props:{content:string,update:(content:string)=>void,deleteChoice:()=>void})=>{
    const refContent=createRef<HTMLInputElement>();
    const [ct,setCt]=useState("")
    useEffect(()=>{
        setCt(props.content)
    },[props.content])
    const updateContent=()=>{
        if(refContent.current)
            props.update(refContent.current.value)
    }
    return (
        <div 
            className={
                StyleUtility.styleMerge([
                    styles.choiceContent,
                    stylesCommon.scFlexRow,
                ])
            }
        >
            <input
                className={
                    StyleUtility.styleMerge([
                        styles.choiceContentWord,
                        stylesCommon.scFlexRow,
                        styles.inputs
                    ])
                }
                defaultValue={ct}
                ref={refContent}
                onChange={updateContent}
            />
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.choiceContentDelete,
                        stylesCommon.ccFlexColumn
                    ])
                }
                onClick={props.deleteChoice}
            >
                删除
            </div>
        </div>
            
    )
}
export const ProblemChoice=(props:{problem:IProblem,update:(newProblem:IProblem)=>void,delete:()=>void,data:IProblem[],id:number})=>{
    const refTitle=createRef<HTMLInputElement>();
    const [choice,setChoice]=useState([] as string[]);
    useEffect(()=>{
        if(props.problem.choice)
            setChoice(props.problem.choice);
    },[props.problem])
    const coverChoice=(item:string,idx:number)=>{
        return (
            <ChoiceDesign 
                content={item} 
                key={`choiceDesignContent${idx}`} 
                update={updateChoice(idx)} 
                deleteChoice={deleteChoice(idx)}
            />
        )
    }
    const updateTitle=()=>{
        let newProblem:IProblem={...props.problem}
        if(refTitle.current){
            newProblem.title=refTitle.current.value;
            props.update(newProblem)
        }
    }
    const addChoice=()=>{
        let newProblem:IProblem={...props.problem}
        if(newProblem.choice){
            let len=newProblem.choice.length;
            let newChoice=[...newProblem.choice];
            newChoice.splice(len,0,`选项${len}`);
            newProblem.choice=newChoice;
        }
        props.update(newProblem)
    }
    const deleteChoice=(i:number)=>()=>{
        let newProblem:IProblem={...props.problem}
        if(newProblem.choice){
            newProblem.choice.splice(i,1)
        }
        props.update(newProblem)
    }
    const updateChoice=(i:number)=>(choiceContent:string)=>{
        let newProblem:IProblem={...props.problem}
        if(newProblem.choice)
            newProblem.choice[i]=choiceContent;
        props.update(newProblem)    
    }
    const updateMust=()=>{
        let newProblem:IProblem={...props.problem}
        let newMust=!newProblem.must;
        newProblem.must=newMust;
        props.update(newProblem);
    }
    const addDepend=(depend:{id:number,choice:number})=>{
        //TODO:依赖的具体实现
        const newProblem={...props.problem}
        newProblem.depend={...depend};
        props.update(newProblem);
    }
    const updateChoicetype=()=>{
        let newProblem:IProblem={...props.problem}
        if(newProblem.choiceType===0)
            newProblem.choiceType=1;
        else 
            newProblem.choiceType=0
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
                    style={{width:"80%"}} 
                    defaultValue={props.problem.title} 
                    onChange={updateTitle} 
                    ref={refTitle}
                />
            <div className={StyleUtility.styleMerge([styles.ProblemMust,stylesCommon.scFlexRow])}>
                <span style={{width:30}}>必选</span>
                <input type={"checkbox"} checked={props.problem.must} onChange={updateMust}/>
            </div>
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.isChoiceMelti,
                        stylesCommon.ccFlexRow
                    ])
                }
                style={{width:"10%"}}
                onClick={updateChoicetype}
            >
                {props.problem.choiceType===0?"单选":"多选"}
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
            </div>
            {choice.map(coverChoice)}
            <div
                className={StyleUtility.styleMerge([
                    stylesCommon.scFlexRow,
                    styles.ButtonBar
                ])}
            >
                <AddChoice addChoice={addChoice}/>
                
            </div>
            <div
                className={StyleUtility.styleMerge([
                    stylesCommon.scFlexRow,
                    styles.ButtonBar
                ])}
            >
                <AddDepend addDepend={addDepend} select={props.problem.depend} data={props.data} id={props.id}/>
            </div>
            
        </div>
    )

}