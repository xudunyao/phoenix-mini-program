import { useState } from 'react';
import Taro,{ useDidShow,showToast } from '@tarojs/taro';
import { View,Text} from '@tarojs/components';
import { InfiniteScroll,Result} from '@/components';
import { httpRequest } from '@/utils';
import numeral from 'numeral';
import backgroundImg from '@/constants/backgroundImg'
import { resultImg } from '@/constants';
import  Progress from './components/progress'
import ListItem  from './components/listItem';
import styles from "./GiftBag.module.scss";

const giftImg = {
  "GIFT":'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/gift.png',
  "UNDONE": 'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/undone.png',
  "PENDING": 'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/pending.png',
  "FINISHED": 'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/finished.png',
}
const GiftStyles = Object.freeze({
  "UNDONE":"undone",
  "PENDING":"pending",
  "FINISHED":"finished",
})
const GiftStatus = Object.freeze({
  "UNDONE":"未完成",
  "PENDING":"待领取",
  "FINISHED":"已完成",
})
const register  = Object.freeze(
  {
    "FIRST_ENTRY_CLOCK_IN_7_DAYS":25,
    "FIRST_ENTRY_CLOCK_IN_30_DAYS":50,
    "SECOND_ENTRY_CLOCK_IN_30_DAYS":75,
    "THIRD_ENTRY_CLOCK_IN_30_DAYS":100,
  }
)
const entry  = Object.freeze(
  {
    "REGISTER_SUCCESS":20,
    "FIRST_SIGNUP":40,
    "ARRIVE_INTERVIEW":60,
    "INTERVIEW_PASS":80,
    "ENTRY_SUCCESS":100,
  }
)
const icon = {
  src:resultImg.empty,
  width: 120,
  height: 120,
}
const ProcessItem = ({ award, status,index,stage,getDetail}) => {
  const handleClick = async (step,state) => {
    if(s === 'FINISHED' || state === 'UNDONE'){
      showToast({
        title: `${state === 'UNDONE' ? '还未达到红包领取条件，请努力完成哦！' : '红包已领取，请继续完成哦'}`,
        icon: 'none',
      })
      return ;
    }
    try{
      const fetchKey = register[step] ? 'receiveMoreAward' : 'receiveEntrySuccessAward';
      const res = await httpRequest.put(`phoenix-center-backend/client/register/${step === 'ENTRY_SUCCESS' ? fetchKey : 'receiveRegisterAward'}/${step}`);
      if (res.code ==! 0) {
        throw new Error(res.msg);
      }
      showToast({
        title: '领取成功',
        icon: 'none',
      })
      getDetail();
    } catch(err) {
      showToast({
        title: `${err.message}`,
        icon: 'none',
      })
    }
  }
  return (
    <View className={styles['reward-item']} style={{background:`url(${index === 0 && stage !== 'FIRST_ENTRY_CLOCK_IN_7_DAYS' ? giftImg['GIFT'] : giftImg[status]})`,backgroundSize:'cover'}} onClick={() => {handleClick(stage,status)}}>
      <View className={`${styles['reward-tips']} ${GiftStyles[status]}`}>{GiftStatus[status]}</View>
      <View className={styles['reward-count']}>{award}</View>
    </View>
  )
}
const Invitation = () => {
  const [fetchAward, setFetchAward] = useState(0);
  const [registerAwardStages, setRegisterAwardStages] = useState([]);
  const [entryAwardStages, setEntryAwardStages] = useState([]);
  const [registerWithdraw, setRegisterWithdraw] = useState(false);
  const [registerProgress, setRegisterProgress] = useState(0);
  const [entryProgress, setEntryProgress] = useState(0);
  const getRegisterDetail = async () => {
    try{
      const res = await httpRequest.get('phoenix-center-backend/client/register/award/detail');
      if (res.code !== 0) {
        throw new Error(res.msg);
      }
      const result = entry[res.data?.currentStage];
      if(result){
        setRegisterProgress(result);
        setEntryProgress(0);
      }else{
        const pro = register[res.data?.currentStage];
        if(pro){
          setEntryProgress(pro);
          setRegisterProgress(100);
        }else{
          setRegisterProgress(0);
        }
      }
      setFetchAward(res.data?.fetchAward);
      setRegisterAwardStages(res.data?.registerAwardStages);
      setEntryAwardStages(res.data?.entryAwardStages);
      setRegisterWithdraw(res.data?.registerWithdraw);
    } catch(err) {
      showToast({
        title: `${err.message}`,
        icon: 'none',
      })
    }
  }
  const getButtonText = (stage,status) => {
    if(status === 'UNDONE' && stage === 'FIRST_SIGNUP'){
      return '去报名'
    }
    if(stage === 'ENTRY_SUCCESS' && status === 'FINISHED'){
      return '去提现'
    }
    return false;
  }
  const getData = async (search) => {
    try {
      const res = await httpRequest.post('phoenix-manager-backend/client/noauth/positionOrders/inquiry',{
        data: {
          ...search,
          searchEnum:'ALL',
          registerAward: true
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  const handleRegister =  (value) => {
    if(value === 'FIRST_SIGNUP'){
      Taro.switchTab({
        url: '/pages/jobList/jobList',
      })
    }
    if(value === 'ENTRY_SUCCESS' || value === 'THIRD_ENTRY_CLOCK_IN_30_DAYS'){
      Taro.navigateTo({
        url: '/packageA/pages/wallet/index',
      })
    }
  }
  const handleRule = () => {
    Taro.navigateTo({
      url: '../userGift/index'
    })
  }
  useDidShow(() => {
    getRegisterDetail();
  })
  return  (
    <View className={styles.container} style={{backgroundImage:`url(${backgroundImg.baseImg})`}}>
      <View className={styles.rule} onClick={handleRule}>规则说明</View>
      <View className={styles.reward}>
        <View className='title'>累计奖金</View>
        <View className='money' >{numeral(fetchAward).format('0,0.00')}<Text className='unit'>元</Text></View>
      </View>
      <View className={styles.induction}>
        <View className={`title ${styles['award-title']}`} />
        <View className='desc'>
          <Text className='modify' />所有岗位<Text className='modify' style='transform:rotate(180deg)' />
        </View>
        <View className={styles['reward-item-wrapper']}>
          {
            registerAwardStages.map((item,index) =>  <ProcessItem {...item} index={index} getDetail={getRegisterDetail}></ProcessItem> )
          }
        </View>
        <Progress size={5} percentage={registerProgress} />
        <View className={styles['induction-award-font']}>
          {
            registerAwardStages.map((item)=>{
              return (
              <View key={item}>
                <View className={styles['award-font-text']}>{item?.desc}</View>
                {
                  getButtonText(item?.stage,item?.status) ?<View className={styles['award-register-btn']} onClick={()=>handleRegister(item?.stage)}>{
                    getButtonText(item?.stage,item?.status)
                  }</View>:null
                }
              </View>
              )
            })
          }
        </View>
      </View>
      <View className={styles.induction}>
        <View className={`title ${styles['more-award']}`} />
        <View className='desc'>
          <Text className='modify' />特定岗位<Text className='modify' style='transform:rotate(180deg)' />
        </View>
        <View className={styles['reward-item-wrapper']}>
          {
            entryAwardStages.map((item,index) =>  <ProcessItem {...item} index={index}></ProcessItem> )
          }
        </View>
        <Progress size={4} percentage={entryProgress} />
        <View className={styles['induction-award-font']}>
          {
            entryAwardStages.map((item)=>{
              return (
              <View key={item}>
                <View className={styles['award-font-text']}>
                  <View>{item.desc.substring(0,4)}</View>
                  <Text>{item.desc.substring(4)}</Text>
                </View>
                {
                  item.stage === 'THIRD_ENTRY_CLOCK_IN_30_DAYS' ? 
                  (<View className={styles['award-register-btn']} onClick={()=>handleRegister(item?.stage)}>去提现</View>): null
                }
              </View>
              )
            })
          }
        </View>
      </View>
      <View className={`${styles.induction}`}>
        <View className={`title ${styles['sing-up-title']}`} />
        <View className={`${styles.infiniteScroll}`}>
          <InfiniteScroll
            getData={getData}
            pageSize={5}
            noDataComponent={
              <Result
                icon={icon}
                subTitle='暂无更多数据' 
              />
            }
            renderItem={(item) => {
              return <ListItem  data={item} />
            }}
          >
          </InfiniteScroll>
        </View>
      </View>
    </View>
  )
}

export default Invitation;
