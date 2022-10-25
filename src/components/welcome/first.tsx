import { defineComponent } from "vue";
import s from './First.module.scss'
import pig from '../../assets/icons/Piggybank.svg'
import {RouterLink} from 'vue-router'
export const First = defineComponent({
    setup: (props, context) => {
      return () => (
        <div class={s.wrapper}>
          <div class={s.card}>
           <img src={pig} />
            <h2>会赚钱<br />还要会省钱</h2>
          </div>

          <div class={s.actions}>
          {/* 在这里定义底部的两个按钮路由标签 */}
          {/* 如何完成下一页在中间，跳过在左边：做两个跳过，左边的隐藏处理 */}
          <RouterLink class={s.fake} to="start">跳过</RouterLink>
          <RouterLink to="welcome/2">下一页</RouterLink>
          <RouterLink to="start">跳过</RouterLink>
          
          </div>
        </div>
      )
    }
  })