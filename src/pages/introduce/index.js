import { View } from '@tarojs/components';
import backgroundImg from '@/constants/backgroundImg';
import styles from "./introduce.module.scss";

const Introduce = () => {
  return <View><View className={styles.content} style={{backgroundImage:  `url(${backgroundImg.introduce})`}}></View></View>
}

export default Introduce;
