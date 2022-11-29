import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../config/SkipFeatures';
export const ForthActions = () => (
  <div class={s.actions}>
    {/* <RouterLink class={s.fake} to="/start" >跳过</RouterLink> */}
    <SkipFeatures class={s.fake}/>
    <RouterLink to="/start" >完成</RouterLink>
    {/* <RouterLink class={s.fake} to="/start" >跳过</RouterLink> */}
    <SkipFeatures/> 
  </div>
)

ForthActions.displayName = 'ForthActions'