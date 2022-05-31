import { View,Text} from '@tarojs/components';
import numeral from 'numeral';
import styles from  './Wallet.module.scss';

const Wallet = (
  {
    onClick,
  }
) => {
  return (
    <View className={styles.wallet}>
        <View>
          <View className={styles.title}>钱包(元)</View>
          <Text className={styles.money}>{numeral(1234).format('0,0.00')}</Text>
        </View>
        <View className={styles.button} onClick={onClick}>
          去提现
        </View>
    </View>
  )
};

export default Wallet
