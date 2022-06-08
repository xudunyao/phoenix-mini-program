import { View,Text} from '@tarojs/components';
import { showToast } from "@tarojs/taro";
import numeral from 'numeral';
import styles from  './Wallet.module.scss';

const Wallet = () => {
  const handleClick = () => {
    showToast({
      icon: 'none',
      title: '暂未开放'
  })}
  return (
    <View className={styles.wallet}>
        <View>
          <View className={styles.title}>钱包(元)</View>
          <Text className={styles.money}>{numeral(0).format('0,0.00')}</Text>
        </View>
        <View className={styles.button} onClick={handleClick}>
          去提现
        </View>
    </View>
  )
};

export default Wallet
