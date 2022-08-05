import { View, Image, Text } from "@tarojs/components";
import { useEffect, useState } from 'react';
import { httpRequest } from '@/utils';
import { InfiniteScroll, Result, Button } from '@/components';
import { resultImg, datetimeFormat } from '@/constants';
import moment from 'moment';
import styles from "./Items.module.scss";
import interview from '../../images/arrive_interview.png';
import success from '../../images/entry_success.png';
import signup from '../../images/first_signup.png';
import pass from '../../images/interview_pass.png';
import register from '../../images/register_success.png';


const invitationType = [
  {
    disableClassName: 'registry-status-disable',
    type: 'REGISTER_SUCCESS',
    className: 'registry-status',
    img: register,
    value: '好友已注册',
  },
  {
    disableClassName: 'signUp-status-disable',
    type: 'FIRST_SIGNUP',
    className: 'signUp-status',
    img: signup,
    value: '好友已报名',
  },
  {
    disableClassName: 'interview-status-disable',
    type: 'ARRIVE_INTERVIEW',
    className: 'interview-status',
    img: interview,
    value: '好友已面试',
  },
  {
    disableClassName: 'pass-status-disable',
    type: 'INTERVIEW_PASS',
    className: 'pass-status',
    img: pass,
    value: '好友已通过面试',
  },
  {
    disableClassName: 'success-status-disable',
    type: 'ENTRY_SUCCESS',
    className: 'success-status',
    img: success,
    value: '好友已成功入职',
  },
]

const status = [
  {
    key: 'PENDING',
    value: '待领取',
    disable: false,
  },
  {
    key: 'RECEIVED',
    value: '已领取',
    disable: true,
  },
]

const Items = ({ type }) => {
  const icon = {
    src: resultImg.empty,
  }
  const [key, setKey] = useState('');
  const handleClick = async (id) => {
    const res = await httpRequest.put(`phoenix-center-backend/client/invite/receiveAward/${id}`, {
      data: {
        id
      }
    });
    if (res?.code !== 0) {
      throw new Error(res?.msg);
    }
    setKey(new Date().getTime());
  }
  const getData = async (search) => {
    const res = await httpRequest.post('phoenix-center-backend/client/invite/list', {
      data: {
        ...search,
        stage: type
      }
    })
    if (res?.code !== 0) {
      throw new Error(res?.msg);
    }
    console.log('items', res)
    return res.data
  }
  useEffect(() => {
    setKey(new Date().getTime())
  }, [type]);
  return (
    <InfiniteScroll
      key={key}
      getData={getData}
      noDataComponent={
        <Result
          icon={icon}
          subTitle='暂无更多数据'
        />
      }
      renderItem={(item) => {
        return item?.disable ? (<View className={styles['content-item-disable']}>
          <View className={styles['image-disable']}>
          </View>
          <View className={styles['registry-message']}>
            <View className={styles['phone-number-disable']}>{item.mobile.substring(0, 3)}****{item.mobile.substring(7)}</View>
            <View style={{ display: "flex" }}>
              {
                (() => {
                  const listItem = invitationType.find((f) => {
                    return f.type === item.stage
                  })
                  return <View className={styles[`${listItem.disableClassName}`]}><Image src={listItem.img} className={styles.logoImage} />{listItem.value}</View>
                })()
              }
            </View>
          </View>
          <View className={styles['reward-disable']}>
            <View className={styles['time-disable']}><Text className={styles['timeText-disable']}>注册时间：{item.registerTime && moment(item.registerTime).format(datetimeFormat.date)}</Text></View>
            <View className={styles.rewardOffset} >累计奖励：{item.award}元</View>
            {
              (() => {
                const buttonItem = status.find(f => {
                  return item.receiveStatus === f.key
                })
                return buttonItem && <Button customStyles={{ width: '75px', height: '27px', border: 'none', fontSize: '14px', lineHeight: '27px', background: 'linear-gradient(6deg, #B6B6B6, #C3C3C3)', marginTop: '8px', marginRight: '12px', marginLeft: 'auto' }} disabled='true' onClick={() => { null }}>{buttonItem.value}</Button>
              })()
            }
          </View>
        </View>) :
          (<View className={styles['content-item']}>
            <View className={styles.image}>
            </View>
            <View className={styles['registry-message']}>
              <View className={styles['phone-number']}>{item.mobile.substring(0, 3)}****{item.mobile.substring(7)}</View>
              <View style={{ display: "flex" }}>
                {
                  (() => {
                    const listItem = invitationType.find((f) => {
                      return f.type === item.stage
                    })
                    return <View className={styles[`${listItem.className}`]}><Image src={listItem.img} className={styles.logoImage} />{listItem.value}</View>
                  })()
                }
              </View>
            </View>
            <View className={styles.reward}>
              <View className={styles.time}><Text className={styles.timeText}>注册时间：{item.registerTime && moment(item.registerTime).format(datetimeFormat.date)}</Text></View>
              <View className={styles.rewardOffset} >累计奖励：{item.award}元</View>
              {
                (() => {
                  const buttonItem = status.find(f => {
                    return item.receiveStatus === f.key
                  })
                  return buttonItem && <Button customStyles={{ width: '75px', height: '27px', border: 'none', fontSize: '14px', lineHeight: '27px', background: 'linear-gradient(6deg, #E41A2D, #FF7D43)', marginTop: '8px', marginRight: '12px', marginLeft: 'auto' }} disabled={buttonItem.disable} onClick={() => { handleClick(item.id) }}>{buttonItem.value}</Button>
                })()
              }
            </View>
          </View>)
      }
      }
    >
    </InfiniteScroll>
  )
}
export default Items;