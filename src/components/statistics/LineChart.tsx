import { defineComponent, onMounted, ref } from "vue";
import * as echarts from 'echarts';
import s from './LineChart.module.scss';

/**封装了线性图表组件 */
export const LineChart = defineComponent( {
   setup: (props,context) => {
    const refDiv = ref<HTMLDivElement>()
   

    onMounted( () => {
        if (refDiv.value === undefined) {return}
        // 初始化eharts对象
        var mychart = echarts.init(refDiv.value);
        // 绘制图表
        mychart.setOption( {
            grid: [
                {left:0,top:0,right:0,bottom:20}
            ],
            xAxis: {
                type: 'category',
                data:['mon','Tue','Wed','Thu','Fri','Sat','Sun']
            },
            yAxis:{
                type:'value'
            },
            series: [
                {
                  data: [150, 230, 224, 218, 135, 147, 260],
                  type: 'line'
                }
            ]
        });
       
    })
    return () => (
        <div ref={refDiv} class={s.wrapper}></div>
    )

} 
})