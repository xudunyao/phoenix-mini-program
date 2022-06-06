import { useEffect } from 'react';
import { showToast } from '@tarojs/taro';
import { InfiniteScroll } from '@/components';
import { View, Text } from '@tarojs/components';
import { httpRequest } from '@/utils';
import styles from './MessageSystem.module.scss'

const MessageSystem = () => {
  const getData = async(search) => {
    try{
      const res = await httpRequest.post('phoenix-center-backend/client/message/detail/inquiry', {
        data: {
          messageType: 'SYSTEM_MESSAGE',
          ...search,
        }
      });
      if (res?.code !== 0) {
        showToast({
          icon: 'none',
          title: res.msg
        })
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData()
  },[])
  return (
    <View className={styles.content}>
      <InfiniteScroll
        getData={getData}
        pageSize={20}
        renderItem={(item) => (
          <View className={styles.item}>
            <View className={styles.title}>
              <Text className={styles.name}>
                {item.messageEventType}
                {
                  !item.hasRead ? (<Text className={styles.badge} />) : null
                }
              </Text>
              <Text className={styles.time}>今天 18：00</Text>
            </View>
            <View className={styles.text}>{item.content}</View>
          </View>
          )}
      >
      </InfiniteScroll>
    </View>
  )
};

export default MessageSystem;