// 让start页面的图片居中
import { defineComponent, PropType } from "vue";
import s from './Center.module.scss'
// 定义Map对象键值对
const directionMap = {
    '_': 'horizontal',
    '|':'vertical',
    'horizontal':'horizontal',
    'vertical':'vertical'
}
//  定义组件内容
export const Center = defineComponent({
    // 将directionMap对象绑定到props属性上，通过props获取directionMap对象
    props: {
        direction: {
            // 定义direction的值类型为字符串,
            type: String as PropType<'_' | '|' | 'horizontal' | 'vertical'>,
            //  设置默认属性
            default:'horizontal'
        }
    },

    setup:(props,context) => {
        // 通过props属性获取direction的值
        const extraClass = directionMap[props.direction]
        //  返回值暂时为插槽
        return () => (
            // class中extraClass的值可以在scss文件中自定义
           <div class={[s.center, extraClass]}>
            {context.slots.default?.()}
           </div>
        )
    }
})


