import React from 'react'
import { View, Text } from '@tarojs/components';
import { IconFont } from '@/components';
import { Props } from './types';

import './styles.scss';

const Modal: React.FC<Props> = ({
  onClose,
  maskClosable = true,
  title,
  children,
  visible = false,
}) => {
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  }
  return (
    <View className='modal' style={{ display: visible ? 'block' : 'none' }}>
      <View className='modal-mask' onClick={handleMaskClick}></View>
      <View className='modal-body'>
        <View className='modal-header'>
          <View style='flex: 1'>
            {typeof title === 'string' ?(
              <Text className='modal-title'>
                {title}
              </Text>
            ) : title}
          </View>
            <View className='modal-close' onClick={onClose}>
              <IconFont name='close' />
            </View>
        </View>
        <View className='modal-content'>
          {children}
        </View>
      </View>
    </View>
  )
}

export default Modal