import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from './InputPad.module.scss';
import { time } from '../../shared/time';
import { DatetimePicker, Popup } from "vant";

/**键盘数字 */
export const InputPad =defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props,context) => {
       
        const now = new Date()//？？??
        const refDate = ref<Date>(now) //？？??
        
        //  按键上的按钮,
        const buttons = [
            {text:'1',onClick: () => {}}, // 存放文本和函数
            {text:'2',onClick: () => {}},
            {text:'3',onClick: () => {}},
            {text:'清空',onClick: () => {}},
            {text:'4',onClick: () => {}},
            {text:'5',onClick: () => {}},
            {text:'6',onClick: () => {}},
            {text:'+',onClick: () => {}},
            {text:'7',onClick: () => {}},
            {text:'8',onClick: () => {}},
            {text:'9',onClick: () => {}},
            {text:'-',onClick: () => {}},
            {text:'.',onClick: () => {}},
            {text:'0',onClick: () => {}},
            {text:'删',onClick: () => {}},
            {text:'提交',onClick: () => {}},
            
        ]
        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
        
        return () => 
        <>
            <div  class={s.dateAndAmount}>
                <span class={s.date}>
                    <Icon name="date" class={s.icon}/>
                        <span>
                          
                            {/* {不懂？？??} */}
                            {/* 使用vant的Popup和DatetimePicker组件实现日期选择器的功能 */}
                            <span onClick={showDatePicker}>{time(refDate.value).format()}</span>
                            <Popup position="bottom" v-model:show={refDatePickerVisible.value}>
                                <DatetimePicker v-model={refDate.value} type="date"
                                title="选择年月日" onConfirm={setDate} onCancel={hideDatePicker}
                                />
                            </Popup>
                            </span>
                        </span>
                        
            
                <span class={s.amount}>199.12</span>
            </div>
            {/*  对buttons对象进行map函数处理返回新的Button列表 */}
            <div class={s.buttons}>
                    {buttons.map( button => 
                <button onClick={button.onClick}>
                    {button.text}
                </button>
                    )}
            </div>
            
           
        
        </>
    }
})