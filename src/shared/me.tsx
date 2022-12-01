import { AxiosResponse } from "axios";
import { http } from "./Http";
// me接口的封装，获取当前返回的用户
// 定义mePromise的类型
export let mePromise: Promise<AxiosResponse<{
    resource: {
        id: number
    };

}>> | undefined

// 封装函数：内容获取当前用户的接口请求,返回响应的数据mePromise
export const refreshMe = () => {
    mePromise = http.get< { resource: {id:number}}>('/me')
    return mePromise
}

//fetchMe就是refreshMe
export const fetchMe  = refreshMe