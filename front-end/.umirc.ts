import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/login/index' ,exact:true,title:"问卷系统"},
    { path: '/login', component: '@/pages/login/index' ,exact:true,title:"登录"},
    { path: '/manage', component: '@/pages/manage/index' ,exact:true,title:"管理表单"},
    { path: '/callback', component: '@/pages/callback/index' ,exact:true,title:"登录中>>>"},
    { path: '/design/:qid', component: '@/pages/design/[qid]' ,exact:true,title:"设计问卷"},
    { path: '/answer/:qid', component: '@/pages/answer/[qid]' ,exact:true,title:"独角鲸问卷"}
  ],
});
