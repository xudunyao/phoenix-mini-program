import { View, Text, Image } from '@tarojs/components';
import exampleImg from '@/assets/images/example.png';
import { IconFont } from '@/components';
import SwiperIndex from '../components/swiper/index';
import styles from './Position.module.scss';


const Position = () =>{
  return (
    <View className={styles.position}>
      <SwiperIndex />
      <View className={styles.header}>
        <View className={styles['header-top']}>
          <View className={styles.title}>石岩宇通-检测员32元/时</View>
          <View className={styles.money}>
            <Text className={styles.price}>
              <Text className={styles['price_count']}>32</Text>
              <Text className={styles['price_unit']}>元/时</Text>
            </Text>
          
            <Text className={styles.subsidy}>
              <Text className={styles['subsidy_count']}>+1</Text>
              <Text className={styles['subsidy_unit']}>元/小时补贴</Text>
            </Text> 
          </View>
          <View className={styles.tags}>
            <Text className={styles['tags-item']}>正式工</Text>
            <Text className={styles['tags-item']}>底薪高</Text>
            <Text className={styles['tags-item']}>福利好</Text>
          </View>
        </View>
        <View className={styles['header-bottom']}>
          <Image className={styles.img} mode='widthFix' src={exampleImg}></Image>
          <Text className={styles.name}>富士康科技</Text>
        </View>
      </View>
      <View className={styles.content}>
        <View className={styles.item}>
          <View className={styles['item-header']}>我的收入</View>
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>综合收入</View>
            <View className={styles['item-body-text']}>每月15号</View>
          </View>
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>综合收入</View>
            <View className={styles['item-body-text']}>每月15号</View>
          </View>
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>综合收入</View>
            <View className={styles['item-body-text']}>每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号每月15号</View>
          </View>
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>综合收入</View>
            <View className={styles['item-body-text']}>每月15号</View>
          </View>
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>综合收入</View>
            <View className={styles['item-body-text']}>每月15号</View>
          </View>
        </View>
      </View>
      <View className={styles.bottom}>
        <View className={styles.icon}><View className={styles['icon-item']}><IconFont name='blod-call' size='32px' /></View>电话咨询</View>
        <View className={styles.icon}><View className={styles['icon-item']}><IconFont name='share' size='32px' /></View>岗位分享</View>
        <View className={styles['bottom-btn']}>立即报名</View>
      </View>
    </View>
  );
};
export default Position;