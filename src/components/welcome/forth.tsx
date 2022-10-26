import { FunctionalComponent } from "vue";
import s from './welcome.module.scss'
import cloud from '../../assets/icons/cloud.svg'

export const Forth:FunctionalComponent =() => {
  return (
    <div>
      <img class={s.icon} src={cloud} />
    </div>
  )
}

Forth.displayName = 'Forth'