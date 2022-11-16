/**组件功能：把导航栏封装成组件以 让别的页头可以复用 */
import { defineComponent } from "vue";
import { Navbar } from "../shared/Navbar";
import s from './MainLayout.module.scss'

// 
export const MainLayout = defineComponent({
    setup:(props, context) => {
        return () => (
            <div class={s.wrapper}>
                {/* 引入Navbar组件 */}
                <Navbar class={s.navbar}>
                    
                    {
                        {
                            // 把箭头函数的值传给default,icon
                            default:() => context.slots.title?.(),
                            icon:() => context.slots.icon?.(),

                        }
                    }
                </Navbar>
                    {context.slots.default?.()}
                    
            </div>
        )
    }
})