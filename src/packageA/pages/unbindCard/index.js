import { useState } from 'react';
import { View, Text,Image } from "@tarojs/components";
import { showToast } from '@tarojs/taro';
import { IconFont } from "@/components";
import { httpRequest } from '@/utils';
import styles from "./UnbindCard.module.scss";

const UnbindCard = () => {
  const [isTipsShow,setIsTipsShow] = useState(true);
  const handleClick = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/unbindCard');
      if(res?.code !== 0){
        throw new Error(res?.msg);
      }
      showToast({
        title: '解绑成功',
        icon: 'success',
        duration: 2000,
      });
      setIsTipsShow(false);
    } catch (err) {
      console.log('err',err)
    }
  }
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
        <Image className={styles['bank-logo']} src={require('@/assets/images/iconIndex_active.png')} />
        <View className={styles['bank-name']}>中国农业银行(尾号1170)备份</View>
        <View className={styles['bank-btn']} onClick={handleClick}>解除绑定</View>
      </View>
    </View>
  );
};
export default UnbindCard;


