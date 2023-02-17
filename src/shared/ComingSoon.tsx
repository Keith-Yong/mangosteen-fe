import { defineComponent, PropType } from 'vue'
import { Center } from './Center'
import s from './ComingSoon.module.scss'
import { Icon } from './Icon'
import { Navbar } from './Navbar'
import { BackIcon } from "../shared/BackIcon";
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.page}>
        <Navbar class={s.navbar}>
          {
            {
              // 把箭头函数的值传给default,icon
              default: () => '点击返回',
              icon: () => <BackIcon />,
            }
          }
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})