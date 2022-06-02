import Taro, { showToast } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { IconFont } from "@/components";
import { storageKeys } from '@/constants';
import { httpRequest } from "@/utils";

import Logo from '../components/logo';

import styles from './LoginGuide.module.scss'

const LoginGuide = () => {
  const sourceChannel = Taro.getStorageSync('sourceChannelId');
  const toPage = () => {
    Taro.navigateTo({
      url: '/pages/login/index',
    });
  };
  const getPhoneNumber = (e) => {
    const { iv, encryptedData } = e.detail;
    Taro.login({
      success: async (res) => {
        if (res.code) {
          //发起网络请求
          try {
            const resInfo = await httpRequest.post('phoenix-center-backend/client/noauth/wechat/login/wxBuildInPhone',{
              data: {
                encryptedData,
                iv,
                code: res.code,
                sourceChannelId: sourceChannel,
              }
            }
            );
            if (resInfo?.code !== 0) {
              showToast({
                icon: 'none',
                title: resInfo.msg
              })
            } else {
              Taro.setStorageSync(storageKeys.OPENID, resInfo.data.openId);
              Taro.setStorageSync(storageKeys.UNIONID, resInfo.data.unionId);
              Taro.setStorageSync(storageKeys.MOBILE, resInfo.data.mobile);
              Taro.setStorageSync(storageKeys.USERID, resInfo.data.userId);
              Taro.setStorageSync(storageKeys.TOKEN, resInfo.data.jwt);
              Taro.switchTab({
                url: '/pages/index/index'
              });
            }
            
          } catch (err) {
            console.log(err);
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
        <Button className={`${styles['login-btn']} ${styles.wechat}`} openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber} >
          <View className={styles['btn-icon']}>
            <IconFont name='wechat'  size='24px' />
          </View>
          微信一键登录
        </Button>
        <Button className={`${styles['login-btn']} ${styles.phone}`} onClick={toPage}>
          <View className={styles['btn-icon']}>
            <IconFont name='phone'  size='24px' />
          </View>
          手机验证码登录
        </Button>
        <View className={styles.protocol}>
          登录即代表您同意寻工鸟<Text className={styles['protocol-text']}>《用户协议》</Text>和<Text className={styles['protocol-text']}>《隐私协议》</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginGuide;