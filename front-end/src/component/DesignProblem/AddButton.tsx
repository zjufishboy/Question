import React, { createRef, useState, useEffect } from 'react';
import styles from './AddButton.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility, styleMerge } from '@/Utility/utils';
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
export const AddDepend=(props:{addDepend:(depend:{id:number,choice:number})=>void,select:{id:number,choice:number}|undefined,data:IProblem[],id:number})=>{
    const coverOption=(item:IProblem,idx:number)=>(
       idx<props.id && item.types===0? 
       <option
            
       value={idx}
       key={`cq${idx}`}
   >
       {idx}.{item.title}
   </option>:null
    )
    const coverOptionAnswer=(item:string,idx:number)=>(
        <option
            key={`ca${idx}`}
            value={idx}
        >
            {idx}.{item}
        </option>
    )
    const [choice,setChoice]=useState(props.select?props.select.id:-1);
    const [choiceSelect,setSelect]=useState(props.select?props.select.choice:-1);
    const updateChoice=(i:number)=>{
        setChoice(i)
        if(i<0){
            setSelect(-1);
            props.addDepend({id:-1,choice:-1})
        }
    }
    const updateDepend=(i:number)=>{
        setSelect(i);
        if(i<0){
            props.addDepend({id:-1,choice:-1})
        }
        else{
            props.addDepend({id:choice,choice:i})
        }
        
    }
    useEffect(()=>{
    },[])
    return (
        <div
            className={StyleUtility.styleMerge([
                styles.depend,
                stylesCommon.ccFlexRow
            ])}
        >
            <div
            className={StyleUtility.styleMerge([
                styles.addChoice,
                stylesCommon.ccFlexRow
            ])}
            >
                添加依赖
            </div>
            <select
                className={styleMerge([
                    styles.select,
                    stylesCommon.ccFlexRow
                ])}
                defaultValue={choice}
                onChange={(e)=>{updateChoice(parseInt(e.target.value))}}
            >
                <option value={-1}>请选择</option>
                {props.data.map(coverOption)}
            </select>
            <select
                className={styleMerge([
                    styles.select,
                    stylesCommon.ccFlexRow
                ])}
                defaultValue={choiceSelect}
                onChange={(e)=>{updateDepend(parseInt(e.target.value))}}
            >
                <option value={-1}>请选择</option>
                {
                    choice>0 && 
                    choice<props.data.length && 
                    props.data[choice].types===0 && 
                    props.data[choice].choice?.length &&
                    props.data[choice].choice?.map(coverOptionAnswer)
                }
            </select>
        </div>
    )
}