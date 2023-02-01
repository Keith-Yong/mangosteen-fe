import axios, { AxiosError, AxiosInstance, AxiosProxyConfig, AxiosRequestConfig, AxiosResponse } from "axios";
import { mockItemIndex, mockSession,mockTagEdit,mockTagIndex, mockTagShow  } from "../mock/mock";
type JSONValue = string | number |null |boolean |JSONValue[] | {[key:string]: JSONValue}

//声明请求方法的变量 及类型
// js中的axios不同类型分别需要传递哪些参数??Omit内规定哪些值不需要屏蔽掉
type Getconfig =  Omit<AxiosProxyConfig, 'params' | 'url' | 'method'> 
type PostConfig =  Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data' >
type DeleteConfig = Omit<AxiosRequestConfig,'params'>












/**组件内容：封装了axios为HTTP类，使得请求可以复用 */
export  class Http {
    // 初始化instance
    instance: AxiosInstance
    constructor(baseURL:string) {
        this.instance = axios.create({
            baseURL
        })
    }
// read get请求函数
get<R=unknown>(url:string, query?:Record<string, JSONValue>, config?: Getconfig) {
    console.log('url',url)
    console.log('query',query)
    console.log('config',config)
    //设置了config对象
  return this.instance.request<R>( {...config, url:url, params:query, method: 'get'}) //instance的request发送请求需要传对象config
}

//  creat post请求
post<R=unknown>(url:string, data?:Record<string, JSONValue>, config?:PostConfig) {
    return this.instance.request<R>( {...config, url, data, method: 'post'})
  }

// update 
patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }

// destory
delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
} 


// mock的逻辑
const mock = (response:AxiosResponse)  => { 
    //只有在本地环境情况下才进行mock处理
    if (!['localhost', '127.0.0.1', '192.168.3.57'].includes(location.hostname)) {return false} 
    // 根据不同的case获取不同的数据
    switch (response.config?.params?._mock) { //通过response获取config
        
        case 'tagIndex':
            console.log('response.config?.params?',response.config),
            [response.status, response.data] = mockTagIndex(response.config)
            return true
       
        case 'session':
            [response.status ,response.data] = mockSession(response.config)
            return true

        case 'tagShow':
            [response.status, response.data] = mockTagShow(response.config)
            return true

        case 'tagEdit':
            [response.status, response.data] = mockTagEdit(response.config)
            return true
        
        case 'itemIndex':
            [response.status, response.data] = mockItemIndex(response.config)
            return true
    }
    return false
    
}


export const http = new Http('/api/v1')
//请求拦截器：给请求头添加jwt
http.instance.interceptors.request.use( config => {
    
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
        config.headers!.Authorization = `Bearer ${jwt}`
    }
    return config
}

)

// 错误拦截器  使用interceptors
http.instance.interceptors.response.use( response => {
    mock(response)//调用mock函数处理 response
    if (response.status >= 400) {
        throw { response }
    } else {
        return response
  }
}, (error) => {
  mock(error.response)
  if (error.response.status >= 400) {
    throw error
    } else {
    return error.response
}
})

// 请求过多时进行拦截 并返回弹窗字符'你太频繁了'
http.instance.interceptors.response.use(
    response => { return response },
    // error是自定义变量,本函数是回调函数,在use函数内部执行
    error => {
        if (error.response) {
            const AxiosError = error as AxiosError
            if (AxiosError.response?.status === 429) {
                alert('你太频繁了')
            }
        }
        throw error
    }
)
