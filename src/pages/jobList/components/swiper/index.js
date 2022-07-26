import { useState } from 'react';
import { View, Swiper, SwiperItem, Image,WebView } from '@tarojs/components';
import { httpRequest } from '@/utils';
import Taro from '@tarojs/taro';
import styles from  './SwiperIndex.module.scss';

const SwiperIndex = ({
  list,
}) => {
  const [current, setCurrent] = useState(0);
  const onChange = (e) => {
    setCurrent(e.detail.current);
  };
  const handleClickBanner = async (params) => {
    const { id, jumpUrl } = params;
    if(jumpUrl.indexOf('https') >= 0){
      <WebView src={jumpUrl} />
    }else{
      Taro.navigateTo({
        url: jumpUrl
      })
    }
    try {
      const res = await httpRequest.put(`phoenix-center-backend/client/noauth/banner/click/${id}`);
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
    } catch (err) {
     console.log('err',err)
    }
  }
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
            <SwiperItem key={f.name} onClick={()=>{ handleClickBanner(f) }}>
              <Image mode='widthFix' className={styles.img} src={f.imageUrl}></Image>
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