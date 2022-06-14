import { View ,Image,Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import auth from '@/stores/auth';
import styles from  './Auth.module.scss';
import inactive_auth from './img/inactive_auth.png';
import active_auth from './img/active_auth.png';
import avatar from './img/avatar.png';

const Auth = (
  {
    validation,
    notLogin,
  }
) => {
  const handleAuthClick = () => {
    if(!auth.info.token){
      notLogin();
      return;
    }
    Taro.navigateTo({
      url: '/pages/auth/index'
    })
  }
  return (
    <View className={styles.auth}>
        <View className={styles.center}>
          <Image src={avatar} className={styles.img}  />
          <Text className={styles.name}>寻工鸟用户</Text>
        </View>
        <View className={`${styles.center} ${styles.base} ${validation ? styles.active : styles.inactive }`} onClick={validation || handleAuthClick}>
          <Image src={validation ? active_auth : inactive_auth} className={styles.icon}  />
          <Text>{validation ? '已认证' :'去认证'}</Text>
        </View>
    </View>
  )
};
export default Auth
