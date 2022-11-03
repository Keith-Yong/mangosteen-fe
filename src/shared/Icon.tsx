import { defineComponent,defineProps, PropType } from "vue";
import s from './Icon.module.scss'

export type IconName = 'add'|'chart'|'clock'|'cloud'|'dolphin'|'pig'|'menu'
export const Icon = defineComponent({
    props: {
        name:{
            type: String as PropType<IconName>,
            required: true,
            
        }
    },
    //  ??z
    setup: (props,context) => {
        return () => (
            <svg class={s.icon}>
                <use xlinkHref={'#' + props.name}>

                </use>

            </svg>
        )
    }
})

//制作Icon组件