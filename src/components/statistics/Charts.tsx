import { computed, defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from './Charts.module.scss'
import * as echarts from 'echarts';
import { LineChart } from "./LineChart";
import { PitChart } from "./PitChart";
import { Bars } from "./Bars";

export const Charts = defineComponent({
    props: {
        startDate : {
            type: String as PropType<string>,
            required:false
        },
        endDate: {
            type: String as PropType<string>,
            required: false
        }

        
    },

    setup : (props,context) => {
        const category = ref('expenses')
        // 获取元素作为响应式变量
      
       

       

       
        
        return () => (
           
            <div>
                <FormItem label="类型" type="select" options={[
                    {value:'expenses',text:'支出'},
                    {value:'income',text:'收入'}
                ]} v-model={category.value} />
                <LineChart/>
                <PitChart/>
                <Bars/>
                
               
            </div>
        )
    }

})