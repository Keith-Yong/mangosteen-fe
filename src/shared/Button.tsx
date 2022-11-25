//  start页面第一个按钮

import { computed, defineComponent, PropType, ref } from "vue";
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
          type: String as PropType<'submit' | 'button'>,
          default:'button'
        },
        // 该属性决定按钮能否点击
        disabled : {
          type:Boolean,
          default: false
        },
        // 该属性决定 为什么
        autoSelfDisabled: {
          type: Boolean,
          default: false
        }
      },

    setup:(props, context) => {
        const selfDisabled  = ref(false) // 初始化布尔值变量
        const _disabled = computed( () => {  // 计算属性函数：为什么
          if(props.autoSelfDisabled === false) {
            return props.disabled
          }
          if(selfDisabled.value) {
            return true
          }else{
            return props.disabled
          }
        })
        //onClick函数 ，触发后执行props.onClick函数,计时器每5秒设置selfDisabled为false
        const onClick = () => {
          props.onClick?.() //什么意思
          selfDisabled.value = true
          setTimeout(() => {
            selfDisabled.value = false
          }, 500);
        }
        
        return () => (
            // s[props.level]接受组件从外部传递过来的level参数，根据参数添加对应的样式
            <button  disabled={_disabled.value}  type={props.type} class={[s.button, s[props.level]]}
            onClick={onClick} >
            
                
                {context.slots.default?.()}

            </button>
        )

    }
})