import { useState } from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import './swiper.scss';

const Swipers = ({
  customStyle,
  list,
  position
}) => {
  const [current, setCurrent] = useState(0);
  const onChange = (e) => {
    setCurrent(e.detail.current);
  };
  return(
    <View className='swiper' style={customStyle} >
      <Swiper
        className='content'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        autoplay
        style={customStyle}
        current={current}
        onChange={onChange}
      >
        {
          list?.map((f) => (
            <SwiperItem key={f}>
              <Image mode='widthFix' className='img' src={f}></Image>
            </SwiperItem>
          ))
        }
      </Swiper>
      <View className={`dots ${position}`}>
        {
          list?.map((f, index) => (
            <View key={f} className={`${current===index ? 'dots-dot' : 'dots-dot_active'}`}></View> 
          ))
        }
      </View>
    </View>
  )
};
export default Swipers;