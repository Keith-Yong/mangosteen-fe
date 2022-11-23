import { computed, defineComponent, reactive } from "vue";
import s from './Bars.module.scss'
/**封装了自定义的图表组件 */
export  const Bars = defineComponent( {
    
    setup: (props ,context) => {


         //定义图标的内容，响应变量，数组内嵌套对象
         const data3 = reactive( [
            {tag: {id:1, name:'房租', sign:'x'}, amount:3000},
            {tag: {id:2, name:'吃饭房租', sign:'x'}, amount:1000},
            {tag: {id:3, name:'娱乐', sign:'x'}, amount:900},
        ])
        
        //使用计算属性对data3进行计算返回新的数组  为什么
        const betterData3 = computed ( () => {
            //reduce函数用于计算数组中所有值的总和
            const total = data3.reduce( (sum,item) => sum + item.amount,0)

            return data3.map( item => ( {
             ...item, //解构获取item的值  为什么
             percent: Math.round(item.amount / total * 100) + '%'
            }))
        })

        return () => (
            <div class={s.demo3}>
            {betterData3.value.map( ( {tag,amount,percent} ) => { //为什么 {tag,amount,percent}这个对象是如何拿到的 
                return (
                    <div class={s.topItem}>
                         <div class={s.sign}>
                            {tag.sign}
                         </div>
                         <div class={s.bar_wrapper}>
                            <div class={s.bar_text}>
                                <span>{tag.name} - {percent}</span>
                                <span>￥ {amount} </span>
                            </div>
                            <div class={s.bar}>
                                <div class={s.bar_inner}></div>
                            </div>
                            
                         </div>
                    </div>
                )
            }
            )}
        </div>
        )
    
       
    }
})