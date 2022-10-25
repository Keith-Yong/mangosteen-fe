import { defineComponent } from "vue";
import s from './First.module.scss'
import cloud from '../../assets/icons/cloud.svg'
import {RouterLink} from 'vue-router'
export const Forth = defineComponent({
    setup: (props, context) => {
      return () => (
        <div class={s.wrapper}>
          <div class={s.card}>
           <img src={cloud} />
            <h2>云存储<br />再也不用担心数据丢失</h2>
          </div>

          <div class={s.actions}>
          {/* 在这里定义底部的两个按钮路由标签 */}
          {/* 如何完成下一页在中间，跳过在左边：做两个跳过，左边的隐藏处理 */}
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/start">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
          
          </div>
        </div>
      )
    }
  })