import { View ,Image,Text} from '@tarojs/components';
import styles from  './Auth.module.scss';
import inactive_auth from './img/inactive_auth.png';
import active_auth from './img/active_auth.png';

const Auth = (
  {
    onClick,
    isActive,
  }
) => {
  return (
    <View className={styles.auth}>
        <View className={styles.center}>
          <Image src='' className={styles.img}  />
          <Text className={styles.name}>Hi,小橙子</Text>
        </View>
        <View className={`${styles.center} ${styles.base} ${isActive ? styles.active : styles.inactive }`} onClick={onClick}>
          <Image src={isActive ? active_auth : inactive_auth} className={styles.icon}  />
          <Text>{isActive ? '已认证' :'去认证'}</Text>
        </View>
    </View>
  )
};
export default Auth
