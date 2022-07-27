import { useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import backgroundImg from '@/constants/backgroundImg';
import { httpRequest } from '@/utils';
import styles from "./Invitation.module.scss";

const process = [
  {
    title: '好友注册',
    count: '154',
  },
  {
    title: '好友报名',
    count: '54',
  },
  {
    title: '线下面试',
    count: '14',
  },
  {
    title: '面试通过',
    count: '8',
  },
  {
    title: '成功入职',
    count: '6',
  }
]
const ProcessItem = ({ title, count }) => {
  return (
    <View className={styles['process-item']}>
      <View className={styles['process-title']}>{title}</View>
      <View className={styles['process-count']}>{count}</View>
    </View>
  )
}
const Invitation = () => {
  const getInviteStatistics = async () => {
    try{
      const res = await httpRequest.get('phoenix-center-backend/client/invite/statistics');
      if (res.code ==! 0) {
        throw new Error(res.msg);
      }
      console.log('res',res)
    }catch(err){
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  }
  const handleClick = () => {
    Taro.navigateTo({
      url: '/packageA/pages/savePoster/index'
    })
  }
  useEffect(() => {
    getInviteStatistics();
  },[])
  return  (
    <View className={styles.activity}>
      <Image src={backgroundImg.base} mode='widthFix' style={{width:'100%'}} ></Image>
      <View className={styles.tips}>
        123****1223 刚邀请了1位好友 获得8.88元
      </View>
      <View className={styles.rule}>
        规则说明
      </View>
      <View className={`${styles.block} ${styles['invitation-info']}`}>
        <View className={styles['info-title']} />
          <View className={styles['info-count']}>
            累计邀请人数：54
          </View>
          <View className={styles['info-process']}>
            {
              process.map((item, index) => {
                 return (
                  <ProcessItem key={index} {...item} />
                  )
              })
            }
          </View>
          <View className={styles['reward']}>
            <View className={styles['reward-img']}></View>
              <View className={styles['reward-info']}>累计奖金：47.74元</View>
            </View>
          <View className={styles['button']}></View>
      </View>
      <View className={`${styles.block} ${styles['invitation-activity']}`}>
        <View className={styles['activity-title']} />
        <View className={styles['activity-process']}>
          {
            process.map(() => {
              return (
                <View className={styles['activity-process-item']}>
                  8.88元
                  </View>
                )
            })
          }
        </View>
          <View className={styles['process-bar']} />
          <View className={styles['process-info']}>
            {
              process.map((item) => {
                return (
                  <View className={styles['process-info-item']}>
                    {
                      item.title
                    }
                  </View>
                )
              })
            }
          </View>
        <View className={styles['activity-button']}>
          <View className={styles['activity-button-save']} onClick={handleClick} />
          <View className={styles['activity-button-share']} />
        </View>
      </View>
    </View>
  )
}

export default Invitation;
