import { defineComponent } from "vue";
import s from './First.module.scss'
import pig from '../../assets/icons/pig.svg'
import {RouterLink} from 'vue-router'

import { WelcomeLayout} from "./WelcomeLayout";
export const First = defineComponent({
    setup: (props, context) => {
       //  定义一个对象slots 第一个页面的插槽内容
      const slots = {
        //icon title是函数
          icon:() => <img src={pig} />,
          title:() => <h2>会赚钱<br />还要会省钱</h2>,
          buttons:() => <>
            <RouterLink class={s.fake} to="start">跳过</RouterLink>
            <RouterLink to="/welcome/2">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>

      }
      return () => (
      //   返回
      <WelcomeLayout v-slots={slots}></WelcomeLayout>
      
       


      
      )
    }
  })