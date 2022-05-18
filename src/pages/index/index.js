import { useDidHide, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'

import List from './list';
import Counter from './counter';

import styles from  './Index.module.scss'

const Index = () => {
  useDidHide(() => {
    console.log('Index Did Hide');
  });
  useDidShow(() => {
    console.log('Index Did Show');
  })
  return (
    <View className={styles.container}>
      <Counter />
      <List />
    </View>
  )
};

export default Index
