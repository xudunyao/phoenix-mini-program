import { View, Image } from '@tarojs/components';

import styles from './Progress.module.scss';

const Progress = ({
  size = 4,
  percentage
}) => {
  return (
    <View className={styles['progress']}>
      {
        new Array(size).fill(1).map((item)=>{
          return (
            <View className={styles['progress-dot-wrapper']} key={item}>
              <View className={styles['progress-dot']} />
            </View>
          )
        })
      }
      <View className={styles['percentage']} style={{width:`${percentage} / 100`}} />
  </View>
  )
}
export default Progress;
