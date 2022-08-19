import { useState } from 'react';
import Taro,{ useDidShow,showToast } from '@tarojs/taro';
import { View,Text,Image} from '@tarojs/components';
import { InfiniteScroll,Result, Dialog } from '@/components';
import { httpRequest } from '@/utils';
import numeral from 'numeral';
import backgroundImg from '@/constants/backgroundImg'
import { resultImg } from '@/constants';
import auth from '@/stores/auth';
import { giftImg, GiftStyles, GiftStatus, register, entry,rewardBg,rewardBgTips} from './constants';
import  Progress from './components/progress'
import ListItem  from './components/listItem';
import RewardModal from './components/rewardModal'
import styles from "./GiftBag.module.scss";

const icon = {
  src:resultImg.empty,
  width: 120,
  height: 120,
}
const ProcessItem = ({ award, status,index,stage,getDetail}) => {
  const [visible, setVisible] = useState(false);
  const handleClick = async (step,state) => {
    let res = null;
    if(state === 'FINISHED' || state === 'UNDONE'){
      return ;
    }
    setVisible(true)
    try{
      if(register[step]){
        res = await httpRequest.put(`phoenix-center-backend/client/register/receiveMoreAward/${step}`);
      }else{
        res = await httpRequest.put(`phoenix-center-backend/client/register/${step === 'ENTRY_SUCCESS' ? 'receiveEntrySuccessAward' : 'receiveRegisterAward'}/${step}`);
      }
      if (res.code ==! 0) {
        throw new Error(res.msg);
      }
      getDetail();
    } catch(err) {
      showToast({
        title: `${err.message}`,
        icon: 'none',
      })
    }
  }
  const handleClose = () => {
    setVisible(false);
  }
  return (
    <>
    <View className={styles['reward-item']} style={{background:`url(${index === 0 && stage !== 'FIRST_ENTRY_CLOCK_IN_7_DAYS' ? giftImg['GIFT'] : giftImg[status]})`,backgroundSize:'cover'}} onClick={() => {handleClick(stage,status)}}>
      <View className={`${styles['reward-tips']} ${GiftStyles[status]}`}>{GiftStatus[status]}</View>
      <View className={styles['reward-count']}>{award}</View>
    </View>
    <RewardModal
      maskClosable
      visible={visible}
      award={award}
      imageUrl={(register[stage] || stage === 'ENTRY_SUCCESS') ? rewardBg : rewardBgTips}
      onClose={handleClose}
    />
    </>
  )
}
const Invitation = () => {
  const [fetchAward, setFetchAward] = useState(0);
  const [registerAwardStages, setRegisterAwardStages] = useState([]);
  const [entryAwardStages, setEntryAwardStages] = useState([]);
  const [registerWithdraw, setRegisterWithdraw] = useState(false);
  const [registerProgress, setRegisterProgress] = useState(0);
  const [entryProgress, setEntryProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [resumeVisible, setResumeVisible] = useState(false);
  const platform = process.env.TARO_ENV;
  const token = auth.info.token;
  const handleSubmit = async(data) => {
    try {
      const res = await httpRequest.post(`phoenix-manager-backend/client/signUp/${data.id}`, {
        data: {
          mobile: auth.realInfo.realMobile,
          name: auth.realInfo.realName,
          platform,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setSignUpSuccess(true);
      httpRequest.put('phoenix-center-backend/client/register/signedUpAward');
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  }
  const handleCurrentState = (state,data = {}) => {
    switch (state.step) {
      case 'init':
        setLoginVisible(false);
        setResumeVisible(false);
        setSignUpSuccess(false);
        break;
      case 'login':
        Taro.navigateTo({
          url: `/pages/loginGuide/index`
        });
        break;
      case 'signUp':
        if(token){
          if(!auth.realInfo.completeInfo){
            setResumeVisible(true);
          }else{
            handleSubmit(data);
          }
        }else{
          setLoginVisible(true);
        }
        break;
      case 'detail':
        Taro.navigateTo({
          url: `/pages/position/index?positionId=${data?.id}`,
        })
        break;
      case 'resume':
        Taro.navigateTo({
          url: `/packageA/pages/myResume/index`,
        })
      break;
    }
  }
  const getRegisterDetail = async () => {
    try{
      const res = await httpRequest.get('phoenix-center-backend/client/register/award/detail');
      if (res.code !== 0) {
        throw new Error(res.msg);
      }
      const result = entry[res.data?.currentStage];
      setCurrentStage(res.data?.currentStage);
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
      console.log({err})
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
    if(register[value] || value === 'ENTRY_SUCCESS'){
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
            entryAwardStages.map((item,index) =>  <ProcessItem {...item} index={index} getDetail={getRegisterDetail}></ProcessItem> )
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
                  item.status === 'FINISHED' && currentStage === item.stage ? 
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
              return <ListItem  data={item}  handleCurrentState={handleCurrentState} />
            }}
          >
          </InfiniteScroll>
          <Dialog 
            maskClosable
            visible={signUpSuccess}
            content={
              <View className={styles['dialog-content']}>
                <Image mode='widthFix' src={resultImg.success} className={styles['dialog-img']} />
                <View className={styles['dialog-subtitle']}>恭喜您，报名成功</View>
              </View>
            }
            onClose={() => { 
              handleCurrentState({step:'init'});
            }}
          />
          <Dialog 
            maskClosable
            visible={loginVisible}
            content='您还未登录'
            onClose={()=>setLoginVisible(false)}
            actions={
              [{
                title: '下次再说',
                onClick: () =>{ handleCurrentState({step:'init'}); },
                type: 'default',
                size: 'mini'
              }, {
                title: '去登录',
                onClick: () =>{
                  handleCurrentState({step:'login'});
                },
                type: 'primary',
                size: 'mini'
              }]
            }
          />
          <Dialog 
            maskClosable
            visible={resumeVisible}
            title='提示'
            content='报名岗位需要先完善您的个人简历'
            actions={
              [{
                title: '取消',
                onClick: () =>{ handleCurrentState({step:'init'}); },
                type: 'default',
                size: 'mini'
              }, {
                title: '去完善',
                onClick: () =>{
                  handleCurrentState({step:'resume'});
                },
                type: 'primary',
                size: 'mini'
            }]
            }
          />
        </View>
      </View>
    </View>
  )
}
export default Invitation;
