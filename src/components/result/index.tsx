import React from 'react';
import { View, Image } from '@tarojs/components';

import { Props } from './types';

import styles from './result.module.scss';

const Result: React.FC<Props> = ({
  title,
  subTitle,
  icon,
  customIcon,
  extra,
}) => {
  return (
    <View className={styles.Result}>
      {customIcon || <Image src={icon?.src} style={`width: ${icon.width?icon.width:192}px;height: ${icon.height?icon.height:192}px;`} /> }
      <View className={styles.space}>
        {title? <View className={styles.title}>{title}</View> : null}
      </View>
        {subTitle? <View className={styles.subTitle}>{subTitle}</View>: null}
      <View className={styles.space}>
       {extra?<View className={styles.btn}>{extra}</View>:null}
      </View>
      
    </View>
  )
}
export default Result;