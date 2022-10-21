import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import {RouteRecordRaw} from "vue-router"



// 新建routes.tsx存放路由





//  定义组件
// RouteRecordRaw获得配置子路由的属性children
export const routes:RouteRecordRaw[] =  [
    {path:'/',component:Foo},
    {path:'/about',component:Bar},
    {
        path:'/welcome',
    component:Foo,
    // 用children属性配置子路由
    children:[
        {path:'/1',component:Foo,},
        {path:'/2',component:Foo,},
        {path:'/3',component:Foo,},
        {path:'/4',component:Foo,},
    ]
}

]