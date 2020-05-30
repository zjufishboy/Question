export interface IProblem {
  types: number; //0:选择，1:填空，2:评分
  title: string;
  choice?: string[];
  infoType?: number; //0:单行，1:多行
  dataType?: number; //0:文字，1:纯数字
  choiceType?: number; //0:单选，1:多选
  must: boolean; //是否必填
  depend?: {
    id: number; //题号,
    choice: number; //选中
  };
}
export interface IQuestionare {
  uid: number; //用户id
  id: number; //问卷id
  title: string; //标题
  subtitle: string; //副标题
  status: number; //0:未发布，1:已发布，2:已删除，3:已暂停
  problem: IProblem[];
  time: string;
  answerCount: number;
}
export const QuestionDefault: IQuestionare = {
  id: 0,
  uid: 0,
  problem: [],
  time: '',
  answerCount: 0,
  title: '',
  subtitle: '',
  status: 0,
};
export const IProblemChoiceSingleDefault: IProblem = {
  types: 0,
  title: '选择标题',
  choice: ['A.', 'B.', 'C.', 'D.'],
  must: false,
  choiceType: 0,
};
export const IProblemChoiceMeltiDefault: IProblem = {
  types: 0,
  title: '选择标题',
  choice: ['A.', 'B.', 'C.', 'D.'],
  must: false,
  choiceType: 1,
};
export const IProblemBlankSingleDefault: IProblem = {
  types: 1,
  title: '填空标题',
  must: false,
  infoType: 0,
  dataType: 0,
};
export const IProblemBlankMeltiDefault: IProblem = {
  types: 1,
  title: '填空标题',
  must: false,
  infoType: 1,
  dataType: 0,
};
export const IProblemBlankSingleNumberDefault: IProblem = {
  types: 1,
  title: '填空标题',
  must: false,
  infoType: 0,
  dataType: 1,
};
export const IProblemBlankMeltiNumberDefault: IProblem = {
  types: 1,
  title: '填空标题',
  must: false,
  infoType: 1,
  dataType: 1,
};
export const IProblemRankDefault: IProblem = {
  types: 2,
  title: '评分标题',
  must: false,
};
