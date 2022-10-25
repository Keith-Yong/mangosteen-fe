import { defineComponent } from "vue";
import s from './First.module.scss'

//  用于重构欢迎页
export const WelcomeLayout = defineComponent({
    //  step函数的箭头写法
    setup:(props,context) => {
        // 解构赋值获取插槽对象slots
        const {slots} = context 
        return () => (
            <div class={s.wrapper}>
                <div class={s.card}>
                    
                    {/* 调用slots对象的icons函数,？是可选 */}
                    {slots.icon?.()}
                    {slots.title?.()}
                    

                </div>
                <div class={s.actions}>
                    {/*  按钮插槽 */}
                     {slots.buttons?.()}


                </div>
            </div>

        )

    }
})