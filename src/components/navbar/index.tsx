import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components';
import { IconFont } from '@/components';
import { Props } from './types';

import './styles.scss';


const NavBar: React.FC<Props> = ({
  title='寻工鸟',
  customStyle,
  showBack=true,
}) => {
  const [ statusHeight, setStatusHeight] = useState(0);
  const getNavHeight =() =>{
    const sysinfo = Taro.getSystemInfoSync(); 
    const statusBarHeight:any = sysinfo.statusBarHeight; 
    setStatusHeight(statusBarHeight);
  };
  const isH5 = process.env.TARO_ENV === 'h5';
  useEffect(() => {
    if (!isH5) {
      getNavHeight();
    }
  }, [])

  return (
    !isH5 ? (
      <View className='navbar' style={`height:${44+statusHeight}px;`+customStyle} >
        <View className='navbar-content' style={`marginTop:${statusHeight}px`}>
        {
          showBack?(
            <View className='navbar-content-back' >
              <IconFont name='back' />
            </View>
          ):null
        }
          <View className='navbar-content-title'>{title}</View>
        </View>
      </View>
    ):null
  )
}

export default NavBar;