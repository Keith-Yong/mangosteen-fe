import { createApp } from 'vue'
// import App from './App.vue'
import { App } from './App'
import { routes } from './config/routes';

import  {createRouter} from 'vue-router'
import { history } from './shared/history';



// 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
// `routes: routes` 的缩写
const router = createRouter({history,routes })
    
// createApp做了什么事？


// createApp(App).mount('#app')
const app = createApp(App)
// 5. 创建并挂载根实例
app.use(router)
// 挂载

app.mount('#app')

