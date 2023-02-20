// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare var DEBUG: boolean

declare module '*.scss' {
  const content: Record<string, any>
  export default content
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

type Item = {
  id: number
  user_id: number
  amount: number
  tag_ids: number[]
  tags?: Tag[],
  happen_at: string
  kind: 'expenses' | 'income'
};

type User = {
  id: number;
  email: string;
}

// 
type Resources<T = any> ={
  resources: T[]
  pager: {
    
      page: number,
      per_page:number,
      count: number
    
  }
}

type Resource<T> = {
  resource: T
}

type ResourceError = {
  errors: Record<string, string[]>
}

type FormErrors<T> = {[K in keyof  T]: string[]} 