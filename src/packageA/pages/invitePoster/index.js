import { View } from '@tarojs/components';
import backgroundImg from '@/constants/backgroundImg';
import styles from "./invitePoster.module.scss";

const invitePoster = () => {
  return <View><View className={styles.content} style={{backgroundImage:  `url(${backgroundImg.poster})`}}></View></View>
}

export default invitePoster;
