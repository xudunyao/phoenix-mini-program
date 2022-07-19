import React from 'react'
import { View,Image } from '@tarojs/components';
import { Props } from './types';
import './styles.scss';
import IconFont from '../iconfont';

const AdvertModal: React.FC<Props> = ({
  onClose,
  maskClosable = false,
  imageUrl = '',
  visible = false,
}) => {
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  }
  const style:React.CSSProperties= {
    position:'absolute',
    bottom:'0px',
    left:'50%',
    transform:'translateX(-50%)'
  }
  return (
   imageUrl && (
    <View className='mask'  style={{ display: visible ? 'block' : 'none' }} onClick={handleMaskClick}>
      <View className='mask-body'>
        <Image className='mask-body-img' src={imageUrl} mode='widthFix' />
        <View style={style} onClick={onClose}>
          <IconFont name='clear' color='#ccc' size={25} />
        </View>
      </View>
    </View>
   )
  )
}
export default AdvertModal