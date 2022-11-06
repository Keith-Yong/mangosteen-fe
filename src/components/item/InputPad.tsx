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
        //  appendText函数传入数字或字符串都转化为字符串
        const appendText = (n:number | string) => refAmount.value += n.toString()
        
        //  按键上的按钮,点击后调用appendText函数
        const buttons = [
            {text:'1',onClick: () => {appendText(1)}}, // 存放文本和函数
            {text:'2',onClick: () => {appendText(2)}},
            {text:'3',onClick: () => {appendText(3)}},
            {text:'4',onClick: () => {appendText(4)}},
            {text:'5',onClick: () => {appendText(5)}},
            {text:'6',onClick: () => {appendText(6)}},
            {text:'7',onClick: () => {appendText(7)}},
            {text:'8',onClick: () => {appendText(8)}},
            {text:'9',onClick: () => {appendText(9)}},
            {text:'.',onClick: () => {appendText('.')}},
            {text:'0',onClick: () => { appendText(0)}},
            {text:'清空', onClick: () => { } },
            {text:'提交', onClick: () => { } },
            
        ]

        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
        const refAmount = ref('') //键盘上显示的数字初始值为空字符串
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
                        
                {/* //键盘上显示的数字 */}
                <span class={s.amount}>{refAmount.value}</span>
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