import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { httpRequest } from '@/utils';
import { IconFont, InfiniteScroll } from '@/components';

import styles from  './List.module.scss';

const List = () => {
  const getData = async (search) => {
    try {
      const res = await httpRequest.post('phoenix-manager-backend/client/noauth/positionOrders/inquiry',{
        data: {
          searchEnum: 'ALL',
          ...search,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      return res.data;
    } catch (err) {
      // toast or console
      console.log(err);
    }
  };
  const toPage = (id) => {
    Taro.navigateTo({
      url: `/pages/position/index?positionId=${id}`,
    });
  }
  return (
    <InfiniteScroll
      getData={getData}
      pageSize={20}
      renderItem={(item) => (
        <View className={styles.list} onClick={() => toPage(item.id)} >
          <Image className={styles.img} src={item.positionImage}></Image>
          <View className={styles.content}>
            <View className={styles.title}>{item.jobName}</View>
            <View className={styles.money}>
              <Text className={styles.price}>
                <Text className={styles['price_count']}>{item.salaryStart}-{item.salaryEnd}</Text>
                <Text className={styles['price_unit']}>元/时</Text>
              </Text>
            
              <Text className={styles.subsidy}>
                <Text className={styles['subsidy_count']}>+1</Text>
                <Text className={styles['subsidy_unit']}>元/小时补贴</Text>
              </Text> 
            </View>
            
            <View className={styles.tags}>
              {
                item.tags.map((v) => (
                  <Text className={styles['tags-item']}>{v}</Text>
                ))
              }
            </View>
            <View className={styles.location}>
              <IconFont name='location' />
              {item.city}{item.area}
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