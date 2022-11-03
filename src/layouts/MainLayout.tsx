/**组件功能：把导航栏封装成组件以 让别的页头可以复用 */
import { defineComponent } from "vue";
import { Navbar } from "../shared/Navbar";

// 
export const MainLayout = defineComponent({
    setup:(props, context) => {
        return () => (
            <div>
                {/* 引入Navbar组件 */}
                <Navbar>
                    {
                        {
                            // 把箭头函数的值传给default,icon
                            default:() => context.slots.title?.(),
                            icon:() => context.slots.icon?.(),

                        }
                    }
                </Navbar>
                    {context.slots.default?.()}
            </div>
        )
    }
})