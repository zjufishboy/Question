import React, { useEffect, useState } from 'react';
import { QuestionDefault } from '@/type/IQuestionare';
import { AnswerDefault, getAnswerDefault, IAnswer } from '@/type/IAnswer';
import { NetworkUtility, StyleUtility, styleMerge } from '@/Utility/utils';
import styles from './index.less'
import stylesCommon from '@/global.less';
import Preview from '@/component/Preview';

export default (props:any)=>{
    const [data,setData]=useState(QuestionDefault)
    const [answer,setAnswer]=useState(AnswerDefault);
    useEffect(()=>{
        const qid=parseInt(props.match.params.qid);
        console.log(qid);
        NetworkUtility.getQuestion(qid)
        .then((res)=>{
            if(res.status){
                let newData=res.info.data;
                delete newData._id;
                const answer=getAnswerDefault(newData);
                setAnswer({...answer});
                setData(newData)
            }
            else{
                alert("问卷信息不存在");
            }
        })
    },[])
    const updateAnswer=(answer:IAnswer)=>{setAnswer(answer)}
    return (
    <div
        className={
            styleMerge([
                styles.answerOutSide,
                stylesCommon.ccFlexRow
            ])
        }
    >
        <div className={
            StyleUtility.styleMerge([
                styles.halfDiv,
                stylesCommon.ccFlexRow
            ])
        }>
            <Preview data={data} type={1} answer={answer} updateAnswer={updateAnswer}/>
        </div>
    </div>
    );
}