import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore';


// https://vitejs.dev/config/
export default defineConfig({
  // base:'/mangosteen-fe/dist/',
  base:'./',
  plugins: [
    vue(),
    vueJsx({
      //配置使vue可以使用tsx语法
      transformOn:true,
      mergeProps:true
    }),
    svgstore(),
    styleImport({
      resolves: [VantResolve()], //配置vant库
    }),
  ],
  // 设置服务器的代理
  server: {
    proxy: {
      '/api/v1': {
        
        target: 'http://121.196.236.94:8080/',
      }
    }
  }
})


