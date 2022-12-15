/** 记帐页的输入面板 */
import { Button } from "vant";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { useTags } from "../../shared/useTags";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss'
import { Tags } from "./Tags";

export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<String>

        }
    },
    setup:(props,context) => {
        //  定义响应式变量支出
        const refKind = ref('支出')
     

       
        const refTagId = ref<number>()
        const refHappenAt = ref<string>(new Date().toISOString())
        const refAmount = ref<number>(0)

        return () => (
           <MainLayout class={s.layout}>{
              {  title: () => '记一笔', //标题
              icon:() => <Icon name="left" class={s.navIcon}/>, // 图标
            //   default是什么？？
              default: () => <>  
              {/*  定义Tabs和Tab组件 */}
              {/* v-model绑定selected实现父子组件可以互相传递selected的值*/}
              <div class={s.wrapper}>
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name="支出" >
              {refAmount.value}
                <Tags kind="expenses" v-model:selected={refTagId.value} />
              </Tab>
              <Tab name="收入">
              <Tags kind="income" v-model:selected={refTagId.value} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
            <InputPad
                v-model:happenAt={refHappenAt.value}
                v-model:amount={refAmount.value} />
                </div>
              </div>
            </>
            } }</MainLayout>
           
        )
    }
})