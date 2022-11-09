//  start页面第一个按钮

import { defineComponent } from "vue";
import s from './Button.module.scss'
interface Props {
    // 设置onClick属性为可选
    onClick?: (e:MouseEvent) => void
}
// Props??
export const Button = defineComponent<Props>({
    setup:(props, context) => {
        return () => (
            <button class={s.button}>
                
                {context.slots.default?.()}

            </button>
        )

    }
})