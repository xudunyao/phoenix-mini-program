import { useState } from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import exampleImg from '@/assets/images/example.png';
import exampleImg1 from '@/assets/images/example1.png';
import styles from  '../Index.module.scss';


const swiperList = [{
  url: exampleImg,
}, {
  url: exampleImg1,
}, {
  url: exampleImg,
}];
const SwiperIndex = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (e) => {
    setCurrent(e.detail.current);
  };
  return(
    <View className={styles.swiper} >
      <Swiper
        className={styles['swiper-content']}
        indicatorColor='#999'
        indicatorActiveColor='#333'
        autoplay='false'
        circular
        current={current}
        onChange={onChange}
      >
        {
          swiperList.map((f) => (
            <SwiperItem>
              <Image className={styles['swiper-content-img']} src={f.url}></Image>
            </SwiperItem>
          ))
        }
      </Swiper>
      <View className={styles['swiper-dots']}>
        {
          swiperList.map((f,index) => (
            <View className={`${current===index ? styles['swiper-dots-dot'] : styles['swiper-dots-dot_active']}`}></View> 
          ))
        }
        
      </View>
    </View>
  )
};
export default SwiperIndex;