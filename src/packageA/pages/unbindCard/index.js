import { useState } from 'react';
import { View, Text, Image } from "@tarojs/components";
import Taro, { showToast, useDidShow } from '@tarojs/taro';
import { IconFont, Dialog } from "@/components";
import { httpRequest } from '@/utils';
import styles from "./UnbindCard.module.scss";

const backImg = [
  '0100',
  '0102',
  '0103',
  '0104',
  '0105',
  '0301',
  '0308',
]
const UnbindCard = () => {
  const [isTipsShow, setIsTipsShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleBind, setVisibleBind] = useState(false);
  const [bankInfo, setBankInfo] = useState({});
  const getBankInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/bankInfo');
      if (res?.code !== 0) {
        throw new Error(res?.msg);
      }
      setBankInfo(res.data);
    } catch (err) {
      console.log('err', err)
    }
  }
  const handleUnbindCard = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/unBindCard');
      if (res?.code !== 0) {
        throw new Error(res?.msg);
      }
      setVisibleBind(true);
    } catch (err) {
      showToast({
        title: `${err.message}`,
        icon: 'none',
      });
    }
  }
  const handleCancel = () => {
    setVisibleBind(false);
    Taro.switchTab({
      url: '/pages/my/index',
    })
  }
  const handleEnsure = () => {
    setVisibleBind(false);
    Taro.reLaunch({
      url: '/packageA/pages/bindCard/index'
    })
  }
  useDidShow(() => {
    getBankInfo();
  })
  return (
    <View className={styles.container}>
      {
        isTipsShow ? (
          <View className={styles.prompt}>
            <Text>暂只支持绑定一个银行卡账号，若要更换请先解绑</Text>
            <View style={{ marginLeft: 'auto' }} onClick={() => setIsTipsShow(false)} >
              <IconFont name='close' size={16} color='#F5B253' />
            </View>
          </View>
        ) : null
      }
      <View className={styles.title}>银行卡账号</View>
      <View className={styles.bank}>
        <Image className={styles['bank-logo']} src={require(`../withdraw/img/${backImg.includes(bankInfo?.bankCode) ? bankInfo.bankCode : '8888'}.png`)} />
        <View className={styles['bank-name']}>{`${bankInfo?.bankName}(尾号${bankInfo.bankNo?.substr(bankInfo.bankNo?.length - 4)})`}</View>
        <View className={styles['bank-btn']} onClick={() => setVisible(true)}>解除绑定</View>
      </View>
      <Dialog
        maskClosable
        visible={visible}
        content='您还确定解绑银行卡吗？'
        actions={
          [{
            title: '取消',
            onClick: () => { setVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '确定',
            onClick: () => {
              setVisible(false)
              handleUnbindCard()
            },
            type: 'primary',
            size: 'mini'
          }]
        }
      />
      <Dialog
        maskClosable
        visible={visibleBind}
        content='解绑成功需要重新绑定银行卡吗？'
        actions={
          [{
            title: '取消',
            onClick: handleCancel,
            type: 'default',
            size: 'mini'
          }, {
            title: '确定',
            onClick: handleEnsure,
            type: 'primary',
            size: 'mini'
          }]
        }
      />
    </View>
  );
};
export default UnbindCard;


