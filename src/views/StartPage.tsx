import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import s from './StartPage.module.scss';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi')
    }
    return () => (
      <div>
        {/* 定义pig的图片以及按钮 */}
        
        {/* 引入Center组件和icon组件，构建pig svg图 需要在pig前加上后缀使得样式生效 */}
        {/* 引入Navabar组件 */}
        {/* ??两个花括号是什么意思 */}
       <Navbar>{
            {
                default:'海豚记账',
                icon: <Icon name="menu" class={s.navIcon}/>
            }
        }
       </Navbar>
        <Center class={s.pig_wrapper}>
            {/* 在主页组件中引入Icon组件， 必须填写name属性，值为4个 */}
            <Icon name='pig'  class={s.pig}/>

        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>开始记账</Button>
        </div>
        <FloatButton iconName='add'/>
        
      </div>
    )
  }
})