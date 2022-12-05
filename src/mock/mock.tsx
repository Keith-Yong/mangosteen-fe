import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'


type Mock = (config:AxiosRequestConfig) => [number, any] // 声明Mock的类型

faker.setLocale('zh_CN'); // 设置语言

// Mock返回jwt的数据格式
export const mockSession: Mock = (config) => {
    return [200,
    {
        jwt:faker.random.word()
    }
]
}



