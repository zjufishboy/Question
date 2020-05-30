import React, { createRef, useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/global.less';
import {IProblem} from '@/type/IQuestionare';
import { StyleUtility } from '@/Utility/utils';
import { ProblemChoice } from './problemChoice';
import {ProblemBlank} from './ProblemBlank'
import { ProblemRank } from './ProblemRank';
export const ProblemDesign=(props:{problem:IProblem,update:(newProblem:IProblem)=>void,delete:()=>void})=>{
    switch(props.problem.types){
        case 0:
            return <ProblemChoice problem={props.problem} update={props.update} delete={props.delete}/>
        case 1:
            return <ProblemBlank problem={props.problem} update={props.update} delete={props.delete}/>
        case 2:
            return <ProblemRank problem={props.problem} update={props.update} delete={props.delete} />
        default:
            return <ProblemRank problem={props.problem} update={props.update} delete={props.delete}/> 
    }
}





