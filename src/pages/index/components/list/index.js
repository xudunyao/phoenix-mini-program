import { View, Image, Text } from '@tarojs/components';
import exampleImg from '@/assets/images/example.png';
import { IconFont, InfiniteScroll } from '@/components';

import styles from  './List.module.scss';

const List = () => {
  const getData = async (search) => {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        const response = {
          code: 0,
          data: {
            content: new Array(search.pageSize).fill(search.pageNumber),
            ...search,
            totalPages: 5,
          }};
        resolve(response)
      }, 500);
    });
    return res.data;
  }
  return (
    <InfiniteScroll
      getData={getData}
      pageSize={20}
      renderItem={(item) => (
        <View className={styles.list} >
        <Image className={styles.img} src={exampleImg}></Image>
        <View className={styles.content}>
          <View className={styles.title}>{item}这是标题它到这儿哦哦哦哦...</View>
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
          <View className={styles.location}>
            <IconFont name='location' />
            深圳龙华
          </View>
          <View className={styles.sign}>立即报名</View>
        </View>
      </View>
      )}
    >
    </InfiniteScroll>
  );
}
export default List;