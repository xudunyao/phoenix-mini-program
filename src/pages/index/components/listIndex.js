import { View, Image, Text } from '@tarojs/components';
import exampleImg from '@/assets/images/example.png';
import { IconFont } from '@/components';

import styles from  './listIndex.module.scss';

const ListIndex = () => {
  console.log('...');
  return (
    <View style={{ height: '100%', overflowY: 'scroll'}} >
      <View className={styles.list} >
        <Image className={styles['list-img']} src={exampleImg}></Image>
        <View className={styles['list-content']}>
          <View className={styles['list-content-title']}>这是标题它到这儿哦哦哦哦...</View>
          <View className={styles['list-content-money']}>
            <Text className={styles['list-content-money-price']}>
              <Text className={styles['list-content-money-price_count']}>32</Text>
              <Text className={styles['list-content-money-price_unit']}>元/时</Text>
            </Text>
          
            <Text className={styles['list-content-money-subsidy']}>
              <Text className={styles['list-content-money-subsidy_count']}>+1</Text>
              <Text className={styles['list-content-money-subsidy_unit']}>元/小时补贴</Text>
            </Text> 
          </View>
          
          <View className={styles['list-content-tags']}>
            <Text className={styles['list-content-tags-item']}>正式工</Text>
            <Text className={styles['list-content-tags-item']}>底薪高</Text>
            <Text className={styles['list-content-tags-item']}>福利好</Text>
          </View>
          <View className={styles['list-content-location']}>
            <IconFont name='location' size='30PX' />
            深圳龙华
          </View>
        </View>
      </View>
      <View className={styles.list} >
        <Image className={styles['list-img']} src={exampleImg}></Image>
        <View className={styles['list-content']}>
          <View className={styles['list-content-title']}>这是标题它到这儿哦哦哦哦...</View>
          <View className={styles['list-content-money']}>
            <Text className={styles['list-content-money-price']}>
              <Text className={styles['list-content-money-price_count']}>32</Text>
              <Text className={styles['list-content-money-price_unit']}>元/时</Text>
            </Text>
          
            <Text className={styles['list-content-money-subsidy']}>
              <Text className={styles['list-content-money-subsidy_count']}>+1</Text>
              <Text className={styles['list-content-money-subsidy_unit']}>元/小时补贴</Text>
            </Text> 
          </View>
          
          <View className={styles['list-content-tags']} >
            <Text className={styles['list-content-tags-item']}>正式工</Text>
            <Text className={styles['list-content-tags-item']}>底薪高</Text>
            <Text className={styles['list-content-tags-item']}>福利好</Text>
          </View>
          <View className={styles['list-content-location']} >
            <IconFont name='location' size='30PX' />
            深圳龙华
          </View>
        </View>
      </View>
      <View className={styles.list} >
        <Image className={styles['list-img']} src={exampleImg}></Image>
        <View className={styles['list-content']}>
          <View className={styles['list-content-title']}>这是标题它到这儿哦哦哦哦...</View>
          <View className={styles['list-content-money']}>
            <Text className={styles['list-content-money-price']}>
              <Text className={styles['list-content-money-price_count']}>32</Text>
              <Text className={styles['list-content-money-price_unit']}>元/时</Text>
            </Text>
          
            <Text className={styles['list-content-money-subsidy']}>
              <Text className={styles['list-content-money-subsidy_count']}>+1</Text>
              <Text className={styles['list-content-money-subsidy_unit']}>元/小时补贴</Text>
            </Text> 
          </View>
          
          <View className={styles['list-content-tags']}>
            <Text className={styles['list-content-tags-item']}>正式工</Text>
            <Text className={styles['list-content-tags-item']}>底薪高</Text>
            <Text className={styles['list-content-tags-item']}>福利好</Text>
          </View>
          <View className={styles['list-content-location']}>
            <IconFont name='location' size='30PX' />深圳龙华
          </View>
        </View>
      </View>
      <View className={styles.list} >
        <Image className={styles['list-img']} src={exampleImg}></Image>
        <View className={styles['list-content']}>
          <View className={styles['list-content-title']}>这是标题它到这儿哦哦哦哦...</View>
          <View className={styles['list-content-money']}>
            <Text className={styles['list-content-money-price']}>
              <Text className={styles['list-content-money-price_count']}>32</Text>
              <Text className={styles['list-content-money-price_unit']}>元/时</Text>
            </Text>
          
            <Text className={styles['list-content-money-subsidy']}>
              <Text className={styles['list-content-money-subsidy_count']}>+1</Text>
              <Text className={styles['list-content-money-subsidy_unit']}>元/小时补贴</Text>
            </Text> 
          </View>
          
          <View className={styles['list-content-tags']}>
            <Text className={styles['list-content-tags-item']}>正式工</Text>
            <Text className={styles['list-content-tags-item']}>底薪高</Text>
            <Text className={styles['list-content-tags-item']}>福利好</Text>
          </View>
          <View className={styles['list-content-location']}>
            <IconFont name='location' size='30PX' />深圳龙华
          </View>
        </View>
      </View>
      <View className={styles.list} >
        <Image className={styles['list-img']} src={exampleImg}></Image>
        <View className={styles['list-content']}>
          <View className={styles['list-content-title']}>这是标题它到这儿哦哦哦哦...</View>
          <View className={styles['list-content-money']}>
            <Text className={styles['list-content-money-price']}>
              <Text className={styles['list-content-money-price_count']}>32</Text>
              <Text className={styles['list-content-money-price_unit']}>元/时</Text>
            </Text>
          
            <Text className={styles['list-content-money-subsidy']}>
              <Text className={styles['list-content-money-subsidy_count']}>+1</Text>
              <Text className={styles['list-content-money-subsidy_unit']}>元/小时补贴</Text>
            </Text> 
          </View>
          
          <View className={styles['list-content-tags']}>
            <Text className={styles['list-content-tags-item']}>正式工</Text>
            <Text className={styles['list-content-tags-item']}>底薪高</Text>
            <Text className={styles['list-content-tags-item']}>福利好</Text>
          </View>
          <View className={styles['list-content-location']}>
            <IconFont name='location' size='30PX' />深圳龙华
          </View>
        </View>
      </View>
    </View>
  );
}
export default ListIndex;