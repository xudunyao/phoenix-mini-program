import Taro, { showToast } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import { httpRequest, common } from '@/utils';
import { IconFont, InfiniteScroll } from '@/components';
import { storageKeys } from '@/constants';

import styles from  './List.module.scss';


const List = ({
  name,
  closeDialog,
}) => {
  const getData = async (search) => {
    try {
      const res = await httpRequest.post('phoenix-manager-backend/client/noauth/positionOrders/inquiry',{
        data: {
          searchEnum: name,
          ...search,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const toPage = (id) => {
    Taro.navigateTo({
      url: `/pages/position/index?positionId=${id}`,
    });
  };
  const handleSignUp = async(positionId) => {
    const token = Taro.getStorageSync(storageKeys.TOKEN);
    const mobile = Taro.getStorageSync(storageKeys.MOBILE);
    const platform = process.env.TARO_ENV;
    
    if(token) {
      try {
        const res = await httpRequest.post(`phoenix-manager-backend/client/signUp/${positionId}`, {
          data: {
            mobile,
            platform,
          }
        });
        if (res?.code !== 0) {
          throw new Error(res.msg);
        } else {
          common.templateIdQuery();
          closeDialog('success')
        }
      } catch (err) {
        showToast({
          icon: 'none',
          title: `${err}`
        })
      }
    } else {
      closeDialog('login')
    }
    
  };
  return (
    <InfiniteScroll
      getData={getData}
      pageSize={20}
      renderItem={(item) => (
        <View key={item.id} className={styles.list} onClick={() => toPage(item.id)}>
          
          <Image className={styles.img} src={item.positionImage}></Image>
          <View className={styles.content}>
            <View className={styles.title}>{item.jobName}</View>
            <View className={styles.money}>
              <Text className={styles.price}>
                <Text className={styles['price_count']}>{item.orderPriceStart}{item.orderPriceEnd && `-${item.orderPriceEnd}`}</Text>
                <Text className={styles['price_unit']}>{item.orderPriceType}</Text>
              </Text>
              {
                item.subsidyAmount && (
                  <Text className={styles.subsidy}>
                    <Text className={styles['subsidy_count']}>{`+${item.subsidyAmount}`}</Text>
                    <Text className={styles['subsidy_unit']}>元/小时补贴</Text>
                  </Text> 
                )
              }
              
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
            <View className={styles.sign} onClick={(e)=>{e.stopPropagation();handleSignUp(item.id)}}>立即报名</View>
          </View>
        </View>
      )}
    >
    </InfiniteScroll>
  );
}
List.propTypes = {
  name: PropTypes.string,
};

List.defaultProps = {
  name: '',
};
export default List;