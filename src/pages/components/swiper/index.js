import { useState } from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import exampleImg from '@/assets/images/example.png';
import exampleImg1 from '@/assets/images/example1.png';
import './swiper.scss';


const swiperList = [{
  url: exampleImg,
}, {
  url: exampleImg1,
}, {
  url: exampleImg,
}];
const Swipers = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (e) => {
    setCurrent(e.detail.current);
  };
  return(
    <View className='swiper' >
      <Swiper
        className='content'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        auto
        current={current}
        onChange={onChange}
      >
        {
          swiperList.map((f) => (
            <SwiperItem>
              <Image mode='widthFix' className='img' src={f.url}></Image>
            </SwiperItem>
          ))
        }
      </Swiper>
      <View className='dots'>
        {
          swiperList.map((f,index) => (
            <View className={`${current===index ? 'dots-dot' : 'dots-dot_active'}`}></View> 
          ))
        }
        
      </View>
    </View>
  )
};
export default Swipers;