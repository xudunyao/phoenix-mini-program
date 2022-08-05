import Taro,{useReady} from '@tarojs/taro';
import { View } from '@tarojs/components';
import auth from '@/stores/auth';
import backgroundImg from '@/constants/backgroundImg';
import styles from "./invitePoster.module.scss";

const InvitePoster = () => {
  const handleClick = () => {
    Taro.redirectTo({
      url: '/pages/loginGuide/index'
    })
  }
  useReady(() => {
    if(auth.info.token) {
      Taro.redirectTo({
        url: '/packageActivity/pages/giftBag/index'
      })
    }
  })
  return <View><View onClick={handleClick} className={styles.content} style={{backgroundImage:  `url(${backgroundImg.poster})`}}><View className={styles.img}></View></View></View>
}
export default InvitePoster;
