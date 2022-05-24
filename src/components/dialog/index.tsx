import React from 'react'
import { View, Text } from '@tarojs/components';
import { Props } from './types';

import styles from './Dialog.module.scss';
import './styles.scss';

const Dialog: React.FC<Props> = ({
  onClose,
  maskClosable = false,
  title,
  content,
  actions,
  visible = false,
}) => {
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  }

  const renderedActions = actions?.length ? actions : [{
    title: '好的',
    onClick: onClose,
    type: 'primary'
  }]
  return (
    <View className='dialog' style={{ display: visible ? 'block' : 'none' }}>
      <View className='dialog-mask' onClick={handleMaskClick}></View>
      <View className='dialog-body'>
        <View className='dialog-header'>
          {typeof title === 'string' ?(
            <Text className='dialog-title'>
              {title}
            </Text>
          ) : title}
        </View>
        <View className='dialog-content'>
          {typeof content === 'string' ?(
            <Text className='dialog-content-text'>
              {content}
            </Text>
          ) : content}
        </View>
        <View className='dialog-actions'>
          {
            renderedActions.map(a => (
              <View key={a.title} className='dialog-actions-item' onClick={a.onClick || onClose}>
                <Text className={`dialog-actions-item-title dialog-actions-item-title__${a.type}`}>{a.title}</Text>
              </View>
            ))
          }
        </View>
      </View>
    </View>
  )
}

export default Dialog