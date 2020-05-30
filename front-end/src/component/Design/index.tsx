import React, { createRef, useEffect, useState } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { IQuestionare , IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { createNewProblem } from '@/Utility/OtherUtils';
import { IFunction } from '@/type/IFunction';
import { ProblemDesign } from '../DesignProblem';



const RTE=(props:{data:IQuestionare,update:(data:IQuestionare)=>void,setPreviewOnOff:()=>void,handOn:()=>void})=>{
    const [funct,setFunct]=useState([] as string[])
    const create=(i:number)=> ()=>{
        let data={...props.data};
        let newProblem:IProblem={...createNewProblem(i)};
        data.problem.push(newProblem);
        props.update(data)
    }
    const functionList=[
        create(0),
        create(1),
        create(2),
        ()=>{props.setPreviewOnOff()},
        ()=>{props.handOn()}
    ]
    
    const coverFunction=(item:string,idx:number)=>{
        let style:string=""
        switch(idx){
            case 0:style=styles.functionsLeft;break;
            case 4:style=styles.functionsRight;break;
            default:style=styles.functions;break;
        }
        return (
            <div
                className={
                    StyleUtility.styleMerge([
                        style,
                        styles.functionItem,
                        stylesCommon.ccFlexRow
                    ])
                }
                key={`fuction${idx}`}
                onClick={()=>{functionList[idx]()}}
            >
                {item}
            </div>
        )
        
    }
    useEffect(()=>{
        const Funct:string[]=["选择题","填空题","评分题","预览","提交"]
        setFunct(Funct)
    },[])
    return <div className={
        StyleUtility.styleMerge([
            styles.RTE,
            stylesCommon.ccFlexRow
        ])}>
       {funct.map(coverFunction)}
    </div>
}


export default (props:{data:IQuestionare,update:(data:IQuestionare)=>void,setPreviewOnOff:()=>void,handOn:()=>void})=>{

    const refTitle=createRef<HTMLInputElement>();
    const refSubTitle=createRef<HTMLTextAreaElement>();
    const updateProblem=(i:number)=>(newProblem:IProblem)=>{
        let newData:IQuestionare={...props.data}
        newData.problem[i]=newProblem;
        props.update(newData)
    }
    const deleteProblem=(i:number)=>()=>{
        let newData:IQuestionare={...props.data}
        newData.problem.splice(i,1);
        props.update(newData)
    }
    const coverProblem=(item:IProblem,idx:number)=>(
        <ProblemDesign problem={item} key={idx} update={updateProblem(idx)} delete={deleteProblem(idx)}/>
    )
    return (
        <div 
            className={
                StyleUtility.styleMerge([
                    styles.fullDiv,
                    stylesCommon.scFlexColumn,
                ])
            }
        >
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.fullWidth,
                        stylesCommon.ccFlexColumn,
                        styles.title
                    ])
                }
            >
                <input 
                    className={styles.inputTitle}
                    defaultValue={props.data.title}
                    ref={refTitle}
                    onChange={()=>{
                        let data={...props.data};
                        let newTitle=refTitle.current?.value
                        data.title=newTitle?newTitle:"";
                        props.update(data)
                    }}
                    />
            </div>
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.fullWidth,
                        stylesCommon.ccFlexColumn,
                        styles.subtitle
                    ])
                }
            >
                <textarea 
                    className={styles.inputSubTitle}
                    defaultValue={props.data.subtitle}
                    ref={refSubTitle}
                    onChange={()=>{
                        let data={...props.data};
                        let newSubTitle=refSubTitle.current?.value
                        data.subtitle=newSubTitle?newSubTitle:"";
                        props.update(data)
                        let sheight=refSubTitle.current?.scrollHeight;
                        console.log(sheight)
                        refSubTitle.current?.style.setProperty("height",sheight?`${sheight}px`:"auto");
                    }}
                    />
            </div>
            {props.data.problem.map(coverProblem)}
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.fullWidth,
                        stylesCommon.ccFlexColumn,
                        styles.buttonBar
                    ])
                }
            >
                <RTE 
                    data={props.data} 
                    update={props.update} 
                    setPreviewOnOff={props.setPreviewOnOff} 
                    handOn={props.handOn}
                />
            </div>
        </div>
    )
}