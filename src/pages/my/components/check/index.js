import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from  './Check.module.scss';

const Check = () => {
 const handleClick = () =>{
  console.log('跳转')
  Taro.navigateTo({
    url: '/packageActivity/pages/giftBag/index'
  })
 }
  return (
   <View className={styles.content} onClick={handleClick} >
      <View className={styles.button}>去查看</View>
   </View>
  )
};
export default Check
