import { defineComponent,h,Transition,VNode} from "vue";
import {RouteLocationNormalizedLoaded,RouterView} from 'vue-router'
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
        {/* <main class={s.main}><RouterView/></main> */}
        <main class={s.main}>
            <RouterView name="main">
                {/* vue3中动画组件要大写的Transition */}
                {/* 一个箭头函数，ts语法把组件X传入后，加入动画效果 */}
            {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
            <Transition 
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to} 
                leaveActiveClass={s.slide_fade_leave_active}>
              
                {/* X指的是路由传进来的组件，写在这里是把动画加在组件中 */}
              {X}
            </Transition>
          }
            </RouterView>
        </main>
        <footer>
            <RouterView name="footer"/>
        </footer>
        
        
        </div>
    }
})