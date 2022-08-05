import Taro from '@tarojs/taro';
import { observer } from 'mobx-react-lite';
import { View, Image, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import { httpRequest } from '@/utils';
import auth from '@/stores/auth';
import { IconFont, InfiniteScroll, Result } from '@/components';
import { resultImg } from '@/constants';
import styles from  './List.module.scss';

const List = ({
  name,
  title,
  closeDialog,
  scrollY,
  handleSubmit,
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
          registerAward: title === 'award' ? true : false,
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
    if(auth.info.token) {
      if(!auth.realInfo.completeInfo){
        closeDialog('sign', positionId);
        return;
      } else {
        handleSubmit(positionId)
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
                 item.subsidyAmount || item.subsidyAmount && <Text className={styles.subsidy}>
                    {
                      item.subsidyAmount && (
                        <>
                           <Text className={styles['subsidy_count']}>{`+${item.subsidyAmount}`}</Text>
                           <Text className={styles['subsidy_unit']}>元/小时补贴</Text>
                        </>
                      )
                    }
                    { item.registerAward && (
                        <>
                          <Text className={styles['subsidy_award']}>入职即奖<Text className={styles['subsidy_money']}>1288</Text>元</Text>
                        </>
                      )
                    }
                  </Text> 
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
  handleSubmit: PropTypes.func,
};

List.defaultProps = {
  name: '',
  scrollY: false,
  handleSubmit: () => {},
};
export default observer(List);