import { defineComponent, PropType } from "vue";
import s from "./Navbar.module.scss"

// 定义Navbar组件
export  const Navbar = defineComponent({
    // 在props属性定义变量Name，使用name需要通过props获取
    props: {
        name:{
            type: String as PropType<string> // name的类型是String
        }
    },
    setup: (props, context) => {
        // 解构赋值获取context中内置的属性slots
        const {slots} = context
        //  返回箭头函数（）=>
        return () => {
            //  返回标签模板
            return <>
                <div class={s.navbar}>
                    <span class={s.icon_wrapper}>
                        {slots.icon?.()}
                    </span>
                    <span class={s.title_wrapper}>
                        {slots.default?.()}
                    </span>
                </div>
                </>
            }
        
    }
})
