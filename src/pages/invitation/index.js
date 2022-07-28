import { useEffect,useState } from 'react';
import { View, Image,Button, Text } from '@tarojs/components';
import Taro,{ useShareAppMessage } from '@tarojs/taro';
import backgroundImg from '@/constants/backgroundImg';
import { httpRequest } from '@/utils';
import styles from "./Invitation.module.scss";

const ProcessItem = ({title,count}) => {
  return (
    <View className='statistics-item'>
      <View className={styles['process-title']}>{title}</View>
      <View className={styles['process-count']}>{count}</View>
    </View>
  )
}
const enumType = Object.freeze({
  entrySuccessCount: '成功入职',
  interviewCount: '面试人数',
  interviewPassCount: '面试通过',
  inviteRegisterCount: '好友注冊',
  signedUpCount: '好友报名',
});
const Invitation = () => {
  const [interview,setInterView] = useState([])
  const [totalAward,setTotalAward] = useState(0)
  const [count,setCount] = useState(0)
  const [inviteEnum,setInviteEnum] = useState([])
  const [urlParams,setUrlParams] = useState()
  const getInviteStatistics = async () => {
    try{
      const res = await httpRequest.get('phoenix-center-backend/client/invite/statistics');
      if (res.code ==! 0) {
        throw new Error(res.msg);
      }
      const result = Object.keys(res.data).map(key => {
        if(key === 'totalAward') {
          setTotalAward(res.data[key])
          return ;
        }
        return {
          title: enumType[key],
          count: res.data[key]
        }
      }
      )
      const newResult = result.filter(item => item)
      const totalAll = newResult.reduce((value,item) => {
        return value + item.count
      }
      ,0)
      setCount(totalAll)
      setInterView(newResult);
    } catch(err) {
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  }
  const getInviteEnum = async () => {
  try{
    const res = await httpRequest.get('phoenix-center-backend/client/invite/inviteNewStageEnum');
    if (res.code ==! 0) {
      throw new Error(res.msg);
    }
    setInviteEnum(res.data);
  } catch(err) {
    showToast({
      icon: 'none',
      title: `${err.message}`
    })
  }
  }
  const getInviteLink = async () => {
    try{
      const res = await httpRequest.get('phoenix-center-backend/client/invite/url/param');
      if (res.code ==! 0) {
        throw new Error(res.msg);
      }
      setUrlParams(res.data);
    } catch(err) {
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
  const handleRuleClick = () => {
    Taro.navigateTo({
      url: '/packageA/pages/activityRules/index'
    })
  }
  const handleInviteRecord =  () => {
   //TODO
  }
  useShareAppMessage(() => {
    return {
      title: '邀请好友',
      path: `/pages/jobList/jobList/?scene=${urlParams}`,
    }
  }
  )
  useEffect(() => {
    getInviteStatistics();
    getInviteEnum();
    getInviteLink();
  },[])
  return  (
    <View className={styles.container} style={{backgroundImage: `url(${backgroundImg.base})`}}>
      <View className={styles.tipsContainer}>   
        <View className={styles.tips}>
          123****1223 刚邀请了1位好友 获得8.88元
        </View>
      </View> 
      <View className={styles.rule} onClick={handleRuleClick}>
        规则说明
      </View>
      <View className={`${styles.block} ${styles.invitation}`}>
        <View className='title' />
          <View className={styles['info-count']}>
            累计邀请人数：{count}
          </View>
          <View className='statistics'>
            {
              interview.map((item, index) => <ProcessItem key={index} {...item} />)
            }
          </View>
          <View className={styles['reward']}>
            <View className={styles['reward-img']}></View>
              <View className={styles['reward-info']}>累计奖金：{totalAward}元</View>
            </View>
          <View className={styles['button']} onClick={handleInviteRecord}></View>
      </View>
      <View className={`${styles.block} ${styles.activity}`}>
        <View className='title' />
        <View className='red-packets'>
          {
            inviteEnum.map((p,index) => {
              return (
                <View className='red-packet-item'>
                  <View className='red-packet'>{p.award + '元'}</View>
                  <View className={`red-packet-separator ${index === 0 ? 'first' :null} ${index === inviteEnum.length ? 'last' :null}`}></View>
                  <View className='red-packet-title'>{p.desc}</View>
                </View>
              )
            })
          }
        </View>
        <View className={styles['activity-button']}>
          <View className={styles['activity-button-save']} onClick={handleClick} />
          <Button  openType='share' className={styles['activity-button-share']}></Button>
        </View>
      </View>
    </View>
  )
}

export default Invitation;
