import Taro, { showToast } from '@tarojs/taro';
import { View, Text } from "@tarojs/components";
import { storageKeys } from "@/constants";
import { httpRequest } from '@/utils';
import auth from '@/stores/auth';
import styles from './Setting.module.scss';

const Setting = () => {
  const mobile = auth.info.mobile;
  const handleLoginOut = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/sso/member/logout');
      if( res.code === 0){
        Taro.removeStorageSync(storageKeys.TOKEN);
        Taro.removeStorageSync(storageKeys.MOBILE);
        Taro.removeStorageSync(storageKeys.OPENID);
        Taro.removeStorageSync(storageKeys.UNIONID);
        Taro.removeStorageSync(storageKeys.USERID);
        auth.clearInfo()
        Taro.reLaunch({
          url: '../index/index',
        });
      }else{
        showToast({
          icon: 'fail',
          title: res.msg
        })
      }
      
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <View className={styles.setting}>
      <View className={styles.item}><Text>手机号</Text><Text className={styles.phone}>{mobile}</Text></View>
      <View className={styles.item} onClick={handleLoginOut}>退出登录</View>
    </View>
  )
};

export default Setting;
