import { useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import { View } from '@tarojs/components';
import { httpRequest } from '@/utils';
import {Auth,Wallet,Workbench} from "./components"
import styles from  './My.module.scss';

const My = () => {
  const [isValidation,setIsValidation] = useState(false);
  const getUserInfo = async () => {
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/certification/info');
      if(res?.code === 0){
        setIsValidation(res?.data?.validation);
      }else{
        showToast({
          icon: 'fail',
          title: res?.msg
        })
      }
    } catch (err) {
      console.log(err);
    }
  };
  useDidShow(() => {
    getUserInfo();
  });
  return  (
    <>
      <View className={styles.my}>
      <Auth validation={isValidation} />
      <Wallet />
      <Workbench validation={isValidation} />
    </View>
    </>
  )
  }

export default My;
