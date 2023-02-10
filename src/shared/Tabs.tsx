/**记一笔页面的支出/收入切换tab栏 */
import { defineComponent, PropType } from "vue";
import s from './Tabs.module.scss'
export const Tabs = defineComponent({
    props: {
        // 新增props的classPrefix属性
        classPrefix: {
            type: String
          },
        selected: {
            type: String as PropType<string>, //selected属性约束类型为string，
            required: false,
        },
       
        rerenderOnSelect: {
            type: Boolean as PropType<boolean>,
            default: false
          }


       
    },
    emits: ['update:selected'], //1定义emits的值，数组
    setup: (props, context) => {
        return () => {
            //  这里的default是默认的插槽属性，未定义的插槽内容都会放在该属性中
            const tabs = context.slots.default?.()
            console.log(tabs)
            if (!tabs) return () => null //如果值为空则返回null
            //如果值不为空，则遍历数组，返回值array是数组
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].type !== Tab) { //如果值类型不是Tab类型
                    throw new Error('<Tabs> only accepts <Tab> as children')
                }
            }
            //  为什么可以return两次

            
            const cp = props.classPrefix
            return <div class={[s.tabs, cp+'_tabs']}>
                <ol class={[s.tabs_nav , cp +'_tabs_nav']}>
                    {/*  map方法把tab传入后*/}
                    {tabs.map(item => <li class={[item.props?.value === props.selected ? [s.selected,cp + '_tabs_nav'] : '',
                    cp + '_tabs_nav_item'
                    ]}
                        onClick={() => context.emit('update:selected', item.props?.value)}
                    >
                        {/* props.name获取父组件传进来的值这里是支出或者收入 */}
                        {item.props?.name}

                    </li>)}

                </ol>
                
                    {props.rerenderOnSelect ?
                    <div key={props.selected}>
                        {tabs.find(item=>item.props?.value === props.selected)}
                    </div>:
                    <div>
                        {tabs.map(item =>
                            <div v-show={item.props?.value === props.selected}>{item}</div>
                        )}
                    </div>
                    }

                    {/* 找到符合条件的元素就返回，这里是返回整个tab标签 */}
                    {/* {tabs.find(item => item.props?.name === props.selected)} */}
                    
               
            </div>

        }
    }

})

// Tab是自定义的组件，不是html内置标签
export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,  // 定义一个props属性为name，类型是String
            required:true
        },
        value: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup: (props, context) => {
        return () => {
            // context.slots.default这个指的是什么插槽??但是插槽？？的值从哪里获取的
            return <div>{context.slots.default?.()}</div>
        }

    }
})