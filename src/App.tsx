import { defineComponent, ref } from "vue";
import {RouterView}  from "vue-router"
// 导出
export const App = defineComponent({
 setup(){
  return () => <>

  <div>
   sss
      <RouterView/>
  </div>
  </>
 }


})