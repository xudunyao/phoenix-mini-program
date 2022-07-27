import { useState } from "react";
import { View, Image } from "@tarojs/components";
import Taro,{ useDidShow} from "@tarojs/taro";
import storageKeys from '@/constants/storageKeys';

const SavePoster = () => {
  const [url,setUrl] = useState();
  const getInviteQrCode = async () => {
    const token = Taro.getStorageSync(storageKeys.TOKEN);
    Taro.downloadFile({
      url:'https://xgn-gateway-uat.fuzfu.net/phoenix-center-backend/client/invite/generate/qrcode',
      header:{
        'X-User-Token': token,
      },
      success:(res)=>{
        setUrl(res.tempFilePath)
      }
    })
  }
  useDidShow(()=>{
    getInviteQrCode()
  })
  return (
    <View>
      <Image src={url} mode='widthFix' style={{width:'100%'}}></Image>
    </View>
  );
};
export default SavePoster;


