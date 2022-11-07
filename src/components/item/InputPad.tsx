import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from './InputPad.module.scss';
import { time } from '../../shared/time';
import { DatetimePicker,NumberKeyboard, Popup } from "vant";

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
        // const appendText = (n:number | string) => refAmount.value += n.toString()
        const appendText = (n:number | string) => {
            const nString = n.toString() //转换为字符串
            const  doIndex = refAmount.value.indexOf('.') // 获取键盘上的数字中.的下标
            if (refAmount.value.length >= 13) { //长度最多13位
                return
            }
            //键盘上的数字存在符号点. ，且键盘上的数字的长度？？??怎么理解这个条件
            if (doIndex >= 0 && refAmount.value.length -doIndex >2){ 
                return
            }
            // 如果传入的参数是小数点，
            if (nString === '.') {
                if (doIndex >= 0) { // 已经有小数点了，则终止当前判断语句执行
                    return
                  }
                   // 如果输入键盘的是0，
            } else if  (nString === '0') {
                if (doIndex === -1){ //没有小数点
                    if(refAmount.value === '0'){ //但是有0，则不执行
                        return
                    }
                }
            } else {  
                if(refAmount.value === '0') {// 如果键盘显示的数值的是0，
                    refAmount.value = ''// 则置空，
                }
            }
            refAmount.value += n.toString() //键盘显示的数值是所有输入数值的拼接
        }
        
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
            {text:'清空', onClick: () => {refAmount.value = '0' } }, //清空即置0
            {text:'提交', onClick: () => { } },
            
        ]

        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
        const refAmount = ref('0') //键盘上显示的数字初始值为0
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