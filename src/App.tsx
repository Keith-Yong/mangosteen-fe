import { defineComponent, ref } from "vue";
import {RouterView}  from "vue-router"
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