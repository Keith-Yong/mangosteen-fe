import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue = string | number |null |boolean |JSONValue[] | {[key:string]: JSONValue}
/**组件内容：封装了axios为HTTP类，使得请求可以复用 */
export class Http {
    // 初始化instance
    instance: AxiosInstance
    constructor(baseURL:string) {
        this.instance = axios.create({
            baseURL
        })
    }
// read get请求函数
get<R=unknown>(url:string, query?:Record<string, JSONValue>, config?: Omit<AxiosRequestConfig,'params' | 'url' | 'method'>) {
  return this.instance.request<R>( {...config, url:url, params:query, method: 'get'})
}

//  creat post请求
post<R=unknown>(url:string, data?:Record<string, JSONValue>, config?: Omit<AxiosRequestConfig,'url' | 'data' | 'method'>) {
    return this.instance.request<R>( {...config, url, data, method: 'post'})
  }

// update 
patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }

// destory
delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
} 


export const http = new Http('/api/v1')
//请求拦截器：给请求头添加jwt
http.instance.interceptors.request.use( config => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
        config.headers!.Authorization = `Bearer $ {jwt}`
    }
    return config
}

)

// 错误拦截器  使用interceptors
http.instance.interceptors.response.use( response => {
    return response
},(error) => {
    if(error.response) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 429) {
            alert('你太频繁了')
        }
    }
    throw error
}

)