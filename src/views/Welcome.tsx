import { defineComponent } from "vue";
import {RouterView} from 'vue-router'
//  定义欢迎页的主页
export const Welcome = defineComponent({
    setup:(props,context) => {
        return (
       
        <div><RouterView/></div>
        )
    }
})