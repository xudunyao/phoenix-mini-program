import React from 'react'
import { View,Image } from '@tarojs/components';
import { Props } from './types';
import './styles.scss';
import close from './img/close.png'

const AdvertModal: React.FC<Props> = ({
  onClose,
  maskClosable = true,
  imageUrl = '',
  visible = false,
}) => {
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  }
  return (
    <View className='mask'  style={{ display: visible ? 'block' : 'none' }} onClick={handleMaskClick}>
      <View className='mask-body'>
         <Image className='mask-body-img' src={imageUrl} mode='widthFix' />
         <Image className='mask-body-close' src={close} mode='widthFix' onClick={onClose} /> 
      </View>
    </View>
  )
}
export default AdvertModal