import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/login/index' ,exact:true,title:"问卷系统"},
    { path: '/login', component: '@/pages/login/index' ,exact:true,title:"登录"},
    { path: '/manage', component: '@/pages/manage/index' ,exact:true,title:"管理表单"},
    
    
  ],
});
