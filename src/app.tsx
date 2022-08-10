import Taro,{ useDidHide, useDidShow, showToast,useRouter } from '@tarojs/taro'
import { duration } from 'moment';
import { httpRequest } from '@/utils';
import auth from '@/stores/auth';
import {  storageKeys } from '@/constants';

import './app.scss'

const App = ({ children }) => {
  const isH5 = process.env.TARO_ENV === 'h5';
  const router = useRouter()
  const handleHomePage = async () => {
    try {
      const res = await httpRequest.post(`phoenix-center-backend/client/noauth/track/record`,{
        data: {
          page: 'home',
          memberId: auth?.userid,
          event: 'home_page_view',
          type: process.env.TARO_ENV === 'h5' ? 'H5' : 'WECHAT',
          scene: Taro.getStorageSync(storageKeys.scene),
          time: new Date().getTime(),
          openId: auth?.openid,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
    } catch (err) {
      console.log('err',err)
    }
  }
  const setScene = () => {
    if (isH5) {
      const { scene } = router;
      scene && Taro.setStorageSync('SCENE', scene);
    }else{
      const url = children[children?.length - 1]?.key;
      const sceneParams = url ? url?.split('?')[1] : '';
      const sceneObj:any = {}
      sceneParams.split('&').forEach(item => {
        const [key, value] = item.split('=')
        sceneObj[key] = value
      })
      sceneObj?.scene && Taro.setStorageSync('SCENE', sceneObj.scene);
    }
  }

  setScene();
  useDidHide(() => {
    console.log('App Did Hide');
  });
  useDidShow(() => {
    console.log('App Did Show');
    handleHomePage();
  });
  return children;
}

export default App
