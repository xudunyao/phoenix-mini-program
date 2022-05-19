import React from 'react'
import { View, Text } from '@tarojs/components';
import { IconFont } from '@/components';
import { Props } from './types';

import styles from './Modal.module.scss';

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
    <View className={styles.container} style={{ display: visible ? 'block' : 'none' }}>
      <View className={styles.mask} onClick={handleMaskClick}></View>
      <View className={styles.body}>
        <View className={styles.header}>
          <View style='flex: 1'>
            {typeof title === 'string' ?(
              <Text className={styles.title}>
                {title}
              </Text>
            ) : title}
          </View>
          <View className={styles.close} onClick={onClose}>
            <IconFont name='close' />
          </View>
        </View>
        <View className={styles.content}>
          {children}
        </View>
      </View>
    </View>
  )
}

export default Modal