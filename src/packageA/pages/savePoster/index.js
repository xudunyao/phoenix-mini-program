import { useState,useEffect } from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Loading } from "@/components";
import { getBaseUrl  } from "@/utils";
import storageKeys from '@/constants/storageKeys';
import styles from  './SavePoster.module.scss';

const SavePoster = () => {
  const [url,setUrl] = useState();
  const [isLoading,setIsLoading] = useState(true);
  const getInviteQrCode = async () => {
    setIsLoading(true);
    const token = Taro.getStorageSync(storageKeys.TOKEN);
    const base = await getBaseUrl();
    Taro.downloadFile({
      url:`${base}phoenix-center-backend/client/invite/generate/qrcode`,
      header:{
        'X-User-Token': token,
      },
      success:(res)=>{
        setUrl(res.tempFilePath)
        setIsLoading(false);
      }
    })
  }
  useEffect(()=>{
    getInviteQrCode()
  },[])
  return (
    <View className={styles['container']}>
      {
        isLoading ? (
          <View className={styles.loading}>
            <Loading size='40px' color='#80A2FF' />
          </View>
        ) : <Image src={url} mode='widthFix' style={{width:'100%'}} showMenuByLongpress />
      }
    </View>
  );
};
export default SavePoster;


