import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components';

import logo from '@/assets/images/logo.png';
import backArrow from '@/assets/images/back_icon.png';

import { Props } from './types';

import './styles.scss';


const NavBar: React.FC<Props> = ({
  title='寻工鸟',
  customStyle,
  showBack=true,
}) => {
  const [ navHeight, setNavHeight] =useState(0);
  const [ navContentHeight, setNavContentHeight] =useState(0);
  const [ statusHeight, setStatusHeight] = useState(0);
  const getNavHeight =() =>{
    const sysinfo = Taro.getSystemInfoSync(); 
    const statusBarHeight:any = sysinfo.statusBarHeight; 
    const navBarHeight = 44+statusBarHeight;
    const navBarContent = navBarHeight -statusBarHeight;
    setNavHeight(navBarHeight);
    setNavContentHeight(navBarContent);
    setStatusHeight(statusBarHeight);
  };
  const isH5 = process.env.TARO_ENV === 'h5'
  useEffect(() => {
    if (!isH5) {
      getNavHeight();
    }
  }, [])

  return (
    !isH5 ? (
      <View className='navbar' style={`height:${navHeight}px;`+customStyle} >
        <View className='navbar-content' style={`marginTop:${statusHeight}px;`}>
        {
          showBack?(
            <View className='navbar-content-back' style={`line-height:${navContentHeight}px`}>
              <Image className='navbar-content-back-img' src={backArrow} />
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