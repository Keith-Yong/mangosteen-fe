import { defineComponent,defineProps, PropType } from "vue";
import s from './Icon.module.scss'
// 定义变量IconName的类型，包含所有的Svg图片
export type IconName = 'add'|'chart'|'clock'|'cloud'|'dolphin'|'pig'|'menu'| 'charts' | 'notify' | 'export'
export const Icon = defineComponent({
    // 在这里规定Icon组件对象属性必传name属性，值的类型必须是IconName中规定的类型
    props: {
        name:{
            type: String as PropType<IconName>,
            required: true,
            
        },
        onClick:{
            type: Function as PropType<(e:MouseEvent) => void>
        }
    },
    //  
    
    setup: (props,context) => {
        return () => (
            <svg class={s.icon} onClick={props.onClick}>
                <use xlinkHref={'#' + props.name}>

                </use>

            </svg>
        )
    }
})

//制作Icon组件