import React from 'react'
import { View } from '@tarojs/components';
import Loading from '../loading';
import { Props } from './types';

import './styles.scss';

const Button: React.FC<Props> = ({
  title,
  round = true,
  disabled,
  ghost,
  onClick,
  customStyles,
  loading,
  children,
  size = 'default',
}) => {
  const handleClick = () => {
    if (!loading && !disabled && onClick) {
      onClick();
    }
  }
  return (
    <View
      className={`
        button
        ${ghost && 'button-ghost'}
        ${(disabled || loading) && 'button-disabled'}
        ${round && 'button-round'}
        ${`button-${size}`}
      `}
      onClick={handleClick}
      style={customStyles}
    >
      {loading && (
        <View className='activity-indicator'>
          <Loading size='16Px' color={ghost ? '#80A2FF' : '#ffffff'} />
        </View>
      )}
      {children || title}
    </View>
  )
}

export default Button