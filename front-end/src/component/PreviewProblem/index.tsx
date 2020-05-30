import React, { useState } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
const starOnOff={
    on:"http://img.fishstar.xyz/Question/starOn.png",
    off:"http://img.fishstar.xyz/Question/starOff.png"
}
export const ProblemPreview=(props:{problem:IProblem})=>{
    switch(props.problem.types){
        case 0:
            return <ProblemChoice problem={props.problem}/>
        case 1:
            return <ProblemBlank problem={props.problem}/>
        case 2:
            return <ProblemRank problem={props.problem}/>
        default:
            return <ProblemRank problem={props.problem}/> 
    }
}
const ChoicePreview=(props:{content:string})=>{
    return (
        <div
            className={
                StyleUtility.styleMerge([
                    styles.choiceContent,
                    stylesCommon.ssFlexRow
                ])
            }
        >
            <div
                className={
                    StyleUtility.styleMerge([
                        stylesCommon.ccFlexRow
                    ])
                }
                style={{width:22,height:22}}
            >
                <input type={"radio"} value={props.content} checked={false} onChange={()=>{}}/>
            </div>
            
            <label style={{marginLeft:5}}>{props.content}</label>
        </div>
    )
}
const ProblemChoice=(props:{problem:IProblem})=>{
    const coverChoice=(item:string,idx:number)=>{
        return <ChoicePreview content={item} key={idx}/>
    }
    return(
        <div 
            className={
                StyleUtility.styleMerge([
                    stylesCommon.ccFlexColumn,
                    styles.problemPreviewDiv
                ])
            }
        >
            <div 
                className={
                    StyleUtility.styleMerge([
                        styles.problemTitle,
                        stylesCommon.ssFlexRow,
                        stylesCommon.nostatic
                    ])
                }
            >
            {props.problem.title}
            {props.problem.must && <span className={styles.ProblemMust}>*</span>}
            </div>
            {props.problem.choice?.map(coverChoice)}

        </div>
    )

}
const ProblemBlank=(props:{problem:IProblem})=>{
    return(
        <div 
            className={
                StyleUtility.styleMerge([
                    stylesCommon.ccFlexColumn,
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
            {props.problem.title}
            {props.problem.must && <span className={styles.ProblemMust}>*</span>}
            <span>{props.problem.dataType===0?"":"(数字)"}</span>
            </div>
            <input className={StyleUtility.styleMerge([styles.inputs,styles.blankContent])}/>
        </div>
    );
}

const StarRank=(props:{value:number,starAll:number,setValue:(newValue:number)=>void})=>{
    const Stars=new Array(props.starAll).fill(1);
    const coverStar=(item:number,index:number)=>{
        return (
            <div
            className={
                StyleUtility.styleMerge([
                    styles.star,
                    stylesCommon.centerBG
                ])
            }
            key={`star${index}`}
            style={{backgroundImage:`url(${index+1<=props.value?starOnOff.on:starOnOff.off})`}}
            onMouseEnter={()=>{props.setValue(index+1)}}
            onClick={()=>{props.setValue(index+1)}}
        />
        )
    }
    return (
        <div
            className={
                StyleUtility.styleMerge([
                    styles.starBar,
                    stylesCommon.scFlexRow
                ])
            }
        >
            {Stars.map(coverStar)}
        </div>
    )
}

const ProblemRank=(props:{problem:IProblem})=>{
    const [star,setStar]=useState(0);
    const newValue=(newValue:number)=>{
        setStar(newValue)
    }
    return(
        <div 
            className={
                StyleUtility.styleMerge([
                    stylesCommon.ccFlexColumn,
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
            {props.problem.title}
            {props.problem.must && <span className={styles.ProblemMust}>*</span>}
            </div>
            <StarRank value={star} starAll={10} setValue={newValue}/>
        </div>
    );
}