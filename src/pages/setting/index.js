import Taro, { showToast } from '@tarojs/taro';
import { View, Text } from "@tarojs/components";
import { storageKeys } from "@/constants";
import styles from './Setting.module.scss';

const Setting = () => {
  const mobile = Taro.getStorageSync(storageKeys.MOBILE);
  const handleLoginOut = () => {
      showToast({
        title: '退出登录成功',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            Taro.removeStorageSync(storageKeys.TOKEN);
            Taro.removeStorageSync(storageKeys.MOBILE);
            Taro.removeStorageSync(storageKeys.OPENID);
            Taro.removeStorageSync(storageKeys.UNIONID);
            Taro.removeStorageSync(storageKeys.USERID);
            Taro.reLaunch({
              url: '../index/index',
            });
          }, 1500)
        }
      })
  };
  return (
    <View className={styles.setting}>
      <View className={styles.item}><Text>手机号</Text><Text className={styles.phone}>{mobile}</Text></View>
      <View className={styles.item} onClick={handleLoginOut}>退出登录</View>
    </View>
  )
};

export default Setting;
