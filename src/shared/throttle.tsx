// throttle函数
export const throttle = (fn: Function, time: number) => {
    let timer: number | undefined = undefined
    return (...args: any) => { //无法确定变量的类型，将其指定为 any 类型
      if (timer) {
        return
      } else {
        fn(...args)
        timer = setTimeout(() => {
          timer = undefined
        }, time)
      }
    }
  }