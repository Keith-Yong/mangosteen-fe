//  start页面第一个按钮

import { defineComponent, PropType } from "vue";
import s from './Button.module.scss'
interface Props {
   
}
// Props??
export const Button = defineComponent({
    //  新增两个props的参数onClick和level，外部引用Button组件可以传递该参数
    props: {
        onClick: {
          type: Function as PropType<(e: MouseEvent) => void>
        },
        level: {
          type: String as PropType<'important' | 'normal' | 'danger'>,
          default: 'important'
        }
      },

    setup:(props, context) => {
        return () => (
            <button class={s.button}>
                
                {context.slots.default?.()}

            </button>
        )

    }
})