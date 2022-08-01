import React from 'react'
import Taro from '@tarojs/taro';
import { View,Image } from '@tarojs/components';
import { Props } from './types';
import './styles.scss';
import IconFont from '../iconfont';

const AdvertModal: React.FC<Props> = ({
  onClose,
  maskClosable = false,
  imageUrl = '',
  jumpUrl = '',
  visible = false,
}) => {
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  }
  const handleClick = () => {
    if (jumpUrl) {
      const http = /^http:\/\/.*/i.test(jumpUrl);
      const https = /^https:\/\/.*/i.test(jumpUrl);
      if (!http && !https) {
        Taro.navigateTo({
          url: jumpUrl,
        });
      }else{
        Taro.navigateTo({
          url: '../../packageA/pages/webView/index?url=' + jumpUrl,
        });
      }
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
        <Image className='mask-body-img' src={imageUrl} mode='widthFix' onClick={handleClick} />
        <View style={style} onClick={onClose}>
          <IconFont name='clear' color='#ccc' size={25} />
        </View>
      </View>
    </View>
   )
  )
}
export default AdvertModal