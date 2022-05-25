import React, { useState } from 'react'
import { Input, View } from '@tarojs/components';
import { IconFont } from '@/components';
import { Props } from './types';

import './styles.scss';

const MyInput: React.FC<Props> = ({
  onInput,
  onFocus,
  onBlur,
  clearable = true,
  disabled = false,
  maxlength = 1000,
  placeholder = '请输入',
  error = false,
}) => {
  const [val, setVal] = useState('');
  const handleInput = (e) => {
    console.log('handleInput', e?.detail?.value);
    setVal(e?.detail?.value);
    if (onInput) {
      onInput(e?.detail?.value || '');
    }
  }

  const handleFocus = (e) => {
    if (onFocus) {
      onFocus();
    }
  }

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e?.detail?.value);
    }
  }
  return (
    <View className={`input-wrapper ${error ? 'input-wrapper__error' : ''}`}>
      <Input
        className='input'
        placeholder={placeholder}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        maxlength={maxlength}
      />
      {clearable && !!val && (<View className='clear'>
        <IconFont name='clear' color='#ccc' />
      </View>)}
    </View>
  )
}

export default MyInput