import { FunctionalComponent } from "vue";
import s from './welcome.module.scss'
import pig from '../../assets/icons/pig.svg'


// 取代defineComponent的写法
export const First:FunctionalComponent = ()=>{
  //  重构删除了setup,删除了slots
  return <div class={s.card}>
    <img src={pig}  />
    <h2>会赚钱<br />还会养家</h2>

  </div>

      
      
    }
  
    // 这里不写会导入会报错
  First.displayName = 'First'