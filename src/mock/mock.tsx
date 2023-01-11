import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'


type Mock = (config:AxiosRequestConfig) => [number, any] // 声明Mock的类型

faker.setLocale('zh_CN'); // 设置语言



export const mockTagEdit: Mock = config => {
    const createTag = (attrs?: any) =>
      ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs
      })
    return [200, {resource: createTag()}]
  }
  

export const mockTagShow: Mock = config =>{
    const createTag = (attrs?: any) =>
      ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs
      })
    return [200, {resource: createTag()}]
  }


export const mockItemCreate: Mock = config => {
    return [200, {
      resource: {
        "id": 2264,
        "user_id": 1312,
        "amount": 9900,
        "note": null,
        "tags_id": [3508],
        "happen_at": "2020-10-29T16:00:00.000Z",
        "created_at": "2022-07-03T15:35:56.301Z",
        "updated_at": "2022-07-03T15:35:56.301Z",
        "kind": "expenses"
      }
    }]
  }

// Mock返回jwt的数据格式
export const mockSession: Mock = (config) => {
    return [200,
    {
        jwt:faker.random.word()
    }
]
}

let id = 0
    const createId = () => {
        id += 1
        return id
    }

export const mockTagIndex:Mock = (config) => {

    // 定义变量
    const { kind, page} = config.params
    const per_page = 25
    const count = 26

    
    
    // 函数功能:创建 页
    const createPaper = (page =1) => (
        {page ,per_page, count}
    )

    
    // 函数功能:用空伪数组转换为数组,再map出新数组,结合faker自带的api生成tags标签
    const createTag = (n = 1, attrs?: any) =>
        Array.from( { length: n}).map( () => (
            {
                id:createId(),
                name:faker.lorem.word(),
                sign:faker.internet.emoji(),
                kind:config.params.kind,
                ...attrs
                
            }))

    //  函数功能:定义resources和pager变量的值
    const createBody = (n =1, attrs?:any) => ({
        resources: createTag(n), pager: createPaper(page)
    })

            
            //根据传入的不同kind值传入不同的数字
    if (config.params.kind === 'expenses' && (page === 1 || !page)) {
        return [200,createBody(25)]
    } else if( kind === 'expenses' && page === 2){
        return [200, createBody(1)]
    } else if ( kind === 'income' && (!page || page === 1)) {
        return [200, createBody(25)]
    }
    else {
        return [200 , createBody(1)]
    }

        
}


