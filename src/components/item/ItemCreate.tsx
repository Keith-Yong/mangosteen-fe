/** 记帐页的输入面板 */
import { defineComponent, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<String>

        }
    },
    setup:(props,context) => {
        //  定义响应式变量支出
        const refKind = ref('支出')

        return () => (
           <MainLayout>{
              {  title: () => '记一笔', //标题
              icon:() => <Icon name="left" class={s.navIcon}/>, // 图标
            //   default是什么？？
              default: () => <>  
              {/*  定义Tabs和Tab组件 */}
              {/* v-model绑定selected实现父子组件可以互相传递selected的值*/}
              <Tabs v-model:selected={refKind.value}>
                <Tab name="支出">
                    icon 列表
                </Tab>
                <Tab name="收入">
                    icon 列表2
                </Tab>
              </Tabs>
              {/*  引入 InputPad组件*/}
              <div class={s.inputPad_wrapper}>
                <InputPad/>
                </div>
              </>
            }
            }</MainLayout>
           
        )
    }
})