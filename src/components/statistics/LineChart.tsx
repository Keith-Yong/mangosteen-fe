import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import * as echarts from 'echarts';
import s from './LineChart.module.scss';
import { Time } from "../../shared/time";
import { getMoney } from "../../shared/Money";


// 折线图的封装
const  echartsOption = {
    // 折线图鼠标触摸后展示数据
    


    tooltip:{
        show:true,
        trigger:'axis',
        formatter: ([item]: any) => {
            const [x, y] = item.data
            return `${new Time(new Date(x)).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
          },
        },
        grid: [{ left: 16, top: 20, right: 16, bottom: 20 }], //折线图节点的样式
        xAxis: {
          type: 'time',
          boundaryGap: ['3%', '0%'],
          axisLabel: {
            formatter: (value: string) => new Time(new Date(value)).format('MM-DD'),
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          show: true,
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
            },
          },
          axisLabel: {
            show: false,
          },
        },
      
    }




/**封装了线性图表组件 */
export const LineChart = defineComponent( {
    props: {
        data: {
          type: Array as PropType<[string, number][]>,
          required: true,
        }
      },

   setup: (props,context) => {
    const refDiv = ref<HTMLDivElement>()

    // const refChart = ref<echarts.ECharts>()
    let chart:echarts.ECharts | undefined = undefined
    
   

    onMounted( () => {
        if (refDiv.value === undefined) {return}
        // 初始化eharts对象
        
        // refChart.value = echarts.init(refDiv.value);
        chart = echarts.init(refDiv.value);
        // 绘制图表
        chart.setOption({
            ...echartsOption,
            series: [{
              data: props.data,
             
              type: 'line'
            }]
            
        });
       
    })
    // console.log('props.data',props.data)
    watch(
        ()=>props.data,
        
        ()=> {
            chart?.setOption( {
                series: [{
                    data:props.data
                }]
            })
        }
    )

    return () => (
        <div ref={refDiv} class={s.wrapper}></div>
    )

} 
})