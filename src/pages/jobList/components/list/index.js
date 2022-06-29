import Taro, { showToast } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import { httpRequest, templateIdQuery } from '@/utils';
import { IconFont, InfiniteScroll, Result } from '@/components';
import { storageKeys, resultImg } from '@/constants';

import styles from  './List.module.scss';


const List = ({
  name,
  closeDialog,
  scrollY,
}) => {
  const icon = {
    src:resultImg.empty,
    width: 120,
    height: 120,
  }
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
          templateIdQuery();
          closeDialog('success')
        }
      } catch (err) {
        showToast({
          icon: 'none',
          title: `${err.message}`
        })
      }
    } else {
      closeDialog('login')
    }
    
  };
  return (
    <InfiniteScroll
      getData={getData}
      pageSize={15}
      scrollY={scrollY}
      noDataComponent={
        <Result
          icon={icon}
          subTitle='暂无更多数据' 
        />
      }
      renderItem={(item) => (
        <View key={item.id} className={styles.list} onClick={() => toPage(item.id)} >
          
          <Image className={styles.img} src={item.positionImage} mode='aspectFill'></Image>
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
                item.tags.slice(0,3).map((v) => (
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
  scrollY: PropTypes.bool,
};

List.defaultProps = {
  name: '',
  scrollY: false,
};
export default List;