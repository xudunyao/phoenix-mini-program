import { useState } from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import styles from  './SwiperIndex.module.scss';

const SwiperIndex = ({
  list,
}) => {
  const [current, setCurrent] = useState(0);
  const onChange = (e) => {
    setCurrent(e.detail.current);
  };
  return(
    <View className={styles['swiper_index']}>
      <Swiper
        className={styles.content}
        indicatorColor='#999'
        indicatorActiveColor='#333'
        autoplay
        current={current}
        onChange={onChange}
      >
        {
          list?.map((f) => (
            <SwiperItem key={f.name}>
              <Image mode='widthFix' className={styles.img} src={f.url}></Image>
            </SwiperItem>
          ))
        }
      </Swiper>
      <View className={styles.dots}>
        {
          list?.map((f, index) => (
            <View key={f} className={`${current===index ? styles['dots-dot'] : styles['dots-dot_active']}`}></View> 
          ))
        }
      </View>
    </View>
  )
};
export default SwiperIndex;