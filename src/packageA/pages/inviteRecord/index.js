import { useState,  useEffect } from 'react';
import Taro from "@tarojs/taro";
import backgroundImg from '@/constants/backgroundImg';
import { View, Text,  Picker } from "@tarojs/components";
import { httpRequest } from '@/utils';
import styles from "./inviteRecord.module.scss";
import Items from "./components/Items"

const detailedInformationList = [
  {
    title: '好友注册',
    value: 20,
  },
  {
    title: '好友报名',
    value: 10,
  },
  {
    title: '线下面试',
    value: 22,
  },
  {
    title: '面试通过',
    value: 28,
  },
  {
    title: '成功入职',
    value: 10,
  }
]
const selectorData = ['已注册', '已报名', '已面试','面试通过','成功入职']

const typeEnum = {
  '已注册': 'REGISTER_SUCCESS',
  '已报名': 'FIRST_SIGNUP',
  '已面试': 'ARRIVE_INTERVIEW',
  '面试通过': 'INTERVIEW_PASS',
  '成功入职': 'ENTRY_SUCCESS',
}

const InviteRecord = () => {
  const [type,setType] = useState('');
  const [people,setPeople] = useState();
  const [totalAward,setTotalAward] = useState()
  const handleFiltrate = (e) => {
    console.log(typeEnum[selectorData[e.detail.value]]);
    setType(typeEnum[selectorData[e.detail.value]])
  }
  const getPeople =async () =>{
    const res = await httpRequest.get('phoenix-center-backend/client/invite/statistics')
    if(res?.code !== 0){
      throw new Error(res?.msg);
    }
    setPeople(res.data.inviteRegisterCount)
    setTotalAward(res.data.totalAward)
  }
  const handleClick = () =>{
    Taro.navigateTo({
      url: `/packageA/pages/wallet/index`,
    });
  }
  useEffect(()=>{
    getPeople()
  },[])

  return (
    <View className={styles.content} style={{backgroundImage:  `url(${backgroundImg.inviteRecordBackground})`}}>
      <View className={styles.header}></View>
      <View className={styles.body}>
        <View className={styles.filtrate}>
          <Picker mode='selector' range={selectorData} onChange={(e)=>handleFiltrate(e)} style={{height: '21px'}}>
            <Text className={styles.filtrateText}>筛选</Text>
          </Picker>
        </View>
        <View className={styles.promptMessage}>
          <Text className={styles.promptMessageData}>已邀请人数：{people}</Text>
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
        <View style={{height: "240px"}}><Items type={type}></Items></View>
      </View>
    </View>
  )
};
export default InviteRecord;

