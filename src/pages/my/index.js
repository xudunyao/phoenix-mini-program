import { View } from '@tarojs/components';
import {Auth,Wallet,Workbench} from "./components"
import styles from  './My.module.scss';

const My = () => {
  const handleWalletClick = () => {
    //TODO
  }
  const handleAuthClick = () => {
    //TODO
  }
  return  (
    <View className={styles.my}>
      <Auth onClick={handleAuthClick} isActive />
      <Wallet onClick={handleWalletClick} />
      <Workbench />
    </View>
  )
  }

export default My;
