import { IconFont } from "@/components";
import { View, Text } from "@tarojs/components";

import Logo from '../components/logo';

import styles from './LoginGuide.module.scss'

const LoginGuide = () => {
  return (
    <View className={styles.login}>
      <Logo />
      <View className={styles.content}>
        <View className={`${styles['login-btn']} ${styles.wechat}`} >
          <View className={styles['btn-icon']}>
            <IconFont name='wechat'  size='24px' />
          </View>
          微信一键登录
        </View>
        <View className={`${styles['login-btn']} ${styles.phone}`} >
          <View className={styles['btn-icon']}>
            <IconFont name='phone'  size='24px' />
          </View>
          手机验证码登录
        </View>
        <View className={styles.protocol}>
          登录即代表您同意寻工鸟<Text className={styles['protocol-text']}>《用户协议》</Text>和<Text className={styles['protocol-text']}>《隐私协议》</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginGuide;