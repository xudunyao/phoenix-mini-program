import { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { showToast, useDidShow } from "@tarojs/taro";
import { Dialog } from '@/components';
import auth from '@/stores/auth';
import { httpRequest } from '@/utils';
import numeral from 'numeral';
import styles from './Wallet.module.scss';


const Wallet = ({
  notLogin,
}) => {
  const [walletInfo, setWalletInfo] = useState(0);
  const handleClick = () => {
    if (!auth.info.token) {
      notLogin();
      return;
    }
    if (!walletInfo.validation) {
      showToast({
        title: '请先完成实名认证',
        icon: 'none',
      })
      return;
    }
    if (walletInfo.disable) {
      showToast({
        title: '您的账户异常请联系管理员',
        icon: 'none',
      })
      return;
    }
    Taro.navigateTo({
      url: '/packageA/pages/wallet/index'
    });
  }
  const getWalletInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/walletInfo');
      if (res?.code !== 0) {
        throw new Error(res?.msg);
      }
      setWalletInfo(res.data);
    } catch (err) {
      console.log('err', err)
    }
  }
  useDidShow(() => {
    getWalletInfo();
  });
  return (
    <>
      <View className={styles.wallet}>
        <View>
          <View className={styles.title}>钱包(元)</View>
          <Text className={styles.money}>{numeral(walletInfo?.balance).format('0,0.00')}</Text>
        </View>
        <View className={styles.button} onClick={handleClick}>
          去提现
        </View>
      </View>
    </>
  )
};
export default Wallet
