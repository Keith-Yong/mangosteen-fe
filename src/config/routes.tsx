

import {RouteRecordRaw} from "vue-router"

import { Welcome } from "../views/Welcome";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ForthActions } from "../components/welcome/ForthActions";

import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { StatisticsPage } from "../views/StatisticsPage";
import {SignInPage} from "../views/SignInPage"
import { http } from "../shared/Http";
import { ComingSoon } from "../shared/ComingSoon";
// 新建routes.tsx存放路由
//  定义组件
// RouteRecordRaw获得配置子路由的属性children
export const routes:RouteRecordRaw[] =  [
    {path:'/',redirect:'/welcome'},
    {
      path: '/welcome',
      component: ()=> import('../views/Welcome'),

      
      beforeEnter : (to,from,next) => {
        localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next()   //next('/start')表示会跳转到/start路径，next()自动执行后面的流程
      },
      
      children: [
      { path: '' ,redirect:'/welcome/1',},
      { path: '1', name:'Welcome1', components: {main:First,footer:FirstActions}, },
      { path: '2', name:'Welcome2', components: {main:Second,footer:SecondActions}, },
      { path: '3', name:'Welcome3', components: {main:Third,footer:ThirdActions}, },
      { path: '4', name:'Welcome4', components: {main:Forth,footer:ForthActions}, },
    ]
 },
     
      {
        path:'/items', component:()=> import('../views/ItemPage'),
        // beforeEnter: async (to,from,next) =>{
        //  await http.get('/me').catch( () => { //在请求items路由时调用get('/me')，如果请求失败路由将变成sign_in?return_to+目标路由，成功则走next()
        //      next('sign_in?return_to=' + to.path)
        //   })

        //   next()

          
        // },
        children:[
          {path:'', component:ItemList },
          {path:'create', component:ItemCreate},
        ]
      },
      {
        path:'/tags', component:()=> import('../views/TagPage'),
        children:[
          {path:'create', component:()=> import('../components/tag/TagCreate') },
          {path:':id/edit', component:()=> import('../components/tag/TagEdit') }
        ]
      },
      {
        path: '/sign_in',component:()=> import('../views/SignInPage')
      },
      {
        path: '/statistics', component: ()=> import('../views/StatisticsPage')
      },{
        path: '/export', component: ()=> import('../shared/ComingSoon')
      },{
        path: '/notify', component: ComingSoon
      }

]