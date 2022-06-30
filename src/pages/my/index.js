import Taro, { useDidShow,showToast } from '@tarojs/taro';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View } from '@tarojs/components';
import { Dialog } from '@/components';
import { httpRequest, getOverview } from '@/utils';
import auth from '@/stores/auth';
import { Auth, Wallet, Workbench } from "./components"
import styles from  './My.module.scss';

const My = () => {
  const [isValidation,setIsValidation] = useState(false);
  const [visible, setVisible] = useState(false);
  const getUserInfo = async () => {
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/certification/info');
      if(res?.code !== 0){
       throw new Error(res?.msg);
      }
      setIsValidation(res?.data?.validation);
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err}`
      })
    }
  };
  const notLogin = () => {
    if(!auth.info.token){
      setVisible(true);
      return;
    }
  }
  useDidShow(() => {
    if(auth.info.token) {
      getUserInfo();
      getOverview();
    }
    
  });
  return  (
    <>
      <View className={styles.my}>
        <Auth validation={isValidation} notLogin={notLogin} />
        <Wallet />
        <Workbench validation={isValidation} notLogin={notLogin} />
      </View>
      <Dialog 
        maskClosable
        visible={visible}
        content='您还未登录'
        actions={
          [{
            title: '下次再说',
            onClick: () =>{ setVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '去登录',
            onClick: () =>{
              setVisible(false)
              Taro.navigateTo({
                url: '../loginGuide/index'
              })
            },
            type: 'primary',
            size: 'mini'
          }]
        }
      />
    </>
  )
  }

export default observer(My);
