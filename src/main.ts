import { createApp } from 'vue'
// import App from './App.vue'
import { App } from './App'
import { routes } from './config/routes';

import  {createRouter} from 'vue-router'
import { history } from './shared/history';


import '@svgstore';
import { fetchMe, mePromise } from './shared/me';
// 在main.js内
// import VConsole from 'vconsole';
// const isDebug = true;
// 本地开发调试注入vConsole
// if (isDebug) {
//     new VConsole();
// }


// 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
// `routes: routes` 的缩写
const router = createRouter({history,routes })

fetchMe() //请求me接口

// // 用router.beforeEach函数实现路由的拦截作用
// router.beforeEach( async (to, from ) => {
//     //函数内容：当路径是非if条件中的，则promise请求me接口
//     if (to.path === '/' || to.path.startsWith('./welcome')||
//     to.path.startsWith('/sign_in') || to.path === '/start') {
//         return true
//     } else {
//         // 不满足条件，则把路由路径拼接到字符串sign_in上
//         const path  = await mePromise!.then(
//             () => true,
//             () => 'sign_in?return_to' + to.path
//         )
//         return path

// 规定whiteList是对象，且键必须是字符串，值只能是规定的值
const whiteList:Record<string, 'exact' | 'startsWith'> = {
    '/': 'exact',
    '/items':'exact',
    '/welcome':'startsWith',
    '/sign_in':'startsWith',

}

// 用router.beforeEach函数实现路由的拦截作用
router.beforeEach( (to,from) => {
    for (const key in whiteList) {
        const value = whiteList[key]
        if ( to.path === key && value === 'exact') {
            return true
        }
        if (value === 'startsWith' && to.path.startsWith(key)) {
            return true
        } 
    }
    return mePromise!.then(
        () => true,
        () => '/sign_in?return_to=' + to.path
    )
} )










// createApp(App).mount('#app')
const app = createApp(App)
// 5. 创建并挂载根实例
app.use(router)
// 挂载

app.mount('#app')

