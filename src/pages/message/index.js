import { useState } from 'react';
import moment from 'moment';
import Taro, { showToast, useDidShow } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { httpRequest } from '@/utils';
import { message, datetimeFormat } from '@/constants';
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
  console.log()
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
  useDidShow(() => {
    getData();
  })

  return(
    <View className={styles.content}>
      {
        list?.map((v) => (
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
        ))
      }
      
    </View>
  );
} 

export default Message;