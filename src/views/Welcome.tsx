import { defineComponent,h,ref,Transition,VNode, watchEffect} from "vue";
import {RouteLocationNormalizedLoaded,RouterView} from 'vue-router'
import s from './Welcome.module.scss'
// import Logo from '../assets/icons/dolphin.svg'
import { useSwipe } from "../hooks/useSwipe";
// console.log(Logo)
//  定义欢迎页的主页
export const Welcome = defineComponent({
    setup:(props,context) => {
        // 通过ref获取main标签内所有的html元素
        const main = ref<HTMLElement>()
       
        // main作为入参调用useSwipe函数获取返回值解构赋值获取
        // 变量direction, swiping
        const {direction, swiping} = useSwipe(main)
        
        // 类似于vue2的watch
        watchEffect(() => {
            console.log(swiping.value, direction.value)
        })
        
        return () => <div class={s.wrapper}>
       
        <header>
            
            <svg>
                <use xlinkHref='#dolphin'></use>
            </svg>

            {/* <img src={Logo}  /> */}
            <h1>海豚记账</h1>
        </header>
        {/* <main class={s.main}><RouterView/></main> */}
        <main class={s.main} ref={main}>
            <RouterView name="main">
                {/* vue3中动画组件要大写的Transition */}
                {/* 一个箭头函数，ts语法把组件X传入后，加入动画效果 */}
            {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
            <Transition 
                enterFromClass={s.slide_fade_enter_from} //卡片从右侧进入的样式
                enterActiveClass={s.slide_fade_enter_active}//卡片位于页面当中的样式
                leaveToClass={s.slide_fade_leave_to} //卡片从左侧移出的样式
                //卡片位于页面当中的样式
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