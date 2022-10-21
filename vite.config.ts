import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/mangosteen-fe/dist/',
  plugins: [
    vue(),
    vueJsx({
      //配置使vue可以使用tsx语法
      transformOn:true,
      mergeProps:true
    })
  ]
})
