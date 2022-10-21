import { createApp } from 'vue'
// import App from './App.vue'
import { App } from './App'
import { Foo } from './views/Foo'
import { Bar } from './views/Bar'
import  {createRouter, createWebHashHistory} from 'vue-router'



// 2.定义路由
const routes =  [
    {path:'/',component:Foo},
    {path:'/about',component:Bar},

]

// 3.定义路由实例
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })


// createApp做了什么事？


// createApp(App).mount('#app')
const app = createApp(App)
// 5. 创建并挂载根实例
app.use(router)
// 挂载
console.log(1)
app.mount('#app')

