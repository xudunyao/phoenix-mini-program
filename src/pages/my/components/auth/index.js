import { View ,Image,Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import auth from '@/stores/auth';
import styles from  './Auth.module.scss';
import inactive_auth from './img/inactive_auth.png';
import active_auth from './img/active_auth.png';
import avatar from './img/avatar.png';

const Auth = (
  {
    infoData,
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
          {
            infoData?.validation? 
            <View className={styles.userInfo}>
              <Text className={styles.userName}>{infoData.realName}</Text>
              <Text className={styles.userMobile}>TEL:{infoData.mobile}</Text>
            </View> : <Text className={styles.name}>寻工鸟用户</Text>
          }
          
        </View>
        <View className={`${styles.center} ${styles.base} ${infoData?.validation ? styles.active : styles.inactive }`} onClick={infoData?.validation || handleAuthClick}>
          <Image src={infoData?.validation ? active_auth : inactive_auth} className={styles.icon}  />
          <Text>{infoData?.validation ? '已认证' :'去认证'}</Text>
        </View>
    </View>
  )
};
export default Auth
