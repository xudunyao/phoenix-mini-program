import { showToast } from '@tarojs/taro';
import { useState } from 'react';
import { InfiniteScroll, Result } from '@/components';
import { View, Text } from '@tarojs/components';
import { httpRequest } from '@/utils';
import moment from 'moment';
import { resultImg, datetimeFormat } from '@/constants';
import styles from './MessageAccount.module.scss'

const MessageAccount = () => {
  const [key, setKey] = useState(0)
  const EventType = {
    'WALLET_MSG': "钱包到账提醒",
    'WITHDRAW_SUCCEED': "钱包提现到账",
    'WITHDRAW_FAIL_ENTRY': "钱包提现提醒",
  }
  const icon = {
    src: resultImg.empty,
  }
  const getData = async (search) => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/message/detail/accountMsg/inquiry',
        {
          data: {
            ...search,
          }
        }
      );
      if (res?.code !== 0) {
        showToast({
          icon: 'none',
          title: res.msg
        })
      }
      const content = res.data.content.map((item) => {
        return {
          'messageEventType': item.messageEventType,
          'messageId': item.messageId,
          'content': item.content,
          'hasRead':item.hasRead,
          'amount': item.amount,
          'activity': item.messageEventType === 'WITHDRAW_FAIL_ENTRY',
          'list': [
            {
              show: item.messageEventType === 'WALLET_MSG',
              label: '到账详情',
              value: item.detail,
            },
            {
              show: item.messageEventType !== 'WALLET_MSG',
              label: '提现银行',
              value: item.bankName,
            },
            {
              show: item.messageEventType !== 'WALLET_MSG',
              label: '提现时间',
              value: item.applyTime && moment(item.applyTime).format(datetimeFormat.dateTime)
            },
            {
              show: true,
              label: '到账时间',
              activity: item.messageEventType === 'WITHDRAW_FAIL_ENTRY',
              value: item.messageEventType === 'WITHDRAW_FAIL_ENTRY' ? '未到账' : item.outTime && moment(item.outTime).format(datetimeFormat.dateTime),
            },
            {
              show: item.messageEventType !== 'WALLET_MSG',
              label: '备注',
              activity: item.messageEventType === 'WITHDRAW_FAIL_ENTRY',
              value: item.remark,
            },
          ]
        }
      })
      res.data.content = content
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
      setKey(messageId)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View className={styles.content}>
      <InfiniteScroll
        key={key}
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
            <View className={styles.title}><Text>{EventType[item.messageEventType]}</Text>{item.hasRead?'':<View style={{ display: 'inline-block',height: '5px',width:'5px',borderRadius:'50%',marginLeft:'5px',marginBottom: '6px',backgroundColor: '#EF6060'}}></View>}</View>
            <View className={`${styles.type} ${item.activity ? styles.remindColor : ''}`}>{item.content}</View>
            <View className={styles.price}>
              <Text className={styles.unit}>￥</Text>
              <Text className={styles.money}>{item.amount}</Text>
            </View>
            {
              item.list.map((f) => {
                return f.show ? (
                  <View className={styles.list}>
                    <View className={styles.label}>{f.label}</View>
                    <View className={`${styles.text} ${f.activity ? styles.remindColor : ''}`}>{f.value}</View>
                  </View>
                ) : null
              })
            }
          </View>
        )}
      >
      </InfiniteScroll>
    </View>
  )
};

export default MessageAccount;