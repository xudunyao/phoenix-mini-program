import { View, Image } from '@tarojs/components';

import styles from './ListItem.module.scss';

const ListItem = ({
  data
}) => {
  return (
    <View className={styles['post-item']}>
    <View className={styles['post-item-header']}>
      <View className={styles['item-header-title']}>
        {data.title}
      </View>
      <View className={styles['item-header-details']}>
        查看详情
      </View>
    </View>
    <View className={styles['post-label-wrapper']}>
      {
        data.label.map((value)=>{
          return <View className={styles['label-item']} key={value}>{value}</View>
        })
      }
    </View>
    <View className={styles['post-item-botton']}>
      <View className={styles['item-botton-money']}>
        {data.money}
      </View>
      <View className={styles['sing-up-button']}>立即报名</View>
    </View>
  </View>
  )
}
export default ListItem;
