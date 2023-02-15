/**确认标签页 */
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { defineComponent, PropType, reactive } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Rules, validate } from "../../shared/validate";
import s from './Tag.module.scss'
import { TagForm } from './TagForm';
import { useRoute, useRouter } from 'vue-router';
import { BackIcon } from '../../shared/BackIcon';
import { Dialog } from 'vant';
import { http } from '../../shared/Http';

export const TagEdit = defineComponent({
    // props:{
    //     name:{
    //         type:String as PropType<string>
    //     }
    // },
    setup: (props,context) => {
      const route = useRoute()
      const numberId = parseInt(route.params.id!.toString())
      if(Number.isNaN(numberId)){
        return ()=> <div>id 不存在</div>
      }

      const router = useRouter()
      const onError = () => {
        Dialog.alert({title:'提示', message:' 删除失败'})
      }
      const onDelete = async (Options?: {withItems?:boolean}) => {
        await Dialog.confirm( {
          title:'确认',
          message:'你真的要删除吗？'
        })
        await http.delete(`/tags/${numberId}`, {
          with_items: Options?.withItems ? 'true' : 'false'
        },{_autoLoading: true})
        .catch(onError)
        router.back()
      }
        
        return () => (
            
                <MainLayout>{{
                    title: () => '编辑标签',
                    icon:  () => <BackIcon />,
                    default: () => <>
                     <TagForm id={numberId} />
                      {/*  新增按钮标签 */}
                    <div  class={s.actions}>
                      {/* <Button level='danger' class={s.removeTags} >删除标签</Button>
                      <Button level='danger' class={s.removeTagsAndItems}>删除标签和记账</Button> */}
                       
                        <Button level='danger' class={s.removeTagsAndItems}
                          onClick={()=>onDelete({withItems: true})}>删除标签（对应记账也会被删除）</Button>
                    </div>                                                                                                                                                                             
                    
                    </>
                }}</MainLayout>
          
        )
    }
})