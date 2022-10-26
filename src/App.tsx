import { defineComponent, ref , Transition, VNode } from "vue";
import {RouteLocationNormalizedLoaded,RouterView}  from "vue-router"
// 导入app.css样式
import "./App.scss"

// 导出
export const App = defineComponent({
 setup(){
  return () => 
  (
   <div class="page">
      <RouterView/>
  </div>
  )
  
  
 }


})