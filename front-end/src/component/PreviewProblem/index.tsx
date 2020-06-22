import React, { useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { IAnswer, IAnswerSingle } from '@/type/IAnswer';
const starOnOff={
    on:"http://img.fishstar.xyz/Question/starOn.png",
    off:"http://img.fishstar.xyz/Question/starOff.png"
}
export const ProblemPreview=(props:{problem:IProblem,updateAnswer:(a:IAnswerSingle)=>void,answer:IAnswerSingle,answerAll:IAnswerSingle[]})=>{
    switch(props.problem.types){
        case 0:
            return <ProblemChoice problem={props.problem} answer={props.answer} updateAnswer={props.updateAnswer} answerAll={props.answerAll}/>
        case 1:
            return <ProblemBlank problem={props.problem} answer={props.answer} updateAnswer={props.updateAnswer} answerAll={props.answerAll}/>
        case 2:
            return <ProblemRank problem={props.problem} answer={props.answer} updateAnswer={props.updateAnswer} answerAll={props.answerAll}/>
        default:
            return <ProblemRank problem={props.problem} answer={props.answer} updateAnswer={props.updateAnswer} answerAll={props.answerAll}/> 
    }
}
const ChoicePreview=(props:{content:string,choice:Function,status:boolean})=>{
    const [on,setOn]=useState(props.status);
    const handleClick=()=>{
        props.choice();
        setOn(!on);
    }
    useEffect(()=>{
        setOn(props.status)
    },[props.status])

    return (
        <div
            className={
                StyleUtility.styleMerge([
                    styles.choiceContent,
                    stylesCommon.ssFlexRow
                ])
            }
            onClick={handleClick}
        >
            <div
                className={
                    StyleUtility.styleMerge([
                        stylesCommon.ccFlexRow
                    ])
                }
                style={{width:22,height:22}}
               
            >
                <input type={"radio"} value={props.content} checked={on} onChange={()=>{}}/>
            </div>
            
            <label style={{marginLeft:5}}>{props.content}</label>
        </div>
    )
}
const ProblemChoice=(props:{problem:IProblem,updateAnswer:(a:IAnswerSingle)=>void,answer:IAnswerSingle,answerAll:IAnswerSingle[]})=>{
    const [answer,setAnswer]=useState(props.answer);
    const [answerAll,setAnswerAll]=useState(props.answerAll);
    const choice=(i:number)=>()=>{
        if(!answer.choice)return;
        let newChoiceStatus=new Array();
        if(answer.choice.includes(i)){
            let site=answer.choice.indexOf(i);
            answer.choice.splice(site,1);
            newChoiceStatus=[...answer.choice];
            console.log("off",newChoiceStatus);
        }
        else{
            if(props.problem.choiceType===0 &&answer.choice.length>0){
                newChoiceStatus=[];
                newChoiceStatus.push(i);
            }
            else{
                newChoiceStatus=[...answer.choice];
                newChoiceStatus.push(i);
            }
        }
        const newAnswerSingle={...props.answer,choice:[...newChoiceStatus]};
        props.updateAnswer({...newAnswerSingle})
        setAnswer(newAnswerSingle)
    }
    const coverChoice=(item:string,idx:number)=>{
        let status=false;
        if(answer.choice){
            status=answer.choice.includes(idx);
        }
        return <ChoicePreview content={item} key={idx} choice={choice(idx)} status={status}/>
    }
    useEffect(()=>{
        setAnswer(props.answer);
        setAnswerAll(props.answerAll);
    },[props.answer.choice,props.answerAll]);
    return(
        <div 
            className={
                StyleUtility.styleMerge([
                    stylesCommon.ccFlexColumn,
                    styles.problemPreviewDiv
                ])
            }
            style={{
                display:(
                    props.problem.depend &&
                    props.problem.depend.id>=0 &&
                    props.problem.depend.choice>=0 &&
                    !props.answerAll[props.problem.depend.id].choice?.includes(props.problem.depend.choice)
                )
                ?"none":""
            }}
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
const ProblemBlank=(props:{problem:IProblem,updateAnswer:(a:IAnswerSingle)=>void,answer:IAnswerSingle,answerAll:IAnswerSingle[]})=>{
    const [answer,setAnswer]=useState(props.answer);
    const updateAnswer=(s:string)=>{
        const newAnswer={...answer};
        if(props.problem.dataType===0){
            newAnswer.content=s;
        }
        else{
            newAnswer.content=s.replace(/[^1-9]/g,"");
        }
        props.updateAnswer({...newAnswer});
        setAnswer(newAnswer);
    }
    useEffect(()=>{
        setAnswer(props.answer)
    },[props.answerAll])
    return(
        <div 
            className={
                StyleUtility.styleMerge([
                    stylesCommon.ccFlexColumn,
                    styles.problemPreviewDiv
                ])
            }
            style={{
                display:(
                    props.problem.depend &&
                    props.problem.depend.id>=0 &&
                    props.problem.depend.choice>=0 &&
                    !props.answerAll[props.problem.depend.id].choice?.includes(props.problem.depend.choice)
                )
                ?"none":""
            }}
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
            <input 
                className={StyleUtility.styleMerge([styles.inputs,styles.blankContent])} 
                value={answer.content} 
                onChange={e=>{updateAnswer(e.target.value)}}
            />
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

const ProblemRank=(props:{problem:IProblem,updateAnswer:(a:IAnswerSingle)=>void,answer:IAnswerSingle,answerAll:IAnswerSingle[]})=>{
    const [answer,setAnswer]=useState(props.answer);
    const updateAnswer=(i:number)=>{
        const newAnswer={...answer};
        newAnswer.rank=i;
        props.updateAnswer({...newAnswer});
        setAnswer(newAnswer);
    }
    useEffect(()=>{setAnswer(props.answer)},[props.answer])
    return(
        <div 
            className={
                StyleUtility.styleMerge([
                    stylesCommon.ccFlexColumn,
                    styles.problemPreviewDiv
                ])
            }
            style={{
                display:(
                    props.problem.depend &&
                    props.problem.depend.id>=0 &&
                    props.problem.depend.choice>=0 &&
                    !props.answerAll[props.problem.depend.id].choice?.includes(props.problem.depend.choice)
                )
                ?"none":""
            }}
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
            <StarRank value={answer.rank || 0} starAll={10} setValue={updateAnswer}/>
        </div>
    );
}