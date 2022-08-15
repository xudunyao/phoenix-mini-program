import Taro, { useRouter, useShareAppMessage, showToast, useDidShow } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, Image, Button, RichText } from '@tarojs/components';
import { httpRequest, templateIdQuery, getUserInfo } from '@/utils';
import { resultImg, storageKeys, datetimeFormat } from '@/constants';
import auth from '@/stores/auth';
import moment from 'moment';
import { IconFont, Button as MyButton, Dialog } from '@/components';
import SwiperIndex from '../components/swiper/index';
import Info from '../components/dialog/info';
import styles from './Position.module.scss';

const Position = () => {
  const router = useRouter();
  const isH5 = process.env.TARO_ENV === 'h5';
  const {positionId,scene} = router.params;
  if(scene) {
    Taro.setStorageSync(storageKeys.scene, scene);
  }
  const [shareCode, setShareCode] = useState();
  const [positionObj, setPositionObj] = useState({});
  const [visible, setVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [signVisible, setSignVisible] = useState(false);
  const token = auth.info.token;
  const platform = process.env.TARO_ENV;
  const getData = async () => {
    try {
      const res = await httpRequest.get(`phoenix-manager-backend/client/noauth/positionOrders/${positionId}`);
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setPositionObj(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  const getShareCode = async () => {
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/member/jobShareCode');
      if(res?.code !== 0){
        throw new Error(res.msg);
      }
      setShareCode(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (form) => {
    try {
      const res = await httpRequest.post(`phoenix-center-backend/client/info/creat`, {
        data: {
          mobile: form.phone.value,
          name: form.name.value,
          smsCode: form.sms.value
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      } else {
        setSignVisible(false);
        getUserInfo().then(() => {
          handleSignUp();
        });
      }
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  };
  const handleSignUp = async() => {
    if(token) {
      if(!auth.realInfo.completeInfo){
        setSignVisible(true);
        return;
      }
      try {
        const res = await httpRequest.post(`phoenix-manager-backend/client/signUp/${positionId}`, {
          data: {
            mobile: auth.realInfo.realMobile,
            name: auth.realInfo.realName,
            platform,
          }
        });
        if (res?.code !== 0) {
          showToast({
            icon: 'none',
            title: res.msg
          })
        } else {
          templateIdQuery()
          setVisible(true)
        }
        
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoginVisible(true);
    }
  };
  const handleCall = () => {
    Taro.makePhoneCall({
      phoneNumber: '15203910705',
    })
  };
  const toMap = () => {
    const {latitude, longitude} = positionObj?.gpsAddress;
    Taro.openLocation({
      latitude,
      longitude,
      name: positionObj?.addressDetail,
      scale: 18
    })
  }
  useShareAppMessage(() => {
    return {
      title: '岗位详情',
      path: `${router.path}?positionId=${positionId}&scene=${scene}`
    }
  });
  useEffect(() => {
    getData();
    if (token) {
      getShareCode();
    }
    
  }, []);
  useDidShow(() => {
    if(token) {
      getUserInfo()
    }
    !isH5 && Taro.getCurrentPages()[0]?.setData({
      isBack: true
    })
  })
  return (
    <View className={styles.position}>
      <SwiperIndex customStyle='height: 216px' list={positionObj?.companyImages} />
      <View className={styles.header}>
        <View className={styles['header-top']}>
          <View className={styles.title}>{positionObj?.jobName}</View>
          <View className={styles.money}>
            <Text className={styles.price}>
              <Text className={styles['price_count']}>{positionObj?.orderPriceStart}{positionObj.orderPriceEnd && `-${positionObj.orderPriceEnd}`}</Text>
              <Text className={styles['price_unit']}>{positionObj?.orderPriceType}</Text>
            </Text>
            {
              positionObj?.subsidyAmount && (
                <Text className={styles.subsidy}>
                  <Text className={styles['subsidy_count']}>+{positionObj?.subsidyAmount}</Text>
                  <Text className={styles['subsidy_unit']}>元/小时补贴</Text>
                </Text> 
              )
            }
            
          </View>
          <View className={styles.tags}>
            {
              positionObj?.tags?.map((item) => (
                <Text className={styles['tags-item']}>{item}</Text>
              ))
            }
          </View>
        </View>
        <View className={styles['header-bottom']}>
          <Text className={styles.name}>{positionObj?.companyName}</Text>
        </View>
      </View>
      <View className={styles.content}>
        <View className={styles.item}>
          <View className={styles['item-header']}>我的收入</View>
        
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>工价</View>
            <View className={styles['item-body-text']}>{positionObj?.orderPriceStart} {positionObj.orderPriceEnd && `-${positionObj.orderPriceEnd}`}{positionObj.orderPriceType}</View>
          </View>
          
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>发薪日</View>
            <View className={styles['item-body-text']}>每月{positionObj?.payday}日</View>
          </View>
          <View className={styles['item-body']}>
            <View className={styles['item-body-label']}>薪资详情</View>
            <View className={styles['item-body-text']}><RichText nodes={positionObj?.treatment} /></View>
          </View>
        </View>
        <View className={styles.item}>
          <View className={styles['item-header']}>岗位描述</View>
            {
              positionObj?.positionDescribe?.map((v) => (
                <View className={styles['item-body']}>
                  <View className={styles['item-body-label']}>{v.name}</View>
                  <View className={styles['item-body-text']}>{v.value}</View>
                </View>
              ))
            }
        </View>
        <View className={styles.item}>
          <View className={styles['item-header']}>招聘要求</View>
          {
              positionObj?.jobRequest?.map((v) => (
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
              <View className={`${styles['item-body-text']} ${styles.location}`} onClick={toMap}><IconFont name='location' color='#80A2FF' />{positionObj?.city}{positionObj?.area}{positionObj?.addressDetail}</View>
            </View>
        </View>
        
      </View>
      <View className={styles.tips}>此岗位由{positionObj?.tenantName}发布  {moment(positionObj?.lastModifiedDate).format(datetimeFormat.date)}</View>
      <View className={styles.bottom}>
        <View className={styles.icon} onClick={() => handleCall()}>
          <View className={styles['icon-item']}>
            <IconFont name='blod-call' size='32px' />
          </View>
          电话咨询
        </View>
        {
          platform !=='h5' ? (
            <View className={styles.icon}>
              <View className={styles['icon-item']}>
                <IconFont name='share' size='32px' />
              </View>
              岗位分享
              {
                token ? (
                  <Button className={styles.share} openType='share' />
                ) : (
                  <Button className={styles.share} onClick={() => setLoginVisible(true)} />
                )
              }
              
            </View>
          ) : null
        }
        
        <MyButton customStyles='width: 175px' onClick={handleSignUp}>立即报名</MyButton>
      </View>
      <Dialog 
        maskClosable
        visible={visible}
        content={
          <View className={styles['dialog-content']}>
            <Image mode='widthFix' src={resultImg.success} className={styles['dialog-img']} />
            <View className={styles['dialog-subtitle']}>恭喜您，报名成功</View>
          </View>
        }
        onClose={() => { 
          setVisible(false);
        }}
      />
      <Dialog 
        maskClosable
        visible={loginVisible}
        content='您还未登录'
        actions={
          [{
            title: '下次再说',
            onClick: () =>{ setLoginVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '去登录',
            onClick: () =>{
              setLoginVisible(false)
              Taro.navigateTo({
                url: '../loginGuide/index'
              })
            },
            type: 'primary',
            size: 'mini'
          }]
        }
      />
      <Dialog 
        maskClosable
        visible={signVisible}
        title='提示'
        content='报名岗位需要先完善您的个人简历'
        actions={
          [{
            title: '取消',
            onClick: () =>{ setSignVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '去完善',
            onClick: () =>{
              setSignVisible(false);
              Taro.navigateTo({
                url: '/packageA/pages/myResume/index'
              })
            },
            type: 'primary',
            size: 'mini'
        }]
        }
      />
    </View>
  );
};
export default observer(Position);