import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Taro, { showToast, useDidShow } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { Result } from '@/components';
import { httpRequest } from '@/utils';
import auth from '@/stores/auth';
import { message, datetimeFormat, resultImg } from '@/constants';
import styles from './Message.module.scss';
import jobImg from './images/icon_message_work.png';
import systemImg from './images/icon_message_system.png';
import accountImg from './images/icon_message_account.png';

const typeList = {
  JOB_MESSAGE: jobImg,
  SYSTEM_MESSAGE: systemImg,
  ACCOUNT_MESSAGE: accountImg,
};
const Message = () =>{
  const [list, setList] = useState([]);
  const icon = {
    src:resultImg.empty,
  }
  const getData = async() => {
    try{
      const res = await httpRequest.get('phoenix-center-backend/client/message/overview');
      if(res.code === 0) {
        setList(res.data.messageVOS)
        if(res.data.unReadCount !== 0){
          Taro.setTabBarBadge({
            index: 1,
            text: (res.data.unReadCount).toString()
          })
        } else {
          Taro.removeTabBarBadge()
        }
      } else {
        showToast({
          icon: 'none',
          title: res.msg
        })
      }
    } catch (err) {
      console.log(err);
    }
  };
  const toPage =async (type) => {
    Taro.navigateTo({
      url:`../${message.page[type]}/index`,
    })
  };
  const toLogin = () => {
    Taro.navigateTo({
      url:`../loginGuide/index`,
    })
  }
  useDidShow(() => {
    console.log(auth.info.token)
    if(auth.info.token) {
      getData();
    }

  });

  return(
    <View className={styles.content}>
      {
       list.length > 0 ? list?.map((v) => (
          <View className={styles.item} onClick={()=>toPage(v?.messageType)}>
            <View className={styles['item-left']}>
              <Image className={styles.img} src={typeList[v?.messageType]} mode='widthFix' />
              {
                v?.unReadCount ? (<Text className={styles.badge}>{v?.unReadCount}</Text>) : null
              }
              
            </View>
            <View className={styles['item-right']}>
              <View className={styles.type}>{message.type[v?.messageType]}<Text className={styles.time}>{v?.sendTime ? moment(v?.sendTime).format(datetimeFormat.dateHourMin) : null}</Text></View>
              <View className={styles.message}>{v?.messageContent ?? '暂无通知'}</View>
            </View>
          </View>
        )) :(
          <Result
            customStyles='position: absolute;top:50%;left:50%;transform:translate(-50%,-50%);' 
            icon={icon} subTitle='未登录无法查看消息'
            extra='去登录'
            onClick={toLogin}
          />
        ) 
      }
      
    </View>
  );
} 

export default observer(Message);