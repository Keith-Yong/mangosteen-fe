import {computed, onMounted, Ref, ref,onUnmounted} from 'vue'

//  鼠标
type Point  = {x:number ; y: number}
// 定义函数useSwipe
export const useSwipe =(element:Ref<HTMLElement | undefined>) => {
    //  鼠标开始
 const start = ref<Point | null>(null)
  //  鼠标结束
 const end  = ref<Point | null>(null)
//  鼠标初始的状态
const swiping = ref(false)
//  滑动距离 使用计算属性计算
const distance = computed(() => {
    if (!start.value || !end.value){return null}
    return{
        x:end.value.x  - start.value.x,
        y:end.value.x  - start.value.y,
    }
})

//  根据滑动距离决定 方向 上下左右
const direction = computed(() => {
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })

// 鼠标开始触发的函数
const onStart = (e:TouchEvent) => {
  
    swiping.value = true
    // screenX:返回触点相对于屏幕左边沿的的 X和Y 坐标。
    end.value = start.value = {x:e.touches[0].screenX,y:e.touches[0].screenY}
}

// 鼠标离开触发的函数 ,e是TouchEvent类型
const  onMove = (e:TouchEvent) => {
    if (!start.value) { return }
    end.value = {x:e.touches[0].screenX,y:e.touches[0].screenY}
}
// 鼠标结束后的函数。和开始坐标一样，所以不再获取
const onEnd = (e:TouchEvent) => {
    swiping.value = false
}

// 在onMounted函数中定义 鼠标事件绑定的函数
onMounted(()=>{
    // 如果不存在element，则不执行，反之则执行事件绑定
    if(!element.value) {return}
    element.value.addEventListener('touchstart',onStart)
    element.value.addEventListener('touchmove',onMove)
    element.value.addEventListener('touchend',onEnd)
})
 
onUnmounted(()=>{
    // 如果不存在element，则不执行，反之则执行事件绑定
    if(!element.value) {return}
    element.value.removeEventListener('touchstart',onStart)
    element.value.removeEventListener('touchmove',onMove)
    element.value.removeEventListener('touchend',onEnd)
    })

    // 返回需要导出的变量给其他模块使用
return {
    swiping,
    direction,
    distance
    }

}