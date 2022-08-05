import React,{ useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { observer } from 'mobx-react-lite';
import { httpRequest } from '@/utils';
import { View, Text } from '@tarojs/components';
import { datetimeFormat } from '@/constants';
import moment from 'moment';
import numeral from 'numeral';
import styles from  './steps.module.scss';

const process = [
  {
    text: '发起提现申请',
    isActive: false,
    isFinish:true,
  },
  {
    text: '银行处理中',
    isActive:true,
  },
  {
    text: '到账成功',
    isActive:false,
    isFinish:false,
  },
]
const Steps = () => {
  const [data, setData] = useState();

  const getWithdrawInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/fetchWithdraw');
      if (res.code !== 0) {
        throw new Error(res.msg);
      }
      setData(res.data);
    } catch (err) {
      Taro.showToast({
        title: `${err.message}`,
        icon: 'none',
      });
    }
  }
  useEffect(() => {
    getWithdrawInfo();
  }, [])
  return  (
    <View className={styles.steps}>
      <View className={styles.process}>
        {
          process.map((item,index)=>{
            return (
              <React.Fragment key={item.text}>
                <View className={styles['process-item']} >
                  <View className={styles['process-dot-wrapper']}>
                  <View className={`${item.isActive ? styles['item-dot-active'] : item.isFinish ? styles['item-dot-finish'] : styles['item-dot']}`} />
                </View>
                <View className={styles['item-text']}>
                  {
                    !item.isActive ? 
                      <Text >{item.text}</Text> : (
                        <>
                          <View className={styles['text-active']}>{item.text}</View>
                          <View className={styles['text-time']}>{`预计${moment(new Date().getTime() + 2 * 60 * 60 * 1000).format(datetimeFormat.dateTime)}前到账`}</View>
                        </>
                      )
                  }
                </View>
                </View>
                {
                  process.length !== index+1  &&　<View className={`${item.isFinish ? styles['item-line-active'] : styles['item-line']}`} />
                }
              </React.Fragment>
            )
          })
        }
      </View>
      <View className={styles.info}>
        <View className={styles['info-item']}>
          <View className={styles.type}>提现金额</View>
          <View className={styles.value}>{ numeral(data?.amount).format('0,0.00')}</View>
        </View>
        <View className={styles['info-item']}>
          <View className={styles.type}>到账银行卡</View>
          <View className={styles.value}>{`${data?.bankName}(尾号${data?.bankNo?.substr(data?.bankNo?.length - 4)})`}</View>
        </View>
      </View>
    </View>
  )
  }
export default observer(Steps);
