/** 记帐页的输入面板 */
import { defineComponent, PropType } from "vue";
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<String>

        }
    },
    setup:(props,context) => {
        return () => (
            <div class={s.wrapper}>hi</div>
        )
    }
})