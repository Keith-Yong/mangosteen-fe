import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import {RouteRecordRaw} from "vue-router"

import { Welcome } from "../views/Welcome";
import { First } from "../components/welcome/first";
import { Forth } from "../components/welcome/forth";
import { Second } from "../components/welcome/second";
import { Third } from "../components/welcome/third";
// 新建routes.tsx存放路由
//  定义组件
// RouteRecordRaw获得配置子路由的属性children
export const routes:RouteRecordRaw[] =  [
    {path:'/',component:Foo},
    {path:'/about',component:Bar},
    {path: '/welcome',component: Welcome,
    children: [
      { path: '1', component: First, },
      { path: '2', component: Second, },
      { path: '3', component: Third, },
      { path: '4', component: Forth, },
    ]
 }

]