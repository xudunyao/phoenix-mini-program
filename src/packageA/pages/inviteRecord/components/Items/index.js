import { View, Image } from "@tarojs/components";
import { useEffect, useState } from 'react';
import { httpRequest } from '@/utils';
import { InfiniteScroll, Result, Button } from '@/components';
import { resultImg } from '@/constants';
import styles from "./Items.module.scss";
import interview from '../../images/arrive_interview.png';
import success from '../../images/entry_success.png';
import signup from '../../images/first_signup.png';
import pass from '../../images/interview_pass.png';
import register from '../../images/register_success.png';

const invitationType = {
  'REGISTER_SUCCESS': (<View className={styles['registry-status']}><Image src={register} className={styles.logoImage} />好友已注册</View>),
  'FIRST_SIGNUP': (<View className={styles['signUp-status']}><Image src={signup} className={styles.logoImage} />好友已报名</View>),
  'ARRIVE_INTERVIEW': (<View className={styles['interview-status']}><Image src={interview} className={styles.logoImage} />好友已面试</View>),
  'INTERVIEW_PASS': (<View className={styles['pass-status']}><Image src={pass} className={styles.logoImage} />好友已通过面试</View>),
  'ENTRY_SUCCESS': (<View className={styles['success-status']}><Image src={success} className={styles.logoImage} />好友已成功入职</View>),
}

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
      renderItem={(item) => (
        <View className={styles['content-item']}>
          <View className={styles.image}>
          </View>
          <View className={styles['registry-message']}>
            <View className={styles['phone-number']}>{item.mobile.substring(0, 3)}****{item.mobile.substring(7)}</View>
            <View style={{ display: "flex" }}>
              {invitationType[item.stage]}
            </View>
          </View>
          <View className={styles.reward}>
            <View className={styles.rewardOffset} >累计奖励：{item.award}元</View>
            {
              item.receiveStatus === 'PENDING' ?
                (
                  <Button customStyles={{ width: '75px', height: '27px', border: 'none', fontSize: '14px', lineHeight: '27px', background: 'linear-gradient(6deg, #E41A2D, #FF7D43)', marginTop: '8px', marginRight: '12px' }} onClick={() => { handleClick(item.id) }}>待领取</Button>
                )
                : item.receiveStatus === 'RECEIVED' ?
                  <Button customStyles={{ width: '75px', height: '27px', border: 'none', fontSize: '14px', lineHeight: '27px', background: 'linear-gradient(6deg, #E41A2D, #FF7D43)', marginTop: '8px', marginRight: '12px' }} disabled='true' onClick={() => { handleClick(item.id) }}>已领取</Button>
                  : ''
            }
          </View>
        </View>
      )}
    >
    </InfiniteScroll>
  )
}
export default Items;