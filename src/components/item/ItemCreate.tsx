/** 记帐页的输入面板 */
import { defineComponent, onMounted, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
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

       onMounted( async() => {
        const response = await http.get <{resources:Tag[]}>('/tags', {
          kind: 'expenses',
          _mock: 'tagIndex'
        })
        refExpensesTags.value = response.data.resources //异步请求,会在变量命名后再执行
       })
       const refExpensesTags  = ref<Tag[]>([])

       onMounted(async () => {
        const response = await http.get<{ resources: Tag[] }>('/tags', {
          kind: 'income',
          _mock: 'tagIndex'
        })
        refIncomeTags.value = response.data.resources
      })
      const refIncomeTags = ref<Tag[]>([])

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
              <Tab name="支出" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {refExpensesTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {refIncomeTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
                </div>
              </div>
            </>
            } }</MainLayout>
           
        )
    }
})