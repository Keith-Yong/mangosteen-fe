import { FunctionalComponent } from "vue";
import s from './welcome.module.scss'
import cloud from '../../assets/icons/cloud.svg'


export const Forth:FunctionalComponent =() => {
  return (
    <div class={s.card}>
      <img class={s.icon} src={cloud} />
      <h2>云端存储<br />数据不会丢失</h2>
    </div>
  )
}

Forth.displayName = 'Forth'