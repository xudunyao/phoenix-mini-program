import React from 'react'
import { Input, View } from '@tarojs/components';
import { IconFont } from '@/components';
import { Props } from './types';

import './styles.scss';

const MyInput: React.FC<Props> = ({
  onInput,
  onFocus,
  onBlur,
  value = '',
  clearable = true,
  disabled = false,
  maxlength = 1000,
  placeholder = '请输入',
  error = false,
}) => {
  const handleInput = (e) => {
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

  const handleClear = () => {
    if (onInput) {
      onInput('');
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
        value={value}
      />
      {clearable && !!value && (<View className='clear' onClick={handleClear}>
        <IconFont name='clear' color='#ccc' />
      </View>)}
    </View>
  )
}

export default MyInput