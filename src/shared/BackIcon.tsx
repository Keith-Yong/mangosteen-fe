import { Icon } from "./Icon";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export const BackIcon = defineComponent({
    setup: (props,context) => {
        const route = useRoute( )
        const router = useRouter()    
        // onclick函数
        const onClick = () => {
            const { return_to} = route.query;
            if (return_to) {
                router.push(return_to.toString())
            } else {
                router.back() // 返回原有页面
            }
        };
        return () => <Icon name="left" onClick={onClick}/>
    }
});