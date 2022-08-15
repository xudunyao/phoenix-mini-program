import Taro from '@tarojs/taro';
import React, { useState,useEffect,useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Image, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import { httpRequest } from '@/utils';
import auth from '@/stores/auth';
import { IconFont, InfiniteScroll, Result, Loading } from '@/components';
import { resultImg } from '@/constants';
import styles from  './List.module.scss';

const icon = {
  src:resultImg.empty,
  width: 120,
  height: 120,
}
const List = ({
  pagination,
  closeDialog,
  handleSubmit
}) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async (search) => {
    if(pagination.pageNumber === 0){
     setIsLoading(true);
    }
    try {
      const res = await httpRequest.post('phoenix-manager-backend/client/noauth/positionOrders/inquiry',{
        data: {
          searchEnum: pagination.type === 'ALL_reward' ? 'ALL' : pagination.type,
          ...search,
          registerAward: pagination.type === 'ALL_reward' ? true : false,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setTotalPages(res.data.totalPages);
      if(pagination.pageNumber === 0 ){
        setData(res.data.content);
        return ;
      }
      setData((prev) => [...prev, ...res.data.content]);
    } catch (err) {
      console.log(err);
    }finally{
      setIsLoading(false);
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
  const hasMore = useMemo(() => {
    if(pagination.pageNumber === 0 || totalPages === 0){
      return true;
    }
    return pagination?.pageNumber < totalPages;
  }, [pagination])
  useEffect(() => {
    hasMore && getData(pagination);
  },[pagination])
  return (
   <>
      {
        isLoading 
          ? 
          <View className='infinite-scroll-container'><Loading size='40px' color='#80A2FF' /></View>
          : 
          data.length 
          ? data.map((item, index) => {
              return (
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
                        (item.subsidyAmount || item.registerAward) && <Text className={styles.subsidy}>
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
                                <Text className={styles['subsidy_award']}>入职即奖<Text className={styles['subsidy_money']}>1288.8</Text>元</Text>
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
              )
            })
          : <Result icon={icon} subTitle='暂无更多数据' />
      }
      {
        (!hasMore && data.length > 0)  && (<Text className='infinite-scroll-text'>没有更多数据了</Text>)
      }
   </>
  )
}
List.propTypes = {
  key: PropTypes.string,
  pagination: PropTypes.shape({}),
  closeDialog: PropTypes.func,
  handleSubmit: PropTypes.func,
};

List.defaultProps = {
  key: 'ALL',
  pagination: {
    pageNumber: 0,
    pageSize: 10,
  },
  closeDialog: () => {},
  handleSubmit: () => {},
};
export default observer(List);