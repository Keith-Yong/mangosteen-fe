import { defineComponent, h, ref, Transition, VNode, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import s from './Welcome.module.scss'
// import Logo from '../assets/icons/dolphin.svg'
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";
// console.log(Logo)
//  定义欢迎页的主页

// 
const pushMap: Record<string, string> = {
    'Welcome1': '/welcome/2',
    'Welcome2': '/welcome/3',
    'Welcome3': '/welcome/4',
    'Welcome4': '/items',
}

export const Welcome = defineComponent({
    setup: (props, context) => {

        const main = ref<HTMLElement>()
        // console.log('main', main)
        const { direction, swiping } = useSwipe(main, { beforeStart: e => e.preventDefault() }) //获取滑动方向，是否滑动

        // console.log('direction', direction.value)
        // console.log('swiping', swiping.value)
        const route = useRoute() //获取自定义的路由组件对象
        const router = useRouter() //获取内置的路由器对象
        //  自定义push函数，即throttle函数，实现根据不同的路由名称，
        const replace = throttle(() => {
            const name = (route.name || 'Welcome1').toString()
            router.replace(pushMap[name])

        }, 500)

        watchEffect(() => {
            if (swiping.value && direction.value === 'left') {
                console.log(2)
                replace() //在滑动且向左时，执行push函数
            }
        }
        )



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
                <RouterView name="footer" />
            </footer>


        </div>
    }
})