import { AxiosRequestConfig } from 'axios'
// 定义
declare module 'axios' {
  export interface AxiosRequestConfig {
    _autoLoading?: boolean
    _mock?: string
  }
}