import { useEffect, useState } from 'react';
import Taro,{showToast} from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { httpRequest } from '@/utils';
import PropTypes from 'prop-types';
import auth from '@/stores/auth';
import { Dialog } from '@/components';
import { resultImg} from '@/constants';
import styles from './ListItem.module.scss';

const ListItem = ({
  data,
  handleCurrentState,
}) => {
  useEffect(() => {
    handleCurrentState({step:'init'});
  }, []);
  return (
  <View className={styles['post-item']}>
    <View className={styles['post-item-header']}>
      <View className={styles['item-header-title']}>
        {data?.jobName}
      </View>
      <View className={styles['item-header-details']} onClick={()=> handleCurrentState({step:'detail'},data)}>
        查看详情
      </View>
    </View>
    <View className={styles['post-label-wrapper']}>
      {
        data.tags.map((value)=>{
          return <View className={styles['label-item']} key={value}>{value}</View>
        })
      }
    </View>
    <View className={styles['post-item-botton']}>
      <View className={styles['item-botton-money']}>
        {data.orderPriceStart +　data.orderPriceType}
      </View>
      <View className={styles['sing-up-button']} onClick={()=>handleCurrentState({step:'signUp'},data)}>立即报名</View>
    </View>
  </View>
  )
}
ListItem.propTypes = {
  data:PropTypes.shape({}),
  handleCurrentState:PropTypes.func,
};

ListItem.defaultProps = {
  data:{},
  handleCurrentState:() => {},
};
export default ListItem;
