import { defineComponent, ref } from "vue";

// 导出
export const App = defineComponent({
 setup(){
   //  定义ref变量
     const refCount = ref(0)   //用ref定义了一个响应数据的变量
   //返回一个箭头函数onClick
  
   // 只要有数据就需要加上.value属性才能修改变量的值
   // return后必须返回一个函数
    //这个函数 的双括号可以用react语法<></>替代
   const onClick = () => {
      refCount.value += 1
   }
    return () => <>  
    <div>
      {refCount.value}
    </div>
    <div>
      <button onClick={onClick}>+1</button>
    </div>
    </>
 }


})