import { defineComponent } from "vue";
import s from './First.module.scss'
import chart from '../../assets/icons/chart.svg'
import {RouterLink} from 'vue-router'
export const Third = defineComponent({
    setup: (props, context) => {
      return () => (
        <div class={s.wrapper}>
          <div class={s.card}>
           <img class={s.icon} src={chart}  />
            <h2>数据可视化<br />收支一目了然</h2>
          </div>

          <div class={s.actions}>
          {/* 在这里定义底部的两个按钮路由标签 */}
          {/* 如何完成下一页在中间，跳过在左边：做两个跳过，左边的隐藏处理 */}
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/welcome/4">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
          
          </div>
        </div>
      )
    }
  })