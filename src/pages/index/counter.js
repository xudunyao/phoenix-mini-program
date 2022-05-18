import { View, Button, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import counterStore from './store'

const Counter = () => {
  return (
    <View style={{ display: 'flex', alignItems: 'center'}}>
      <Button size='mini' onClick={() => counterStore.increment()}>+</Button>
      <Text>{counterStore.counter}</Text>
      <Button size='mini' onClick={() => counterStore.decrement()}>-</Button>
    </View>
  )
}

export default observer(Counter)