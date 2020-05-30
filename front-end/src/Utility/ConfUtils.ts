import { IFolder } from '@/type/IFolder';
import { IQuestionare } from '@/type/IQuestionare';

export const clientConf={
    client_id:1,
    client_secret:"B6Wh2KUV-ZGOV-D43r-7Frj-BGXzlcHBvOHK",
    scope:"TTT",
    redirect_uri:"http://localhost:8000",
    response_type: "code",                 //返回模式：code
}
export const env:string="production";
export const loginUrl=["http://localhost:4001","http://account.fishstar.xyz"]
export const loginOrRegisterUrl=()=>`${loginUrl[env==="debug"?0:1]}/?response_type=${clientConf.response_type}&client_ID=${clientConf.client_id}&redirect_uri=${clientConf.redirect_uri}&scope=${clientConf.scope}`

export const tokenUrl=["http://localhost:8001/question/token","http://api.fishstar.xyz/question/token"]
export const getTokenUrl=()=>tokenUrl[env==="debug"?0:1]
export const userInfoUrl=["http://localhost:8000/userInfo","http://api.fishstar.xyz/account/userInfo"]
export const getUserInfoUrl=()=>userInfoUrl[env==="debug"?0:1]

export const apiUrl="http://localhost:8001/question"
export const question='/getQuestionList'
export const addQuestion='/AddQuestion'
export const getQuestion='/getQuestion'
export const updateQuestion='/updateQuestion'

export const getQuestionListUrl=()=>`${apiUrl}${question}`
export const getQuestionUrl=()=>`${apiUrl}${getQuestion}`

export const getAddQuestionListUrl=()=>`${apiUrl}${addQuestion}`
export const getUpdateQuestionUrl=()=>`${apiUrl}${updateQuestion}`

//其他配置

//管理页面分类
export const folders:IFolder[] = [
    {
      icon: 'http://img.fishstar.xyz/question/file2.png',
      name: '已发布',
    },
    {
      icon: 'http://img.fishstar.xyz/question/plane.png',
      name: '未发布',
    },
    {
      icon: 'http://img.fishstar.xyz/question/trash.png',
      name: '回收站',
    },
  ];
//问卷状态：
export const QuestionStatus=["未发布","已发布","已删除","已停止"]


export const SampleQuestion:IQuestionare={
  "id": 0,
  "uid": 0,
  "problem": [
    {
      "types": 1,
      "title": "今日日期Date",
      "must": true,
      "infoType": 0,
      "dataType": 0
    },
    {
      "types": 1,
      "title": "姓名Name",
      "must": true,
      "infoType": 0,
      "dataType": 0
    },
    {
      "types": 1,
      "title": "学工号Student/Staff ID No.",
      "must": true,
      "infoType": 0,
      "dataType": 0
    },
    {
      "types": 0,
      "title": "今日是否因发热请假未到岗（教职工）或未返校（学生）？Are you on leave due to fever?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否有发热症状(高于37.2℃)? Do you have a fever (above 37.5℃) today ?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否有咳嗽、呼吸道不畅、腹泻等其他症状？ Do you have cough, poor respiratory tract, diarrhea and other symptoms today?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否接触过新冠肺炎疑似感染者？ Have you met suspected Novel coronavirus pneumonia patient today?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否接触过新冠肺炎感染者？ Have you met confirmed Novel coronavirus pneumonia patient today？",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否被当地管理部门要求在集中隔离点医学观察？ Have you been isolated by the local authorities at centralized isolation point for medical observation today?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否居家隔离观察（居家非隔离状态填否）? Have you been in self-isolation at home today (select No if you are just stay at home but not isolated)?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否确诊疑似新冠肺炎？ Have you been diagnosed as suspected Novel coronavirus pneumonia patient?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否确诊新冠肺炎？ Have you been diagnosed as confirmed Novel coronavirus pneumonia patient?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "你是否做过核酸检测？Did you screen by COVID-2019 Nucleic Acid Diagnosis Kit?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "是否有任何与疫情相关的，值得注意的情况？ Do you have any situation related to the epidemic that deserves attention?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "是否已经申领校区所在地健康码？Have you got the health code of the city where the campus is located？",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日申领校区所在地健康码的颜色？What's the color of today's health code？",
      "choice": [
        "绿码 Green code",
        "红码 Red code",
        "红码 Red code",
        "橙码 Orange code"
      ],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "今日是否在校？ Are you on campus today?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "所在地点 Your Location",
      "choice": [
        "境内 in Chinese Mainland",
        "境外 outside Chinese Mainland"
      ],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 1,
      "title": "所在地点（请打开手机位置功能，并在手机权限设置中选择允许访问位置信息）Your location (Please turn on the location access function on your mobile phone and allow App to access your location)",
      "must": true,
      "infoType": 0,
      "dataType": 0
    },
    {
      "types": 0,
      "title": "你是否4月10日后从下列地区返回浙江（含经停）? Did you return to Zhejiang from the following areas after April 10th (including stopovers)？",
      "choice": [
        "武汉 Wuhan",
        "湖北（除武汉） Hubei (non-Wuhan regions)",
        "哈尔滨市 Harbin",
        "绥芬河市 Suifenhe",
        "满洲里市 Manzhouli",
        "广州市 Guangzhou",
        "深圳市 Shenzhen",
        "揭阳市 Jieyang",
        "吉林市 Jilin",
        "否 None of the above"
      ],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "本人家庭成员(包括其他密切接触人员)是否有近14日入境或近14日拟入境的情况？Have your family members (including other close contact persons）entered Chinese Mainland over the past 14 days or plan to enter Chinese Mainland in 14 days?",
      "choice": ["是Yes", "否No"],
      "must": true,
      "choiceType": 0
    },
    {
      "types": 0,
      "title": "",
      "choice": [
        "本人承诺： 上述信息真实准确。如有变化，及时更新相关信息并报告所在单位。 本人已知晓并将遵守政府和学校相关规定，配合做好疫情防控工作。 I agree: The above information is true and accurate. In case of changes, I will keep my information updated and report in a timely manner. I have understood and will abide by the relevant government and University regulations to facilitate the prevention and control of COVID-19 epidemic"
      ],
      "must": true,
      "choiceType": 0
    }
  ],
  "time": "",
  "answerCount": 0,
  "title": "测试标题",
  "subtitle": "测试副标题",
  "status": 0
}
