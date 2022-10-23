import { defineComponent } from "vue";
import {RouterView} from 'vue-router'
import s from './Welcome.module.scss'
import Logo from '../assets/icons/dolphin.svg'
// console.log(Logo)
//  定义欢迎页的主页
export const Welcome = defineComponent({
    setup:(props,context) => {
        // s.wrapper为什么会对所有路由的样式都有影响？
        return () => <div class={s.wrapper}>
       
        <header>
            <img src={Logo}  />
            <h1>海豚记账</h1>
        </header>
        <main class={s.main}><RouterView/></main>
        
        
        </div>
    }
})