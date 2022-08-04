import Taro,{ useDidHide, useDidShow, showToast,useRouter } from '@tarojs/taro'
import { duration } from 'moment';

import './app.scss'

const App = ({ children }) => {
  const isH5 = process.env.TARO_ENV === 'h5';
  const router = useRouter()
  const setScene = () => {
    if (isH5) {
      const { scene } = router;
      scene && Taro.setStorageSync('scene', scene);
    }else{
      const url = children[children?.length - 1]?.key;
      const sceneParams = url ? url?.split('?')[1] : '';
      const sceneObj:any = {}
      sceneParams.split('&').forEach(item => {
        const [key, value] = item.split('=')
        sceneObj[key] = value
      })
      sceneObj?.scene && Taro.setStorageSync('scene', sceneObj.scene);
    }
  }
  setScene();
  useDidHide(() => {
    console.log('App Did Hide');
  });
  useDidShow(() => {
    console.log('App Did Show');
  });
  return children;
}

export default App
