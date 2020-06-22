import React, { useEffect, useState } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { IQuestionare, IProblem } from '@/type/IQuestionare';
import { StyleUtility, NetworkUtility } from '@/Utility/utils';
import { ProblemPreview } from '../PreviewProblem';
import { IAnswer, IAnswerSingle } from '@/type/IAnswer';

export default (props:{data:IQuestionare,type:number,answer:IAnswer,updateAnswer:(a:IAnswer)=>void,isPreview?:boolean})=>{
    const [answer,setAnswer]=useState(props.answer);
    const updateAnswer=(i:number)=>(a:IAnswerSingle)=>{
        const answer=props.answer;
        const answerCollect=[...answer.answer];
        answerCollect[i]=a;
        answer.answer=answerCollect;
        props.updateAnswer({...answer});
    }
    const coverProblem=(item:IProblem,idx:number)=>(
        <ProblemPreview 
            problem={item} 
            key={`PreviewQuestion${idx}`} 
            answer={answer.answer[idx]} 
            updateAnswer={updateAnswer(idx)} 
            answerAll={answer.answer}/>
    )
    const coverSubTitle=(w:string,idx:number)=>(
        <div style={{textAlign:"center",margin:0}} key={`subTitleLine${idx}`}>{w}</div>
    )
    useEffect(()=>{
        setAnswer(props.answer);
    },[props.answer])

    const checkAnswer=()=>{
        let res=true;
        let errId=-1;
        props.data.problem.forEach((item,id)=>{
            if(!item.must)
                return;
            const answer=props.answer.answer[id];
            switch(answer.answerType){
                case 0:
                    if((!answer.choice) || answer.choice.length==0)
                        res=false;
                        if(errId<0)
                            errId=id;
                    break;
                case 1:
                    if((!answer.content) || answer.content==="")
                        res=false;
                        if(errId<0)
                            errId=id;
                    break;
                case 2:
                    if((!answer.rank) || answer.rank===0)
                        res=false;
                        if(errId<0)
                            errId=id;
                    break;
                default:
                    res=false;
                    if(errId<0)
                        errId=id;
                    break;
            }
        })
        return {res,errId};
    }
    const handOnAnswer=()=>{
        const check=checkAnswer();
        if(check.res){
            NetworkUtility.handOnAnswer(props.data.id,answer)
            .then(res=>{
                if(res.status){
                    alert("提交成功");
                }
                else{
                    alert("提交失败");
                }
            })
        }
        else{

            alert("请填写完成必要题["+check.errId+"]后提交")
        }
    }
    return (
        <div 
            className={
                StyleUtility.styleMerge([
                    props.type==1?styles.fullDiv:styles.phoneDiv,
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
                {props.data.title}
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
                {props.data.subtitle.split("\n").map(coverSubTitle)}
            </div>
            {props.data.problem.map(coverProblem)}
            <div
                className={StyleUtility.styleMerge([
                    styles.fullWidth,
                    stylesCommon.ccFlexRow,
                    styles.ButtonBar
                ])}
            >
                <div 
                    className={StyleUtility.styleMerge([
                        styles.handOn,
                        stylesCommon.ccFlexRow,
                    ])}
                    onClick={()=>{
                        if(!props.isPreview)
                            handOnAnswer()
                    }}
                >
                    提交
                </div>
            </div>
            <div
                className={
                    StyleUtility.styleMerge([
                        styles.fullWidth,
                        stylesCommon.ccFlexRow,
                        styles.copyright
                    ])
                }    
            >
                {"版权所有：游鱼星开发：独角鲸问卷系统"}
            </div>
        </div>
    )
}