import Taro from '@tarojs/taro';
import { observer } from 'mobx-react-lite';
import { View, Image } from '@tarojs/components';
import styles from  './Login.module.scss';

const Login = () => {
  const isH5 = process.env.TARO_ENV === 'h5';
  const handleClick = () => {
    Taro.navigateTo({
      url: isH5 ? '/pages/login/index' : '/pages/loginGuide/index'
    })
  }
  return (
    <View className={styles.login}>
      <Image src={require('./img/user.png')} className={styles['login-img']} />
      <View className={styles['login-tips']}>您还未登录</View>
      <View className={styles['login-btn']} onClick={handleClick}>登录</View>
    </View>
  );
}

export default observer(Login);