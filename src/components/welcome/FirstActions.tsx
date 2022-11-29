//  把Action元素单独封装成组件
import s from './Welcome.module.scss'
import { RouterLink } from 'vue-router'
import { FunctionalComponent } from 'vue'
import { SkipFeatures } from '../../config/SkipFeatures'
export const FirstActions: FunctionalComponent = ()  => {
    return <div class={s.actions}>
        {/* <RouterLink class={s.fake} to="/start">跳过</RouterLink> */}
        <SkipFeatures class={s.fake}/>
        <RouterLink to="/welcome/2" >下一页</RouterLink>
        {/* <RouterLink to="/start" >跳过</RouterLink> */}
        <SkipFeatures class={s.fake}/>
    </div>
}

FirstActions.displayName = 'FirstActions'
