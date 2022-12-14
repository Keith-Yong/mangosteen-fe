/** 记帐页的输入面板 */
import { AxiosError } from "axios";
import { Button, Dialog } from "vant";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { useRouter } from "vue-router";
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
        const formData = reactive({
          kind: '支出',
          tags_id: [],
          amount: 0,
          happen_at: new Date().toISOString(),
        })
        const router = useRouter()
        const onError = (error: AxiosError<ResourceError>) => {
          if (error.response?.status === 422) {
            Dialog.alert({
              title: '出错',
              message: Object.values(error.response.data.errors).join('\n')
            })
          }
          throw error
        }
        const onSubmit = async () => {
          await http.post<Resource<Item>>('/items', formData,
            { params: { _mock: 'itemCreate' } }
          ).catch(onError)
          router.push("/items")
        }

        return () => (
           <MainLayout class={s.layout}>{
              {  title: () => '记一笔', //标题
              icon:() => <Icon name="left" class={s.navIcon}/>, // 图标
            //   default是什么？？
              default: () => <>  
              {/*  定义Tabs和Tab组件 */}
              {/* v-model绑定selected实现父子组件可以互相传递selected的值*/}
              <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab name="支出" >
              <Tags kind="expenses" v-model:selected={formData.tags_id[0]} />
              </Tab>
              <Tab name="收入">
              <Tags kind="income" v-model:selected={formData.tags_id[0]} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
            <InputPad
                  v-model:happenAt={formData.happen_at}
                  v-model:amount={formData.amount}
                  onSubmit={onSubmit} />
                </div>
              </div>
            </>
            } }</MainLayout>
           
        )
    }
})