import { defineComponent, ref } from "vue";
import {RouterView}  from "vue-router"
// 导出
export const App = defineComponent({
 setup(){
  return () => <>
   <header>导航</header>
  <div>
      {/* router-link路由跳转 */}
      <ul>
         <li>
         <router-link to="/">Foo</router-link>
         </li>
         <li>
         <router-link to="/about">Bar</router-link>
         </li>
      </ul>
      
  
      <RouterView/>
  </div>
  <footer>页脚</footer>
  </>
 }


})