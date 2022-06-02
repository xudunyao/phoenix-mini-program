import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { httpRequest } from '@/utils';
import exampleImg from '@/assets/images/example.png';
import { IconFont } from '@/components';
import SwiperIndex from '../components/swiper/index';
import styles from './Position.module.scss';

const Position = () => {
  const [positionObj, setPositionObj] = useState();
  const getData = async () => {
    try {
      const res = await httpRequest.get(`phoenix-manager-backend/client/noauth/positionOrders/62981afc9973bc572d1a5d1e`);
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setPositionObj(res.data)
    } catch (err) {
      // toast or console
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View className={styles.position}>
      <SwiperIndex customStyle='height: 216px' list={positionObj?.companyImages} />
      <View className={styles.header}>
        <View className={styles['header-top']}>
          <View className={styles.title}>{positionObj?.jobName}</View>
          <View className={styles.money}>
            <Text className={styles.price}>
              <Text className={styles['price_count']}>{positionObj?.salaryStart}-{positionObj?.salaryEnd}</Text>
              <Text className={styles['price_unit']}>元/时</Text>
            </Text>
          
            <Text className={styles.subsidy}>
              <Text className={styles['subsidy_count']}>+1</Text>
              <Text className={styles['subsidy_unit']}>元/小时补贴</Text>
            </Text> 
          </View>
          <View className={styles.tags}>
            {
              positionObj?.tags.map((item) => (
                <Text className={styles['tags-item']}>{item}</Text>
              ))
            }
          </View>
        </View>
        <View className={styles['header-bottom']}>
          <Image className={styles.img} mode='widthFix' src={exampleImg}></Image>
          <Text className={styles.name}>{positionObj?.companyName}</Text>
        </View>
      </View>
      <View className={styles.content}>
        <View className={styles.item}>
          <View className={styles['item-header']}>我的收入</View>
        
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>综合收入</View>
            <View className={styles['item-body-text']}>{positionObj?.salaryStart}-{positionObj?.salaryEnd}元</View>
          </View>
          
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>发薪日</View>
            <View className={styles['item-body-text']}>每月{positionObj?.payday}日</View>
          </View>
        </View>
        <View className={styles.item}>
          <View className={styles['item-header']}>我的福利</View>
            {
              positionObj?.positionDescribe.map((v) => (
                <View className={styles['item-body']}>
                  <View className={styles['item-body-label']}>{v.name}</View>
                  <View className={styles['item-body-text']}>{v.value}</View>
                </View>
              ))
            }
        </View>
        <View className={styles.item}>
          <View className={styles['item-header']}>我的工作</View>
          {
              positionObj?.jobRequest.map((v) => (
                <View className={styles['item-body']}>
                  <View className={styles['item-body-label']}>{v.name}</View>
                  <View className={styles['item-body-text']}>{v.value}</View>
                </View>
              ))
            }
        </View>
        <View className={styles.item}>
          <View className={styles['item-header']}>工厂地址</View>
            <View className={styles['item-body']}>
              <View className={styles['item-body-label']}>{positionObj?.area}</View>
              <View className={styles['item-body-text']}>{positionObj?.city}{positionObj?.area}{positionObj?.addressDetail}</View>
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