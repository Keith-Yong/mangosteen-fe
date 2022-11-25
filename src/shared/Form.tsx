/**封装表单成单独的组件 使可以用于不同页面的表单样式 */
import {  DatetimePicker, Popup } from "vant";
import { Button } from './Button';
import { computed, defineComponent, PropType, ref } from "vue";
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
import { Time } from "./time";
import { time } from "echarts";
import { getFriendlyError } from './getFriendlyError ';
export const Form  = defineComponent( {
    props: {
        onSubmit:{
        type: Function as PropType<(e: Event) => void>,
        }
    },
    setup: (props, context) => {
        return () => (
            <form class={s.form} onSubmit={props.onSubmit}>
              {context.slots.default?.()}
            </form>
          )
    }
    
})


export const FormItem = defineComponent ( {
    props: {
        label: {
          type: String
        },
    modelValue: {
        type: [String, Number]
    },
        type: {
        type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode'| 'select'>,
      },
      error: {
        type: String
        },
    placeholder:{type: String,},
    // options: Array as PropType<Array<{ value: string, text: string }>>
    options: { 
      type: Array as PropType<Array<{value:string,text:string}>>
    },
    //onClick属性是箭头函数
    onClick : {
      type:Function as PropType< () => void>},
    countForm : {
      type: Number,
      default: 5 // 定时器初始值为60
    },
    disabled: {
      type:Boolean,
    }
  },
    
    

    setup: (props, context) =>  {
        const refDateVisible = ref(false)

        const timer = ref<number>() //计时器初始化为空，
        const count = ref<number>(props.countForm) // 倒数时间：
       
        const isCounting = computed( () => !! timer.value)  //!!，第一个！是取反布尔值，第二个是恢复原值，但是是布尔值。初始为空所以是false
      
        //  计时器函数  改为函数，该函数会倒计时，直到0后重置计时器
        const startCount = () =>
         
          timer.value = setInterval ( () => {
            count.value -=1
           if (count.value === 0) {
              clearInterval(timer.value)
              timer.value =undefined
              count.value = props.countForm //重置为60
            }
          },1000)
          console.log('....')
          console.log(timer.value)

          context.expose( {startCount}) //使用expose导出组件内的函数
        

        const content = computed(() =>{
            switch (props.type) {
            case 'text':
                return <input
                value={props.modelValue}
                placeholder={props.placeholder}
                onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
                class={[s.formItem, s.input]} 
                />
            case 'emojiSelect':    
                return <EmojiSelect
                modelValue={props.modelValue?.toString()}
                onUpdateModelValue = {value => context.emit('update:modelValue', value)}
                class={[s.formItem, s.emojiList, s.error]} />
            case 'validationCode':
                    return <>
                        <input class={[s.formItem, s.input, s.validationCodeInput]}
                        value={props.modelValue}
                        onInput={(e: any) => context.emit('update:modelValue', e.target.value)} //修复input的值和formitem没有关联的bug

                        placeholder={props.placeholder} />
                        <Button  disabled={isCounting.value || props.disabled} onClick= {props.onClick} class={[s.formItem, s.button, s.validationCodeButton]}>
                        {/* isCounting状态为true则展示多少秒，否则展示固定文案  */}
                        {isCounting.value ? `${count.value}秒后可重新发送` :  '发送验证码'}
                        
                        </Button>
                    </>
            case 'select': //select类型返回的组件标签
              return <>
          
              <select class={[s.formItem ,s.select]} value={props.modelValue}
              onChange={(e:any) => {context.emit('update:modelValue'),e.target.value}}>
                {props.options?.map(option =>
                  <option value={option.value}>{option.text}</option>
                  )}
              </select>
              </>

            case 'date':
                return <>
                <input readonly={true} value={props.modelValue}
                  onClick={() => { refDateVisible.value = true }}
                  class={[s.formItem, s.input]} />
                <Popup position='bottom' v-model:show={refDateVisible.value}>
                  <DatetimePicker value={props.modelValue} type="date" title="选择年月日"
                    onConfirm={(date: Date) => {
                      context.emit('update:modelValue', new Time(date).format())
                      refDateVisible.value = false
                    }}
                    onCancel={() => refDateVisible.value = false} />
                </Popup></>
            case undefined:
                return context.slots.default?.()


            }
        })
        return () => {
            return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?  getFriendlyError(props.error):'　'}</span>
          </div>
        </label>
      </div>
        }
    }
    
})