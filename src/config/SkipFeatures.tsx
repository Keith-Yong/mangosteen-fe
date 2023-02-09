import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
/**组件内容：把跳过封装成routelink功能，实现自动跳转 */
export const SkipFeatures  = defineComponent( {
    setup: (props, context) => {
        //把skipFeatures存放到localStorage中
        const onClick = () => {
        localStorage.setItem('skipFeatures', 'yes') 
    }
    
    return () => (
        // 点击后触发onClick函数
        // 路由跳转到start页面
        <span onClick={onClick}>
            <RouterLink to="/items">跳过</RouterLink>
        </span>
    )
}
})


