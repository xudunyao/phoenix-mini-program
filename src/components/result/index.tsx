import React from 'react';
import { View, Image } from '@tarojs/components';
import { Button } from '@/components';

import { Props } from './types';

import './styles.scss';

const Result: React.FC<Props> = ({
  title,
  subTitle,
  icon,
  customIcon,
  extra,
  customStyles,
  onClick,
}) => {
  const hanldClick = () => {
    onClick()
  };
  return (
    <View className='result' style={customStyles}>
      {customIcon || <Image src={icon?.src} style={`width: ${icon.width?icon.width:192}px;height: ${icon.height?icon.height:192}px;`} /> }
      <View className='result-space'>
        {title? <View className='result-title'>{title}</View> : null}
      </View>
        {subTitle? <View className='result-subTitle'>{subTitle}</View>: null}
      <View className='result-space'>
       {extra?<Button title={extra} onClick={hanldClick}></Button>:null}
      </View>
    </View>
  )
}
export default Result;