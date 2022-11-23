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
        },
        type: {
          type: String as PropType<'submit' | 'button'>
        }
      },

    setup:(props, context) => {
        return () => (
            // s[props.level]接受组件从外部传递过来的level参数，根据参数添加对应的样式
            <button type={props.type} class={[s.button, s[props.level]]}
            onClick={props.onClick} 
            >
                
                {context.slots.default?.()}

            </button>
        )

    }
})