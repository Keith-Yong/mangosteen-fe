import { defineComponent } from "vue";

// 声明组件并导出
export const Foo = defineComponent({
    setup: (props,context) => {
        return () => <>
             <div>Foo</div>
             </>
    }
})