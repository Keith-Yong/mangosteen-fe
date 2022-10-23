import { defineComponent } from "vue";
import s from './First.module.scss'
import pig from '../../assets/icons/Piggybank.svg'
export const First = defineComponent({
    setup: (props, context) => {
      return () => (
        <div class={s.wrapper}>
          <div class={s.card}>
            <img src={pig}/>

          </div>

          <div class={s.actions}>

          </div>
        </div>
      )
    }
  })