import React from 'react'
import { Textarea, View } from '@tarojs/components';
import { IconFont } from '@/components';
import { Props } from './types';

import './styles.scss';

const MyTextArea: React.FC<Props> = ({
  onInput,
  onFocus,
  onBlur,
  value,
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
    <View className={`textarea-wrapper ${error ? 'textarea-wrapper__error' : ''}`}>
      <Textarea
        className='textarea'
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

export default MyTextArea