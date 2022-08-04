import { useState } from 'react';
import Taro, { useDidShow } from "@tarojs/taro";
import backgroundImg from '@/constants/backgroundImg';
import { View, Text, Picker } from "@tarojs/components";
import { httpRequest } from '@/utils';
import styles from "./inviteRecord.module.scss";
import Items from "./components/Items"

const inviteStatus = [
  {
    label: '已注册',
    value: 'REGISTER_SUCCESS'
  },
  {
    label: '已报名',
    value: 'FIRST_SIGNUP'
  },
  {
    label: '已面试',
    value: 'ARRIVE_INTERVIEW'
  },
  {
    label: '面试通过',
    value: 'INTERVIEW_PASS'
  },
  {
    label: '成功入职',
    value: 'ENTRY_SUCCESS'
  }
]

const InviteRecord = () => {
  const [detailedInformationList, setDetailedInformationList] = useState(
    [
      {
        key: 'inviteRegisterCount',
        title: '好友注册',
        value: 0,
      },
      {
        key: 'signedUpCount',
        title: '好友报名',
        value: 0,
      },
      {
        key: 'interviewCount',
        title: '线下面试',
        value: 0,
      },
      {
        key: 'interviewPassCount',
        title: '面试通过',
        value: 0,
      },
      {
        key: 'entrySuccessCount',
        title: '成功入职',
        value: 0,
      }
    ])
  const [type, setType] = useState('');
  const [inviteCount, setInviteCount] = useState(0);
  const [totalAward, setTotalAward] = useState(0)
  const handleFiltrate = (e) => {
    setType(inviteStatus[e.detail.value].value)
  }
  const getInformation = async () => {
    const res = await httpRequest.get('phoenix-center-backend/client/noauth/invite/statistics')
    if (res?.code !== 0) {
      throw new Error(res?.msg);
    }
    setDetailedInformationList(
      (val) => {
        return val.map((o) => {
          return { ...o, value: res.data[o.key] }
        })
      }
    )
    setInviteCount(res.data.inviteRegisterCount)
    setTotalAward(res.data.totalAward)
  }
  const handleClick = () => {
    Taro.navigateTo({
      url: `/packageA/pages/wallet/index`,
    });
  }
  useDidShow(() => {
    getInformation()
  })

  return (
    <View className={styles.content} style={{ backgroundImage: `url(${backgroundImg.inviteRecordBackground})` }}>
      <View className={styles.header}></View>
      <View className={styles.body}>
        <View className={styles.filtrate}>
          <Picker mode='selector' range={inviteStatus.map(f => f.label)} onChange={(e) => handleFiltrate(e)} style={{ height: '21px' }}>
            <Text className={styles.filtrateText}>筛选</Text>
          </Picker>
        </View>
        <View className={styles.promptMessage}>
          <Text className={styles.promptMessageData}>已邀请人数：{inviteCount}</Text>
          <Text className={styles.promptMessageData}>累计奖金：{totalAward}元</Text>
        </View>
        <View className={styles['record-detailed']}>
          {
            detailedInformationList.map((item) => (
              <View key={item.title} className={styles['record-detailed-box']}>
                <View className={styles['record-detailed-title']}>{item.title}</View>
                <View className={styles['record-detailed-value']}>{item.value}</View>
              </View>
            ))
          }
        </View>
        <View className={styles.withdrawCash} onClick={handleClick} >去提现</View>
        <View style={{ height: "240px" }}><Items type={type}></Items></View>
      </View>
    </View>
  )
};
export default InviteRecord;

