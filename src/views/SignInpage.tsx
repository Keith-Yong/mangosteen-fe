import { defineComponent, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Icon } from '../shared/Icon';
import { validate } from '../shared/validate';
import s from './SignInPage.module.scss';
import axios from 'axios'
import { http } from '../shared/Http';
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
    const onSubmit = (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        email: [], code: []
      })
      Object.assign(errors, validate(formData, [
        { key: 'email', type: 'required', message: '必填' },
        { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
        { key: 'code', type: 'required', message: '必填' },
      ]))
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
      
        const response = await http
         .post('/validation_codes', { email: formData.email })
        .catch( onError) //失败的处理，回调onError函数
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
                  countForm={1}
                  onClick={onClickSendValidationCode}
                  v-model={formData.code} error={errors.code?.[0]} />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    )
  }
})