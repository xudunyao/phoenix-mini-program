import React from 'react'
import { View, Text } from '@tarojs/components';
import { IconFont } from '@/components';
import { Props } from './types';

import styles from './Dialog.module.scss';

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
    <View className={styles.container} style={{ display: visible ? 'block' : 'none' }}>
      <View className={styles.mask} onClick={handleMaskClick}></View>
      <View className={styles.body}>
        <View className={styles.header}>
          {typeof title === 'string' ?(
            <Text className={styles.title}>
              {title}
            </Text>
          ) : title}
        </View>
        <View className={styles.content}>
          {typeof content === 'string' ?(
            <Text className={styles.contentText}>
              {content}
            </Text>
          ) : content}
        </View>
        <View className={styles.actions}>
          {
            renderedActions.map(a => (
              <View key={a.title} className={styles.action} onClick={a.onClick || onClose}>
                <Text className={`${styles.actionTitle} ${styles[`actionTitle-${a.type}`]}`}>{a.title}</Text>
              </View>
            ))
          }
        </View>
      </View>
    </View>
  )
}

export default Dialog