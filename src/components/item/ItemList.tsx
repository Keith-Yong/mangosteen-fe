/**组件功能：记账页的明细列表 */
import { defineComponent, PropType } from "vue";
import s from './ItemList.module.scss'
export const  ItemList = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup:(props,context) => {
        return () => {
            <>

            <div class={s.wrapper}>hi</div>

            </>
        }
    }
})