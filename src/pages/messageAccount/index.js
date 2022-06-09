import { showToast } from '@tarojs/taro';
import { InfiniteScroll, Result } from '@/components';
import { View, Text } from '@tarojs/components';
import { httpRequest } from '@/utils';
import { resultImg } from '@/constants';
import styles from './MessageAccount.module.scss'

const MessageAccount = () => {
  const icon = {
    src:resultImg.empty,
  }
  const getData = async(search) => {
    try{
      const res = await httpRequest.post('phoenix-center-backend/client/message/detail/inquiry', {
        data: {
          messageType: 'ACCOUNT_MESSAGE',
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
  return (
    <View className={styles.content}>
      <InfiniteScroll
        getData={getData}
        pageSize={20}
        noDataComponent={
          <Result
            icon={icon}
            subTitle='暂无更多数据' 
          />
        }
        renderItem={() => (
          <View className={styles.item}>
            <View className={styles.title}>钱包提现到账</View>
            <View className={styles.type}>提现金额</View>
            <View className={styles.price}><Text className={styles.unit}>￥</Text><Text className={styles.money}>9.9</Text></View>
            <View className={styles.list}>
              <View className={styles.label}>提现银行</View><View className={styles.text}>中国建设银行(尾号1170)</View>
            </View>
            <View className={styles.list}>
              <View className={styles.label}>提现时间</View><View className={styles.text}>2021-09-07 14:54:51</View>
            </View>
            <View className={styles.list}>
              <View className={styles.label}>到账时间</View><View className={styles.text}>2021-09-08 14:54:51</View>
            </View>
            <View className={styles.list}>
            <View className={styles.label}>备注</View><View className={styles.text}>你的钱包提现已到账至银行卡</View>
            </View>
          </View>
          )}
      >
      </InfiniteScroll>
    </View>
  )
};

export default MessageAccount;