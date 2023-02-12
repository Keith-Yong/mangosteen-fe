interface FData  {
    // 除了接口的已知属性之外，还可以存在string | number | null  | undefined或 Fdata类型的任何其他属性
    // FData接口可以把自身作为内部的类型定义吗
    [k: string]:JSONValue
}

// 校验的规则
type Rule<T> = {
    key:keyof T //
    message:string
} & (
    {type: 'required'} | //这里的type自定义的对象属性名称
    { type: 'pattern', regex: RegExp } |
    { type: 'notEqual', value: JSONValue }
)
// 多个校验的规则
type Rules<T> = Rule<T >[]

export type {Rules, Rule ,FData} //导出校验的规则及FData

// <T extends FData> 指只在当前函数传参使用该I继承变量FData
export const validate = <T extends FData>(formData:T, rules:Rules<T>) => {
    type Errors = {
        // Errors类型是内部元素字符串构成的数组
       
        [k in keyof T]?:string[]  
    }
    console.log('formData',formData)
    const errors: Errors = {} //初始化Errors为空对象
    // rules
    rules.map( rule => { //把rule传入{ key: 'name', type: 'required', message: '必填' } 
        //{ key: 'name', type: 'pattern', regex:/^.{1,4}$/,message:'只能填1到4个字符'}
        const {key, type ,message} = rule //解构赋值获取rule //
        const value = formData[key] //获取参数formData对象的key值 //'abc'
        switch (type) {
            case 'required': //type变量值是required
             if (isEmpty(value)) //判断是空或未定义的情况
             { 
                errors[key] = errors[key] ?? [] //如何不存在则让它为空值
                errors[key]?.push(message)  //{'nam e': ['必填',]}
             }
                break;
            case 'notEqual':
                if (!isEmpty(value) && value === rule.value) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                    }
                break;
            default:
            return
        }
    })
    return errors  //返回errors
}

function isEmpty(value?: JSONValue  ) {
    return value === null || value === undefined || value === ''
}

//处理errors对象为空无法判断的问题
export function hasError(errors:Record<string,string[]>) {
    let result = false
    for (let key in errors) {
        if(errors[key]?.length > 0) {
            result = true
            break
        }
    }
    return result
}

