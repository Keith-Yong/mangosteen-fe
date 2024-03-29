/**组件功能：弹层内容 */
import { Dialog } from "vant";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useMeStore } from "../stores/useMestore";
import { Icon } from "./Icon";

import s from './Overlay.module.scss'

export const Overlay = defineComponent({
    // 将Onclose变量放入props属性中
    props: {
        // onClose内的数据类型是箭头函数
        onClose: {
            type: Function as PropType<() => void>
        }
    },
    setup:(props, context) => {
        const meStore = useMeStore()
        //  close函数内获取并调用onClose函数，可选
        const close = () => {

            props.onClose?.()
        }
        
        const route = useRoute()
        const me = ref<User>()
        // 发送请求
        onMounted( async () => {
            const response = await meStore.mePromise
            me.value = response?.data.resource
        })
        // 确认弹层
        const onSignOut = async () => {
            await Dialog.confirm({
                title:'确认',
                message: '你真的要退出登录吗？',
            })
            localStorage.removeItem('jwt')
            window.location.reload()
        }
        


        return () => {
            return <>
            {/* //  返回html的结构 ,mask样式在scss文件中 close作为点击事件绑定的函数 ，点击后开启获取关闭弹层*/}
            {/*onClick调用close函数  close函数调用onClose函数*/}
            {/*close函数控制弹层开启关闭的问题  */}
                <div class={s.mask} onClick={close}></div>
                <div class={s.overlay}>
                    {/* 弹层的html结构  */}
                    {/* 定义section弹层未登录时的样式 */}
                    <section class={s.currentUser}>
                        {me.value ? (
                            <div>
                                <h2 class={s.email}>{me.value.email}</h2>
                                <p onClick={onSignOut}>退出登录</p>
                            </div>
                        ): (
                        <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                            <h2>未登录用户</h2>
                            <h2>点击这里登录</h2>
                         </RouterLink>
                        )}
                    </section>
                    
                   
                    {/* nav标签中包含弹层的svg图片 */}
                    <nav>
                        {/*  定义ul的样式 */}
                        <ul class={s.action_list}>
                            <li>
                                <RouterLink to="/items/create" class={s.action}>
                                    {/* <Button class={s.button}>开始记账</Button> */}
                                    <Icon name="dolphin" class={s.icon} />
                                    <span>开始记账</span>
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/items" class={s.action}>
                                    {/* <Button class={s.button}>开始记账</Button> */}
                                    <Icon name="pig" class={s.icon} />
                                    <span>个人账单</span>
                                </RouterLink>
                            </li>



                            <li>
                                {/* Icon组件规定了必须传name，值的类型必须IconName的值 */}
                                {/* <Icon name="charts"></Icon><span>统计图表</span> */}
                                {/*  使用路由包裹svg图片，因为它们是链接。添加样式 */}
                                 <RouterLink to="/statistics" class={s.action}>
                                    <Icon name="chart" class={s.icon} />
                                    <span>统计图表</span>
                                </RouterLink>
                            </li>

                            <li>
                                {/* <Icon name="export"></Icon>
                                <span>导出数据</span> */}
                                <RouterLink to="/export" class={s.action}>
                                    <Icon name="export" class={s.icon}/>
                                     <span>导出数据</span>
                                </RouterLink>
                            </li>
                            <li>
                                {/* <Icon name="notify"></Icon>
                                <span>记账提醒</span> */}
                                <RouterLink to="/notify" class={s.action}>
                                    <Icon name="notify" class={s.icon}/>
                                     <span>记账提醒</span>
                                </RouterLink>
                            </li>
                        </ul>

                    </nav>

                    

                </div>
                
                </>
        }
    }
})

//  将弹层封装成可以复用的组件OverlayIcon 
export const OverlayIcon  = defineComponent({
    setup:(props, context) => {
        const refOverlayVisible = ref(false)
        
        const onClickMenu = () => {
            refOverlayVisible.value = !refOverlayVisible.value
          }
// 返回Icon组件和Overlay组件，设置组件执行的条件
    return () => (
    <>
                <Icon name="menu" class={s.icon} onClick={onClickMenu}/>
                {refOverlayVisible.value && 
                <Overlay onClose={() => refOverlayVisible.value = false} />
                }
            </>
    )
    }
})