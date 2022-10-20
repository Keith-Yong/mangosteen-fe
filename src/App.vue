
<script setup lang="ts">
//setup的作用官方文档 https://cn.vuejs.org/api/sfc-script-setup.html#basic-syntax
import { ref } from 'vue';

//  ref（）的作用官方文档
// https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-unwrapping-in-templates

const count = ref(0)
const add1 = () => {
  console.log('1')
  count.value += 1;

}
</script>


<template>
  <div>
    <button @click="add1">
      +1
    </button>
  </div> 
    <!-- 这里不能使用count.value -->
    <!-- 当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 .value -->
    
  <div>
    {{count}}
    
  </div>
</template>

 

