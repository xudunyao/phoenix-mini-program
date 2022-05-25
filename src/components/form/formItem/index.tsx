import React from 'react'
import { View, Text } from '@tarojs/components';
import { Props } from './types';

import './styles.scss';

const FormItem: React.FC<Props> = ({
  label,
  labelAlign = 'top',
  labelWidth = 80,
  errorMsg,
  children,
  extra,
  required = false,
}) => {
  return (
    <View className={`form-item ${labelAlign === 'top' ? 'form-item__vertical' : ''} ${errorMsg ? 'form-item__error' : ''}`}>
      <Text
        className={`form-item-label form-item-label__${labelAlign}`}
        style={{ width: typeof labelWidth === 'number' ? `${labelWidth}Px` : labelWidth}}
      >
        {required && <Text className='form-item-required-flag'>*</Text>}
        {label}
      </Text>
      <View className='form-item-control'>
        {children}
        {errorMsg && (
          <View className='form-item-extra form-item-error'>
            {errorMsg}
          </View>
        )}
        {extra && (
          <View className='form-item-extra'>
            {extra}
          </View>
        )}
      </View>
    </View>
  )
};

export default FormItem