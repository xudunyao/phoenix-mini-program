import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components';

import logo from '@/assets/images/logo.png';
import backArrow from '@/assets/images/back_icon.png';

import { Props } from './types';

import './styles.scss';


const NavBar: React.FC<Props> = ({
  title,
  customNavStyle,
  brand=false,
  leftArrow=true,
}) => {
  const [ navHeight, setNavHeight] =useState(0);
  const [ navContentHeight, setNavContentHeight] =useState(0);
  const [ statusHeight, setStatusHeight] = useState(0);
  const getNavHeight =() =>{
    const menuButtonObject = Taro.getMenuButtonBoundingClientRect();
    const sysinfo = Taro.getSystemInfoSync(); 
    const statusBarHeight:any = sysinfo.statusBarHeight; 
    const menuBottonHeight =  menuButtonObject.height;
    const menuBottonTop =  menuButtonObject.top;
    const navBarHeight = statusBarHeight + menuBottonHeight + (menuBottonTop - statusBarHeight) * 2 ; 
    const navBarContent = navBarHeight -statusBarHeight;
    setNavHeight(navBarHeight);
    setNavContentHeight(navBarContent);
    setStatusHeight(statusBarHeight);
  };
  useEffect(() => {
    if (Taro.getEnv()!=='WEB') {
      getNavHeight();
    }
  }, [])

  return (
    Taro.getEnv()!=='WEB'?<View className='navbar' style={`height:${navHeight}px;`+customNavStyle} >
      <View className='navbar-content' style={`height:${navContentHeight}px;marginTop:${statusHeight}px;`}>
      {brand && !!leftArrow?<View className='navbar-content-logo' style={`height:${navContentHeight}px;`}>
          <Image className='navbar-content-logo-img' src={logo} />
          <View className='navbar-content-logo-text'>
            <View className='navbar-content-logo-text-title'>寻工鸟</View>
            <View className='navbar-content-logo-text-subTitle'>富士康旗下劳务招聘平台</View>
          </View>
         
        </View>:<View className='navbar-content-back' style={`line-height:${navContentHeight}px`}><Image className='navbar-content-back-img' src={backArrow} /></View>}
        <View className='navbar-content-title' style={`line-height:${navContentHeight}px`}>{title}</View>
      </View>
      
    </View>:null
  )
}

export default NavBar;