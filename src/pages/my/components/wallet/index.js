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
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    if (!auth.info.token) {
      notLogin();
      return;
    }
    if (!walletInfo.validation) {
      setVisible(true);
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
      <Dialog
        maskClosable
        visible={visible}
        content='您还未完成实名认证，是否先去实名认证?'
        actions={
          [{
            title: '下次再说',
            onClick: () => { setVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '去认证',
            onClick: () => {
              setVisible(false)
              Taro.navigateTo({
                url: '/pages/auth/index'
              })
            },
            type: 'primary',
            size: 'mini'
          }]
        }
      />
    </>
  )
};
export default Wallet
