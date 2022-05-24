import React from 'react'
import { View } from '@tarojs/components';
import Loading from '../loading';
import { Props } from './types';

import styles from './Button.module.scss';

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
        ${styles.container}
        ${ghost && styles.ghost}
        ${(disabled || loading) && styles.disabled}
        ${round && styles.round}
        ${styles[size]}
      `}
      onClick={handleClick}
      style={customStyles}
    >
      {loading && (
        <View style='margin-right: 10Px'>
          <Loading size='16Px' color={ghost ? '#80A2FF' : '#ffffff'} />
        </View>
      )}
      {children || title}
    </View>
  )
}

export default Button