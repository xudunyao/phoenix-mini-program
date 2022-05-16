import { useDidHide, useDidShow } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'

import counterStore from './store'

import './index.scss'

const Index = () => {
  useDidHide(() => {
    console.log('Index Did Hide');
  });
  useDidShow(() => {
    console.log('Index Did Show');
  })
  return (
    <View className='index'>
      <Button onClick={() => counterStore.increment()}>+</Button>
      <Button onClick={() => counterStore.decrement()}>-</Button>
      <Button onClick={() => counterStore.incrementAsync()}>Add Async</Button>
      <Text>{counterStore.counter}</Text>
    </View>
  )
};

export default observer(Index)
