import { View, Image } from "@tarojs/components";

import logo from './images/logo.png';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <View className={styles.logo}>
      <Image className={styles.img} src={logo} mode='widthFix'></Image>
      <View className={styles.text}>找靠谱工作，就上寻工鸟</View>
    </View>
  );
};
export default Logo;