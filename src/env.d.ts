/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// // JSONValue可以是规定的值,也可以是字典,字典内键是字符串,值是规定的值{[T in string]: JSONValue}
type JSONValue = null | boolean | string | number | JSONValue[] | {[T in string]: JSONValue}

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: 'expenses' | 'income',
}