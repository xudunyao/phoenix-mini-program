import React,{ useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text } from '@tarojs/components';
import Taro,{ useDidShow } from '@tarojs/taro';
import styles from  './steps.module.scss';

const process = [
  {
    text: '发起提现申请',
    time:288.88,
    isActive:false,
  },
  {
    text: '发起提现申请',
    time:"预计2021-09-07  17:13前到账",
    isActive:true,
  },
  {
    text: '发起提现申请',
    time:288.88,
    isActive:false,
  },
]

const Steps = () => {
  const [data, setData] = useState();
  useDidShow(() => {
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    const eventChannel = current.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage',(res)=>{
    console.log('page_test',res);
    setData(res.data.data);
    })
  })
  return  (
    <View className={styles.steps}>
      <View className={styles.process}>
        {
          process.map((item,index)=>{
            return (
              <React.Fragment key={item.text}>
                <View className={styles['process-item']} >
                  <View className={styles['process-dot-wrapper']}>
                  <View className={`${item.isActive ? styles['item-dot-active'] : styles['item-dot']}`} />
                </View>
                <View className={styles['item-text']}>
                  {
                    !item.isActive ? 
                      <Text >{item.text}</Text> : (
                        <>
                          <View className={styles['text-active']}>{item.text}</View>
                          <View className={styles['text-time']}>{item.time}</View>
                        </>
                      )
                  }
                </View>
                </View>
                {
                  process.length !== index+1  &&　<View className={styles['item-line']} />
                }
              </React.Fragment>
            )
          })
        }
      </View>
      <View className={styles.info}>
        <View className={styles['info-item']}>
          <View className={styles.type}>提现金额</View>
          <View className={styles.value}>{data?.balance}</View>
        </View>
        <View className={styles['info-item']}>
          <View className={styles.type}>到账银行卡</View>
          <View className={styles.value}>{`${data?.bankName}(尾号${data.bankNo?.substr(data?.bankNo?.length - 4)})`}</View>
        </View>
      </View>
    </View>
  )
  }
export default observer(Steps);
