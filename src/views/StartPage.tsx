import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';
import s from './StartPage.module.scss';
export const StartPage = defineComponent({
  setup: (props, context) => {
    
        // 响应式数据：布尔值变量refOverlayVisible，初始为否
        const refOverlayVisible = ref(false)
        const onClickMenu = () => {
        // 让响应式数据值可以自动重置
        refOverlayVisible.value = !refOverlayVisible.value
      }
    
    return () => (
      <div>
        {/* 定义pig的图片以及按钮 */}
        
        {/* 引入Center组件和icon组件，构建pig svg图 需要在pig前加上后缀使得样式生效 */}
        {/* 引入Navabar组件 */}
        {/* !!两个花括号是什么意思,第一个是胡子语法，第二个大括号是Navbar组件规定的参数，需要传给Navbar组件中 */}
       <Navbar>{
            {
                default:() => '海豚记账',
                // menu标签点击后触发onClickMenu函数,
                icon:() =>  <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
               
            }
        }
       </Navbar>
        <Center class={s.pig_wrapper}>
            {/* 在主页组件中引入Icon组件， 必须填写name属性，值为4个 */}
            <Icon name='pig'  class={s.pig}/>

        </Center>
        <div class={s.button_wrapper}>
            {/* 给开始按钮标签添加路由 */}
            <RouterLink to="/items/create"> 
                <Button class={s.button} >开始记账</Button>
            </RouterLink>
        </div>
        {/* 给add按钮添加路由 */}
        <RouterLink to="/items/create"> 
        <FloatButton iconName='add'/>
        </RouterLink>
        
        {/*refOverlayVisible参数的值是Overlay组件是否展示的条件，默认是false  */}
        {refOverlayVisible.value && 
        // onclose函数会 重置refOverlayVisible的值，
        <Overlay onClose={ () => refOverlayVisible.value =false }/>
        }
        
        
      </div>
    )
  }
})