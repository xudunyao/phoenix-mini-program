import Taro,{ useDidHide, useDidShow ,useRouter } from '@tarojs/taro'
import './app.scss'

const App = ({ children }) => {
  const isH5 = process.env.TARO_ENV === 'h5';
  const router = useRouter()
  const setScene =  () => {
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
    Taro.removeStorageSync('SCENE');
    console.log('hide')
  });
  useDidShow(() => {
    console.log('show')
  });
  return children;
}

export default App
