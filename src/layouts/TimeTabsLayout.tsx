import { Tab, Tabs } from '../shared/Tabs';
import {Component, defineComponent, PropType, reactive, ref } from "vue";
import {  OverlayIcon } from "../shared/Overlay";
import { Form, FormItem  } from '../shared/Form';
import { Time } from "../shared/time";
import { MainLayout } from "./MainLayout";
import { Overlay  } from 'vant';
import s from './TimeTabsLayout.module.scss'
//组件demo
const demo = defineComponent({
    props: {
      startDate: {
        type: String as PropType<string>,
        required: true
      },
      endDate: {
        type: String as PropType<string>,
        required: true
      }
    },
  })

export const TimeTabsLayout  =  defineComponent({
    props: {
        component: {
            type: Object as PropType<typeof demo>, //component类型为demo
            required: true
          }
      },

      setup: (props, context) => {
        const refSelected = ref('本月')
        const time = new Time()
        //  自定义时间
        const customTime  = reactive({
            start: new Time().format(),  
            end:new Time().format()
        })
        // 本月，上月，今年
        const timeList = [
            {
                start:time.firstDayOfMonth(),
                end:time.lastDayOfMonth()
            },
            {
                start: time.add(-1,'month').firstDayOfMonth(),
                end:time.add(-1,"month").lastDayOfMonth()
            },
            {
                start:time.firstDayOfYear(),
                end:time.lastDayOfYear()
            }
        ]
      

      const refOverlayVisible = ref(false)
      //触发该函数，修改refOverlayVisible值为false
      const onSubmitCustomTime = (e:Event) => {
        e.preventDefault()
        refOverlayVisible.value =false
      }

      // 触发该函数，修改refOverlayVisible值为true
      const onSelect = (value: string) => {
        if(value === '自定义时间') {
            refOverlayVisible.value = true
        }
      }
        //页面中的主体内容
      return () => (
        <MainLayout>
            {{
                title:() => '海豚记账',
                icon:() => <OverlayIcon/>,
                default: () => <>
                {/*  */}
                <Tabs classPrefix='customTabs' v-model:selected={refSelected.value} onUpdate:selected={onSelect}>
                    <Tab name='本月'>
                        <props.component 
                        startDate={timeList[0].start.format()}
                        endDate={timeList[0].end.format()} />
                    </Tab> 
                    <Tab name="上月">
                        <props.component
                        startDate={timeList[1].start.format()}
                        endDate={timeList[1].end.format()} />
                    </Tab>
                    <Tab name="今年">
                        <props.component
                        startDate={timeList[2].start.format()}
                        endDate={timeList[2].end.format()} />
                    </Tab>
                    <Tab name="自定义时间">
                        <props.component
                        startDate={customTime.start}
                        endDate={customTime.end} />
                    </Tab>

                
                </Tabs>

                <Overlay show={refOverlayVisible.value} class={s.overlay} >
                    <div class={s.overlay_inner}>
                        <header>
                        请选择时间
                        </header>
                        <main>
                        <Form onSubmit={onSubmitCustomTime}>
                            <FormItem label='开始时间' v-model={customTime.start} type='date' />
                            <FormItem label='结束时间' v-model={customTime.end} type='date' />
                            <FormItem>
                            <div class={s.actions}>
                                <button type="button" onClick={() => refOverlayVisible.value = false}>取消</button>
                                <button type="submit">确认</button>
                            </div>
                            </FormItem>
                        </Form>
                        </main>
                    </div>
                </Overlay>
            </>
            }}
        </MainLayout>
      )

    }




})