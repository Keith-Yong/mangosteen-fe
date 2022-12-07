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


export const mockTagIndex:Mock = (config) => {
    let id = 0
    const createId = () => {
        id += 1
        return id
    }

    const createTag = (n = 1, attrs?: any) =>
        Array.from( { length: n}).map( () => (
            {
                id:createId(),
                name:faker.lorem.word(),
                sign:faker.internet.emoji(),
                kind:config.params.kind,
                ...attrs
                
            }))

    if (config.params.kind === 'expenses') {
        return [200, {resources:createTag(7)}]
    } else {
        return [200, {resources:createTag(20)}]
    }

        
}


