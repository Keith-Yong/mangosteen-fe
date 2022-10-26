

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
// 新建routes.tsx存放路由
//  定义组件
// RouteRecordRaw获得配置子路由的属性children
export const routes:RouteRecordRaw[] =  [
    {path:'/',redirect:'/welcome'},
    {
      path: '/welcome',
      component: Welcome,  
      children: [
      { path: '' ,redirect:'/welcome/1',},
      { path: '1', components: {main:First,footer:FirstActions}, },
      { path: '2', components: {main:Second,footer:SecondActions}, },
      { path: '3', components: {main:Third,footer:ThirdActions}, },
      { path: '4', components: {main:Forth,footer:ForthActions}, },
    ]
 }

]