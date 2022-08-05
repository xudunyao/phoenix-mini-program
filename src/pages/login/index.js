import { useState } from 'react';
import Taro, { showToast } from '@tarojs/taro';
import { IconFont, Button } from "@/components";
import { View } from "@tarojs/components";
import { FormItem, Input } from '@/components/form';
import { httpRequest } from '@/utils';
import { regExp, storageKeys } from '@/constants';
import auth from '@/stores/auth';
import VerifyCode from '../components/verifyCode';
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
};
const Login = () => {
  const [form, setForm] = useState(initForm);
  const [sendStatus, setSendStatus] = useState(true);
  const [isAble, setIsAble] = useState(false);
  const scene = Taro.getStorageSync('SCENE')|| null;
  const isH5 = process.env.TARO_ENV === 'h5';
  const setFormFieldValue = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: {
        value,
        error: null,
      },
    })
  };

  const setFormFieldError = (fieldName, error) => {
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        error,
      },
    })
  };

  const validate = () => {
    if (!form.phone.value ) {
      setFormFieldError('phone', '手机号不能为空！');
      return false;
    }
    if(!regExp.phone(form.phone.value)){
      setFormFieldError('phone', '手机号格式不正确！');
      return false;
    }
    if(!form.sms.value) {
      setFormFieldError('sms', '验证码不能为空！');
      return false;
    }
    return true;
  };
  const miniLogin = () => {
    Taro.login({
      success: async (res) => {
        if (res.code) {
          try {
            setIsAble(true);
            const resInfo = await httpRequest.post('phoenix-center-backend/client/noauth/wechat/login/wxCustomizePhone',{
              data: {
                mobile: form.phone.value,
                smsCode: form.sms.value,
                code: res.code,
                gps:{
                  longitude: Taro.getStorageSync(storageKeys.longitude),
                  latitude: Taro.getStorageSync(storageKeys.latitude),
                },
                scene,
              }
            }
            
            );
            if (resInfo?.code !== 0) {
              throw new Error(resInfo.msg);
            } else {
              Taro.setStorageSync(storageKeys.OPENID, resInfo.data.openId);
              Taro.setStorageSync(storageKeys.UNIONID, resInfo.data.unionId);
              Taro.setStorageSync(storageKeys.MOBILE, resInfo.data.mobile);
              Taro.setStorageSync(storageKeys.USERID, resInfo.data.userId);
              Taro.setStorageSync(storageKeys.TOKEN, resInfo.data.jwt);
              auth.setInfo(resInfo.data);
              if(!resInfo.data.unionId){
                Taro.navigateTo({
                  url: '/pages/loginAuth/index'
                })
                return ;
              }
              Taro.navigateBack({
                delta: 3
              })
            }
            
          } catch (err) {
            showToast({
              icon: 'none',
              title: `${err.message}`
            })
          } finally{
            setIsAble(false);
          }
        } else {
          showToast({
            icon: 'none',
            title: res.errMsg
          })
        }
      }
    })
  };
  const webLogin = async () => {
    try {
      setIsAble(true)
      const res = await httpRequest.post('phoenix-center-backend/client/noauth/h5/login',{
        data: {
          mobile: form.phone.value,
          smsCode: form.sms.value,
          scene,
        }
      } 
      );
      if (res?.code !== 0) {
        throw new Error(res.msg);
      } else {
        Taro.setStorageSync(storageKeys.MOBILE, res.data.mobile);
        Taro.setStorageSync(storageKeys.USERID, res.data.userId);
        Taro.setStorageSync(storageKeys.TOKEN, res.data.jwt);
        auth.setInfo(res.data);
        Taro.switchTab({
          url: '/pages/jobList/jobList'
        })
      }
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err?.message}`
      })
    }finally{
      setIsAble(false)
    }
  };
  const handleSubmit = async () => {
    console.log('handleSubmit');
    if (validate()) {
     if(isH5){
      webLogin();
     } else {
      miniLogin()
     }
    }
  };
  const getCode = async (cb) => {
    
    if(regExp.phone(form.phone.value)){
      try {
        const res = await httpRequest.post('phoenix-center-backend/sms/send',{
          data: {
            mobile: form.phone.value,
            type:isH5 ? 'h5Login' : 'wxMinProgramLogin'
          }
        });
        if (res?.code !== 0) {
          showToast({
            title: res.msg
          })
        }
        cb && cb();
        setSendStatus(false)
      } catch (err) {
        console.log(err);
      }
    } else {
      setFormFieldError('phone', '请输入正确的手机号码');
    }
    
  };
  const handleListeners = () => {
    setSendStatus(true)
  };
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
          suffix={<VerifyCode className={styles.send} onClick={sendStatus && getCode} listeners={handleListeners} />}
          value={form.sms.value}
          onInput={(value) => setFormFieldValue('sms', value)}
          error={!!form.sms.error}
        />
      </FormItem>
      <Button type='primary' onClick={handleSubmit} disabled={isAble}>
        登录
      </Button>
      </View>
    </View>
  )
};
export default Login;