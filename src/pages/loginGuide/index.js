import Taro, { showToast } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { IconFont } from "@/components";
import { storageKeys } from '@/constants';
import { httpRequest } from "@/utils";
import auth from "@/stores/auth";

import Logo from '../components/logo';

import styles from './LoginGuide.module.scss'

const LoginGuide = () => {
  const isH5 = process.env.TARO_ENV ==='h5';
  const channelCode = Taro.getStorageSync(storageKeys.channelCode);
  const recommendId = Taro.getStorageSync('recommendId') || null;
  const toPage = (page) => {
    if(page === 'jobList'){
      Taro.switchTab({
        url: `/pages/${page}/jobList`,
      });
    } else {
      Taro.navigateTo({
        url: `/pages/${page}/index`,
      });
    }
    
  };
  const getPhoneNumber = (e) => {
    const { iv, encryptedData, code } = e.detail;
    console.log(code)
   
    Taro.login({
      success: async (res) => {
        if (res.code) {
          try {
            if (e.detail.errMsg == 'getPhoneNumber:ok'){
              const resInfo = await httpRequest.post('phoenix-center-backend/client/noauth/wechat/login/wxBuildInPhone',{
                data: {
                  phoneCode: code,
                  encryptedData,
                  iv,
                  code: res.code,
                  channelCode,
                  recommendId,
                }
              }
              );
              if (resInfo?.code !== 0) {
                throw new Error(resInfo.msg)
              } else {
                Taro.setStorageSync(storageKeys.OPENID, resInfo.data.openId);
                Taro.setStorageSync(storageKeys.UNIONID, resInfo.data.unionId);
                Taro.setStorageSync(storageKeys.MOBILE, resInfo.data.mobile);
                Taro.setStorageSync(storageKeys.USERID, resInfo.data.userId);
                Taro.setStorageSync(storageKeys.TOKEN, resInfo.data.jwt);
                auth.setInfo(resInfo.data)
                Taro.navigateBack({
                  delta: 1
                })
              }
            } else {
              showToast({
                icon: 'none',
                title: '取消授权'
              })
            }
          } catch (err) {
            showToast({
              icon: 'none',
              title: `${err.message}`
            })
          }
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  return (
    <View className={styles.login}>
      <Logo />
      <View className={styles.content}>
        {
          !isH5 ? (
            <Button className={`${styles['login-btn']} ${styles.wechat}`} openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber} >
              <View className={styles['btn-icon']}>
                <IconFont name='wechat'  size='24px' />
              </View>
              微信一键登录
            </Button>
          ) : null
        }
        <Button className={`${styles['login-btn']} ${styles.phone}`} onClick={() => toPage('login')}>
          <View className={styles['btn-icon']}>
            <IconFont name='phone'  size='24px' />
          </View>
          手机验证码登录
        </Button>
        <View className={styles.back} onClick={() =>toPage('jobList')}>回到首页</View>
        <View className={styles.protocol}>
          登录即代表您同意寻工鸟<Text onClick={() => toPage('protocol')} className={styles['protocol-text']}>《用户协议》</Text>和<Text onClick={() => toPage('protocol')} className={styles['protocol-text']}>《隐私协议》</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginGuide;