import { Button } from '../../shared/Button';
import { defineComponent, PropType, reactive, toRaw, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import s from './TagCreate.module.scss'
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({ //reactive包裹的对象成为响应式数据的对象
      name: '', //name输入的内容，sign指点击的内容初始化为空值
      sign: '',
    })

    let emoji = ref('')
    // <>内的内容:是一个对象。元素为单个的变量，可以为空
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})

    const onSubmit = (e: Event) => {
      e.preventDefault() //阻止点击确定后页面默认刷新

      // 定义数组，内部元素为对象组成
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex:/^.{1,4}$/,message:'只能填1到4个字符'}, ///^.{1,4}$/正则匹配逻辑：1到4个字符
        { key: 'sign', type: 'required', message: '必填' },
      ]
      Object.assign(errors, { name: undefined,sign: undefined}) //name和sign未定义的情况
      Object.assign(errors,validate(formData,rules)) //validate返回的是一个对象，errors也是一个对象，把validate返回对象的属性继承给errors
      //{'name': ['必填', '只能填1到4个字符']}
    }

    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="left" onClick={() => { }} />,
        default: () => (
          //   <form>
          //     <div>
          //       <label>
          //         <span>标签名</span>
          //         <input></input>

          <form class={s.form} onSubmit={onSubmit}>
            <div class={s.fromRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>标签名 {emoji.value}</span>
                <div class={s.formItem_value}>
                  {/* formData.name用v-model实现双向绑定 */}
                  <input v-model={formData.name} class={[s.formItem, s.input, s.error]} ></input>

                </div>
                <div class={s.formItem_errorHint}>
                  {/*errors['name']的值也就是message信息 */}
                  <span>{errors['name'] ? errors['name'][0] : ''}</span>
                    

                </div>
              </label>
            </div>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>符号{formData.sign}</span>
                <div class={s.formItem_value}>
                  {/* error样式的含义 v-model使formData.sign成为父子组件双向绑定属性*/}
                  {/*  formData.sign改成emoji变化的值*/}
                  <EmojiSelect  v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]}  />
                </div>
                <div class={s.formItem_errorHint}>
                  {/* <span>必填</span> */}
                  <span>{errors['sign'] ? errors['sign'][0] : '　'}</span>
                </div>
              </label>

              <div>
                <p class={s.tips}>记账时长按标签即可进行编辑</p>
                <div class={s.formRow}>
                  <div class={s.formRow_value}>
                    <Button class={[s.formItem, s.button]}>确定</Button>
                  </div>
                </div>
              </div>

            </div>
          </form>
        )
      }}</MainLayout>
    )
  }
})