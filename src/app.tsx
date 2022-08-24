import Taro,{ useDidHide, useDidShow, useRouter } from '@tarojs/taro'
import { storageKeys } from './constants';
import { setScene } from './utils';
import './app.scss'

const App = ({ children }) => {
  const router = useRouter()
  setScene(children,router);
  useDidHide(() => {
    Taro.removeStorageSync(storageKeys.scene);
    Taro.removeStorageSync(storageKeys.isFirst);
  });
  useDidShow(() => {
    Taro.setStorageSync(storageKeys.isFirst, true);
  });
  return children;
}

export default App
