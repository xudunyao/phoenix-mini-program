import { useEffect } from 'react';
import moment from 'moment';
import { showToast } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { InfiniteScroll, Result } from '@/components';
import { httpRequest } from '@/utils';
import { datetimeFormat, resultImg } from '@/constants';
import styles from './MessageWork.module.scss';

const MessageWork = () => {
  const icon = {
    src:resultImg.empty,
  }
  const getData = async(search) => {
    try{
      const res = await httpRequest.post('phoenix-center-backend/client/message/detail/inquiry', {
        data: {
          messageType: 'JOB_MESSAGE',
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
  const handleRead = async (messageId) => {
    try{
      const res = await httpRequest.put(`phoenix-center-backend/client/message/${messageId}`);
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData()
  },[])
  return (
    <View className={styles.content}>
      <InfiniteScroll
        getData={getData}
        pageSize={20}
        customStyle='justify-content: center'
        noDataComponent={
          <Result
            icon={icon}
            subTitle='暂无更多数据' 
          />
        }
        renderItem={(item) => (
          <View className={styles.item} onClick={() =>handleRead(item.messageId)}>
            <View className={styles.title}>
              <Text className={styles.name}>
                {item.messageEventType}
                {
                  !item.hasRead ? (<Text className={styles.badge} />) : null
                }
              </Text>
              <Text className={styles.time}>{moment(item.time).format(datetimeFormat.dateTime)}</Text>
            </View>
            <View className={styles.text}>{item.content}</View>
          </View>
          )}
      >
      </InfiniteScroll>
    </View>
  )
};

export default MessageWork;