import Taro, { showToast } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { IconFont } from "@/components";
import { storageKeys } from '@/constants';
import { httpRequest } from "@/utils";
import auth from "@/stores/auth";

import Logo from '../components/logo';

import styles from './LoginAuth.module.scss'


const LoginAuth = () => {
  const bindWeChat = () => {
    Taro.login({
      success: async (res) => {
        if (res.code) {
          try{
            const result = await httpRequest.put(`phoenix-center-backend/client/member/bindWeChat/${res.code}`);
            if (result.code !== 0) {
              throw new Error(result.msg);
            }
            Taro.switchTab({
              url: '/pages/jobList/jobList'
            })
          }catch(e){
            showToast({
              icon: 'none',
              title: `${e?.message}`
            })
          }
        }
      },
      fail: (err) => {
        showToast({
          icon: 'none',
          title: `${err.errMsg}`
        })
      }
    })
  }
  return (
    <View className={styles.login}>
      <Logo />
      <View className={styles.content}>
        <View className={styles.tips}>请你完成微信授权以继续使用</View>
        <Button className={`${styles['login-btn']} ${styles.wechat}`} onClick={bindWeChat} >
          <View className={styles['btn-icon']}>
            <IconFont name='wechat'  size='24px' />
          </View>
          微信授权用户信息
        </Button>
      </View>
  </View>
  );
};

export default LoginAuth;