import React from 'react';
import { View, Image } from '@tarojs/components';
import { resultImg } from '@/constants';

import { Props } from './types';

import styles from './result.module.scss';

const Result: React.FC<Props> = ({
  status,
  width,
  height,
  title,
  subTitle,
  extra,
}) => {
  return (
    <View className={styles.result}>
      <Image className={styles.img} src={status==='success'? resultImg.success: status==='fail'? resultImg.fail:status==='empty'?resultImg.empty:resultImg.success} style={`width: ${width?width:192}px;height: ${height?height:192}px;`} />
      {title? <View className={styles.title}>{title}</View> : null}
      {subTitle? <View className={styles.subTitle}>{subTitle}</View>: null}
      {extra?<View className={styles.btn}>{extra}</View>:null}
    </View>
  )
}
export default Result;