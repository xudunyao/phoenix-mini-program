import React, { useMemo } from 'react'
import { RadioGroup, Radio } from '@tarojs/components';
import { Props } from './types';

import './styles.scss';

const MyRadioGroup: React.FC<Props> = ({
  onChange,
  value,
  options,
  disabled,
}) => {
  const optionList = useMemo(() => options?.map((o) => ({
    value: o.value,
    text: o.label,
    checked: o.value === value,
    disabled: disabled || !!o.disabled,
  })), [options, value, disabled]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e?.detail?.value);
    }
  }
  return (
    <RadioGroup onChange={handleChange} className='radio-group'>
      {optionList?.map((item) => {
        return (
          <Radio
            key={item.value}
            className='radio-group-item'
            value={item.value}
            checked={item.checked}
            disabled={item.disabled}
            color='#80A2FF'
          >
            {item.text}
          </Radio>
        )
      })}
    </RadioGroup>
  )
}

export default MyRadioGroup