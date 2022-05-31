import { useState } from 'react';
import { showToast } from '@tarojs/taro';
import { IconFont } from "@/components";
import { View } from "@tarojs/components";
import { FormItem, Input } from '@/components/form';

import Logo from '../components/logo';
import styles from './Login.module.scss'

const initForm = {
  phone: {
    value: '',
    error: '',
  },
  sms: {
    value: '',
    error: '',
  },
}
const Login = () => {
  const [form, setForm] = useState(initForm);

  const setFormFieldValue = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: {
        value,
        error: null,
      },
    })
  }

  const setFormFieldError = (fieldName, error) => {
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        error,
      },
    })
  }

  const validate = () => {
    // TODO: 根据业务需求来
    if (!form.phone.value ) {
      setFormFieldError('phone', '手机号不能为空！');
      return false;
    }
    if(!form.sms.value) {
      setFormFieldError('sms', '验证码不能为空！');
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    console.log(form,'from')
    if (validate()) {
      // TODO: submit
      showToast({
        icon: 'success',
        title: '提交成功！'
      })
    }
  }
  const handleInputBlur = (value) => {
    console.log(value,'----');
    // if (!value) {
    //   setFormFieldError('input', 'Input 不能为空');
    // }
  }
  return(
    <View className={styles.login}>
      <Logo />
      <View className={styles.content}>
      <FormItem
        labelAlign='right'
        errorMsg={form.phone.error}
      >
        <Input
          placeholder='请输入手机号'
          prefix={<IconFont name='call' size='20px' />}
          value={form.phone.value}
          onInput={(value) => setFormFieldValue('phone', value)}
          error={!!form.phone.error}
          onBlur={handleInputBlur}
        />
      </FormItem>
      <FormItem
        required
        labelAlign='right'
        errorMsg={form.sms.error}
      >
        <Input
          placeholder='请输入验证码'
          prefix={<IconFont name='safety' size='20px' />}
          suffix={<View className={styles.send}>发送验证码</View>}
          value={form.sms.value}
          onInput={(value) => setFormFieldValue('sms', value)}
          error={!!form.sms.error}
          onBlur={handleInputBlur}
        />
      </FormItem>
      <View onClick={handleSubmit} className={styles['login-btn']}>
        登录
      </View>
      </View>
    </View>
  )
};
export default Login;