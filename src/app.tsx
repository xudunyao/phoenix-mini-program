import { useDidHide, useDidShow } from '@tarojs/taro'

import './app.scss'

const App = ({ children }) => {
  useDidHide(() => {
    console.log('App Did Hide');
  });
  useDidShow(() => {
    console.log('App Did Show');
  });

  return children;
}

export default App
