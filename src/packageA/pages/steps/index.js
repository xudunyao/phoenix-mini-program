import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text } from '@tarojs/components';
import styles from  './steps.module.scss';

const info = [
  {
    type: '提现金额',
    value:288.88
  },
  {
    type: '到账银行卡',
    value:"招商银行  尾号1489"
  },
  {
    type: '服务费',
    value:288.88
  },
]
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
        {
          info.map((item,index)=>{
            return (
              <View className={styles['info-item']} key={index}>
                <View className={styles.type}>{item.type}</View>
                <View className={styles.value}>{item.value}</View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
  }

export default observer(Steps);
