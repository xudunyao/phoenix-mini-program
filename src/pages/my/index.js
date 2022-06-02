import { useEffect , useState } from 'react';
import { View } from '@tarojs/components';
import {NavBar} from '@/components'
import { httpRequest } from '@/utils';
import {Auth,Wallet,Workbench} from "./components"
import styles from  './My.module.scss';

const My = () => {
  const [isValidation,setIsValidation] = useState(false);
  const handleWalletClick = () => {
    //TODO
  }
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
  }
  useEffect(() => {
    getUserInfo();
  }, [])
  return  (
    <View className={styles.my}>
      <NavBar title='我的' />
      <Auth validation={isValidation} />
      <Wallet onClick={handleWalletClick} />
      <Workbench />
    </View>
  )
  }

export default My;
