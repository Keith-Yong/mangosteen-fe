import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'


type Mock = (config:AxiosRequestConfig) => [number, any] // 声明Mock的类型

faker.setLocale('zh_CN'); // 设置语言

export const mockItemSummary : Mock = config => {
  const { group_by, kind } = config.params
  if (group_by === 'happen_at' && kind === 'expenses') {
  return [200, {
    "groups": [
      { "happen_at": "2023-02-08T00:00:00.000+0800", "amount": 100 },
      { "happen_at": "2023-02-18T00:00:00.000+0800", "amount": 100 },
      { "happen_at": "2023-02-22T00:00:00.000+0800", "amount": 200 }
    ],
    "summary": 600
  }]
} else if (group_by === 'happen_at' && kind === 'income'){
  return [
    200,
    {
      groups: [
        { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
        { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
        { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
      ],
      summary: 600
    }
  ]
} else {
  return [
    200,
    {
      groups: [
        { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 400 },
        { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
        { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
      ],
      summary: 900
    }
  ]
}

}

export const mockItemIndexBalance:  Mock = config => {
    return [ 200, {
      expenses:9900,income:9900, balance:0
    }]
}

export const mockItemIndex: Mock = (config) => {
    const { kind, page } = config.params
    const per_page = 25
    const count = 26
    const createPaper = (page = 1) => ({
      page,
      per_page,
      count,
    })

    const createTag = (attrs?: any) =>
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })


    const createItem = (n = 1, attrs?: any) =>
      Array.from({ length: n }).map(() => ({
        id: createId(),
        user_id: createId(),
        amount: Math.floor(Math.random() * 10000),
        tag_ids: [createId()],

        tags: [createTag()],
        
        happen_at: faker.date.past().toISOString(),
        kind: config.params.kind,
      } as Item))
      
    const createBody = (n = 1, attrs?: any) => ({
      resources: createItem(n),
      pager: createPaper(page),
      summary: {
        income: 9900,
        expenses: 9900,
        balance: 0
      }
    })
    if (!page || page === 1) {
      return [200, createBody(25)]
    } else if (page === 2) {
      return [200, createBody(1)]
    }else{
      return [200, {}]
    }
  }

  


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
        "tag_ids": [3508],
        "happen_at": "2020-10-29T16:00:00.000Z",
        "created_at": "2022-07-03T15:35:56.301Z",
        "updated_at": "2022-07-03T15:35:56.301Z",
        "kind": "expenses"
      } as Item
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


