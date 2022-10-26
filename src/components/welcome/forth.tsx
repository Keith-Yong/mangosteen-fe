import { FunctionalComponent } from "vue";
import s from './welcome.module.scss'



export const Forth:FunctionalComponent =() => {
  return (
    <div class={s.card}>
      <svg>
      <use xlinkHref='#cloud'></use>
    </svg>
      <h2>云端存储<br />数据不会丢失</h2>
    </div>
  )
}

Forth.displayName = 'Forth'