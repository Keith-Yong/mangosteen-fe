import { defineComponent, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Icon } from '../shared/Icon';
import { hasError, validate } from '../shared/validate';
import s from './SignInPage.module.scss';
import axios from 'axios'
import { http } from '../shared/Http';
import { useBool } from '../hooks/useBool';
import { history } from '../shared/history';
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: 'fangyinghang@foxmail.com', // 初始化邮箱
      code: ''
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const refValidationCode  = ref<any>() //将refValidationCode绑定到父组件上，再通过ref<any>获取子组件，
    const {ref:refDisabled,toggle,on:disabled,off:enable} = useBool(false) // 解构赋值后用新的变量引用返回的变量
    const onSubmit = async (e: Event) => {
      console.log('submit')
      e.preventDefault()
      Object.assign(errors, {
        email: [], code: []
      })
      Object.assign(errors, validate(formData, [
        { key: 'email', type: 'required', message: '必填' },
        { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
        { key: 'code', type: 'required', message: '必填' },
      ]))
      // errors对象为空，触发该函数执行http对象 发送请求
      if(!hasError(errors)) {
        const response = await http.post<{jwt:string}>('/session', formData)
        localStorage.setItem('jwt', response.data.jwt) //jwt存放到 localStorage上
        history.push('/') //什么意思

      }

      
    }
    const onError = (error: any) => {
      if (error.response.status === 422) {
        console.log('errors',errors)
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    //使用axios发起请求
    const onClickSendValidationCode =async () => {
        disabled()
        const response = await http
         .post('/validation_codes', { email: formData.email })
        .catch( onError) //失败的处理，回调onError函数
        .finally(enable)
        // 成功的处理，这里是调用startCount函数
        refValidationCode.value.startCount()
       
       

    }
    return () => (
      <MainLayout>{
        {
          title: () => '登录',
          icon: () => <Icon name="left" />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="dolphin" />
                <h1 class={s.appName}>海豚记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem label="邮箱地址" type="text"
                  placeholder='请输入邮箱，然后点击发送验证码'
                  v-model={formData.email} error={errors.email?.[0]} />
                <FormItem  ref= {refValidationCode} label="验证码" type="validationCode"
                  placeholder='请输入六位数字'
                  countForm={5}
                  disabled={refDisabled.value} //disabled是解构赋值获取的变量
                  onClick={onClickSendValidationCode}
                  v-model={formData.code} error={errors.code?.[0]} />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    )
  }
})