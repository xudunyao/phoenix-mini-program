import React from 'react'
import { View } from '@tarojs/components'

import styles from './Loading.module.scss'

interface Props {
  size?: string | number
  color?: string | number
}

const Loading: React.FC<Props> = ({
  size,
  color,
}) => {
  const loadingSize = typeof size === 'string' ? size : String(size)
    const sizeStyle = {
      width: loadingSize || '',
      height: loadingSize || '',
    }
    const colorStyle = {
      border: color ? `1Px solid ${color}` : '',
      borderColor: color ? `${color} transparent transparent transparent` : ''
    }
    const ringStyle = Object.assign({}, colorStyle, sizeStyle)

    return (
      <View className={styles.loading} style={sizeStyle}>
        <View className={styles.ring} style={ringStyle}></View>
        <View className={styles.ring} style={ringStyle}></View>
        <View className={styles.ring} style={ringStyle}></View>
      </View>
    )
}

export default Loading;