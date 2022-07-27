import { useState } from 'react';
import { View, Text,Image } from "@tarojs/components";
import Taro,{ showToast,useDidShow } from '@tarojs/taro';
import { IconFont } from "@/components";
import { httpRequest } from '@/utils';
import styles from "./UnbindCard.module.scss";

const UnbindCard = () => {
  const [isTipsShow,setIsTipsShow] = useState(true);
  const [bankInfo,setBankInfo] = useState({});
  const getBankInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/bankInfo');
      if(res?.code !== 0){
        throw new Error(res?.msg);
      }
      setBankInfo(res.data);
    } catch (err) {
      console.log('err',err)
    }
  }
  const handleUnbindCard = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/unBindCard');
      if(res?.code !== 0){
        throw new Error(res?.msg);
      }
      showToast({
        title: '解绑成功',
      });
      Taro.switchTab({
        url: '/pages/my/index',
      })
    } catch (err) {
      showToast({
        title: `${err.message}`,
      });
    }
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
            <View style={{marginLeft:'auto'}}>
              <IconFont name='close' size={16} color='#F5B253' onClick={()=>{setIsTipsShow(false)}}  />
            </View>
          </View>
      ) : null
      }
      <View className={styles.title}>银行卡账号</View>
      <View className={styles.bank}>
        <Image className={styles['bank-logo']} src={require(`../withdraw/img/${bankInfo.bankCode}.png`)} />
        <View className={styles['bank-name']}>{`${bankInfo?.bankName}(尾号${bankInfo.bankNo?.substr(bankInfo.bankNo?.length - 4)})`}</View>
        <View className={styles['bank-btn']} onClick={handleUnbindCard}>解除绑定</View>
      </View>
    </View>
  );
};
export default UnbindCard;


