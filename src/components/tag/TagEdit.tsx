/**确认标签页 */
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { defineComponent, PropType, reactive } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Rules, validate } from "../../shared/validate";
import s from './Tag.module.scss'
import { TagForm } from './TagForm';

export const TagEdit = defineComponent({
    // props:{
    //     name:{
    //         type:String as PropType<string>
    //     }
    // },
    setup: (props,context) => {

        const formData = reactive({
            name: '',
            sign: '',
          })
          const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
          const onSubmit = (e: Event) => {
            const rules: Rules<typeof formData> = [
              { key: 'name', type: 'required', message: '必填' },
              { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
              { key: 'sign', type: 'required', message: '必填' },
            ]
            Object.assign(errors, {
              name: undefined,
              sign: undefined
            })
            Object.assign(errors, validate(formData, rules))
            e.preventDefault()
          }


        return () => (
            
                <MainLayout>{{
                    title: () => '新建标签',
                    icon:  () => <Icon name="left" onClick={ () => {} }></Icon>,
                    default: () => <>
                      <TagForm />
                      {/*  新增按钮标签 */}
                    <div  class={s.actions}>
                      <Button level='danger' class={s.removeTags} >删除标签</Button>
                      <Button level='danger' class={s.removeTagsAndItems}>删除标签和记账</Button>
                    </div>
                    
                    </>
                }}</MainLayout>
          
        )
    }
})