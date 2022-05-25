import React, { useMemo } from 'react'
import { Checkbox, CheckboxGroup } from '@tarojs/components';
import { Props } from './types';

import './styles.scss';

const MyCheckBoxGroup: React.FC<Props> = ({
  onChange,
  value = [],
  options,
  disabled,
}) => {
  const optionList = useMemo(() => options?.map((o) => ({
    value: o.value,
    text: o.label,
    checked: value.includes(o.value),
    disabled: disabled || !!o.disabled,
  })), [options, value, disabled]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e?.detail?.value);
    }
  }
  return (
    <CheckboxGroup onChange={handleChange} className='checkbox-group'>
      {optionList?.map((item) => {
        return (
          <Checkbox
            key={item.value}
            className='checkbox-group-item'
            value={item.value}
            checked={item.checked}
            disabled={item.disabled}
            color='#80A2FF'
          >
            {item.text}
          </Checkbox>
        )
      })}
    </CheckboxGroup>
  )
}

export default MyCheckBoxGroup