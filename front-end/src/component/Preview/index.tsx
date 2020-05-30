import React from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import { IQuestionare, IProblem } from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { ProblemPreview } from '../PreviewProblem';

export default (props:{data:IQuestionare,type:number})=>{
    const coverProblem=(item:IProblem,idx:number)=>(
        <ProblemPreview problem={item} key={`PreviewQuestion${idx}`}/>
    )
    const coverSubTitle=(w:string,idx:number)=>(
        <div style={{textAlign:"center",margin:0}} key={`subTitleLine${idx}`}>{w}</div>
    )
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