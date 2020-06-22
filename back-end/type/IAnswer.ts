import { IQuestionare, IProblem } from './IQuestionare'

export interface IAnswerSingle{
    answerType:number;
    choice?:number[];
    content?:string;
    rank?:number;
}
export interface IAnswer{
    QID:number;
    userID:number;
    userIP:string;
    answer:IAnswerSingle[]
}

export const AnswerForChoice:IAnswerSingle={
    answerType:0,
    choice:[]
}
export const AnswerForBlank:IAnswerSingle={
    answerType:0,
    content:""
}
export const AnswerForRank:IAnswerSingle={
    answerType:0,
    rank:0
}
export const AnswerDefault:IAnswer={
    QID:-1,
    userID:-1,
    userIP:'0.0.0.0',
    answer:[]
}
export const problem2Answer=(problem:IProblem)=>{
    switch(problem.types){
        case 0:return {...AnswerForChoice};
        case 1:return {...AnswerForBlank};
        case 2:return {...AnswerForRank};
        default:return {...AnswerForChoice};
    }
}
export const getAnswerDefault=(questions:IQuestionare)=>{
    const answer:IAnswer={
        QID:questions.id,
        userID:-1,
        userIP:'0.0.0.0',
        answer:questions.problem.map(problem2Answer)
    };

    return answer;
}