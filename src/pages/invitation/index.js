import { useEffect, useState, useRef } from 'react';
import { View, Image, Button, Text } from '@tarojs/components';
import Taro, { useShareAppMessage, showToast, useDidShow, useDidHide, useRouter } from '@tarojs/taro';
import backgroundImg from '@/constants/backgroundImg';
import { inviteCover } from '@/constants'
import numeral from 'numeral';
import auth from '@/stores/auth';
import { httpRequest } from '@/utils';
import styles from "./Invitation.module.scss";

const ProcessItem = ({ title, count }) => {
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
const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}
const money = [8.88, 6.66, 18.88];
const getRandomPhone = () => {
  const phone = ['134', '135', '136', '137', '138', '139', '150', '151', '152', '157', '158', '159', '187', '188', '133', '153', '180', '189'];
  const random = Math.floor(Math.random() * 10000000)
  const result = '' + getRandom(phone) + String(random).padEnd(8, '0');
  return result.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
const Invitation = () => {
  const [interview, setInterView] = useState([])
  const [totalAward, setTotalAward] = useState(0)
  const [count, setCount] = useState(0)
  const [inviteInfo, setInviteInfo] = useState({
    invitePhone: getRandomPhone(),
    inviteAward: getRandom(money),
  })
  const timer = useRef();
  const [inviteEnum, setInviteEnum] = useState([])
  const isH5 = process.env.TARO_ENV === 'h5';
  const router = useRouter();
  const getInviteStatistics = async () => {
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/noauth/invite/statistics');
      if (res.code !== 0) {
        throw new Error(res.msg);
      }
      const result = Object.keys(res.data).map(key => {
        if (key === 'totalAward') {
          setTotalAward(res.data[key])
          return;
        }
        return {
          title: enumType[key],
          count: res.data[key]
        }
      }
      )
      const newResult = result.filter(item => item)
      setCount(() => {
        return res.data.inviteRegisterCount
      })
      setInterView(newResult);
    } catch (err) {
      console.log(err);
    }
  }
  const getInviteEnum = async () => {
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/noauth/invite/inviteNewStageEnum');
      if (res.code !== 0) {
        throw new Error(res.msg);
      }
      setInviteEnum(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleClick = async () => {
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/invite/url/param');
      if (isH5) {
        const url = `https://xgn-h5.fuzfu.net/#/pages/jobList/jobList?scene=${res.data}`;
        Taro.setClipboardData({
          data: url,
          success: () => {
            showToast({
              icon: 'none',
              title: '已经复制到剪贴板'
            })
          }
        })
      } else {
        Taro.navigateTo({
          url: '/packageA/pages/savePoster/index'
        })
      }
    } catch (err) {
      console.log({ err })
    }
  }
  const handleRuleClick = () => {
    Taro.navigateTo({
      url: '/packageA/pages/activityRules/index'
    })
  }
  const handleInviteRecord = () => {
    Taro.navigateTo({
      url: '/packageA/pages/inviteRecord/index'
    })
  }
  useShareAppMessage(async () => {
    if (!auth.info.token) {
      Taro.redirectTo({
        url: '/pages/loginGuide/index'
      })
      return;
    }
    let res = null;
    try {
      res = await httpRequest.get('phoenix-center-backend/client/invite/url/param');
    } catch (err) {
      console.log({ err })
    }
    return {
      title: '你的好友邀请你领取【1288.8元】大礼包活动！',
      path: `/packageA/pages/invitePoster/index?scene=${res?.data}`,
      imageUrl: inviteCover.clickCover,
    }
  }
  )
  useDidShow(() => {
    getInviteStatistics();
    getInviteEnum();
    timer.current = setInterval(() => {
      setInviteInfo({
        invitePhone: getRandomPhone(),
        inviteAward: getRandom(money),
      })
    }, 5000)
  })
  useDidHide(() => {
    clearInterval(timer.current);
  })
  return (
    <View className={styles.container} style={{ backgroundImage: `url(${backgroundImg.base})` }}>
      <View className={styles.tipsContainer}>
        <View className={`${styles.tips} ${styles.marquee}`}>
          <View className={`${styles.swiper}`}>
            {`${inviteInfo.invitePhone} 刚邀请了1位好友 获得${inviteInfo.inviteAward}元`}
          </View>
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
            interview?.map((item, index) => <ProcessItem key={index} {...item} />)
          }
        </View>
        <View className={styles['reward']}>累计奖金：{numeral(totalAward).format('0,0.00')}元</View>
        <View className={styles['button']} onClick={handleInviteRecord}></View>
      </View>
      <View className={`${styles.block} ${styles.activity}`}>
        <View className='title' />
        <View className='red-packets'>
          {
            inviteEnum?.map((p, index) => {
              return (
                <View className='red-packet-item'>
                  <View className='red-packet'>{p.award + '元'}</View>
                  <View className={`red-packet-separator ${index === 0 ? 'first' : null} ${index === inviteEnum.length ? 'last' : null}`}></View>
                  <View className='red-packet-title'>{p.desc}</View>
                </View>
              )
            })
          }
        </View>
        <View className={isH5 ? styles['activity-button-h5'] : styles['activity-button']}>
          {isH5 ? <View className={styles['activity-button-saveH5']} onClick={handleClick}><Text>复制到剪切板</Text></View> :
            (
              <>
                <View className={styles['activity-button-save']} onClick={handleClick}><Text>保存海报</Text></View>
                <Button openType='share' className={styles['activity-button-share']} ><Text></Text></Button>
              </>
            )}
        </View>
      </View>
    </View>
  )
}

export default Invitation;
