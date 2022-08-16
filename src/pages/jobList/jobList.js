import Taro, {useRouter,useDidShow, useDidHide, showToast, useReady,usePageScroll } from '@tarojs/taro';
import { observer } from 'mobx-react-lite';
import { useState, useRef, useEffect } from 'react';
import { duration } from 'moment';
import { getOverview, getUserInfo, httpRequest, templateIdQuery } from '@/utils';
import { View, Image, ScrollView,WebView  } from '@tarojs/components';
import { Tabs, TabsPanel, IconFont, Dialog, AdvertModal,NavBar } from '@/components';
import { resultImg, storageKeys, defaultBanner } from '@/constants';
import auth from '@/stores/auth';
import styles from  './Index.module.scss';
import Swiper from './components/swiper/index'
import ListIndex from './components/list/index';
import Login from './components/login/index';
import tabBg from './img/tab-bg.png';

const tabLists = [{
  key: 'ALL',
  title: '全部',
}, 
{
  key: 'ALL_reward',
  background: tabBg,
},{
  key: 'FORMAL_WORKER',
  title: '正式工',
}, {
  key: 'DISPATCH_WORKER',
  title: '日结工',
}, {
  key: 'PRAT_TIME_WORKER',
  title: '小时工',
}];

const defaultImages = defaultBanner.map((item,index)=>{
  return {
    id: index,
    imageUrl: item?.defaultImg,
    jumpUrl: ''
  }
}) 

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tabCurrent, setTabCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [signVisible, setSignVisible] = useState(false);
  const [loginVisible, setLoginVisible] =useState(false);
  const [advertVisible,setAdvertVisible] = useState(false);
  const [imageBanners, setImageBanners] = useState([]);
  const [popAds, setPopAds] = useState({});
  const [tabList, setTabList] =useState([]);
  const [height, setHeight] = useState(0);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize:5,
    type: 'ALL',
  });
  const [statusHeight, setStatusHeight] = useState(0);
  const isH5 = process.env.TARO_ENV === 'h5';
  const router = useRouter();
  const { scene,channelCode} = router.params;
  if(scene || channelCode){
    Taro.setStorageSync(storageKeys.scene, scene);
    Taro.setStorageSync('channelCode', channelCode);
  }
  const onTabClick = (index,item) => {
    setTabCurrent(index)
    setPagination({
      pageNumber: 0,
      pageSize:5,
      type: item.key,
    });
  };
  const getNavHeight =() =>{
    const sysinfo = Taro.getSystemInfoSync(); 
    const statusBarHeight = sysinfo.statusBarHeight; 
    setStatusHeight(statusBarHeight);
  };
  const closeDialog = (v, params) => {
    if(v){
      if(v==='login'){
        setLoginVisible(true);
      } else if(v === 'success') {
        setVisible(true);
      } else {
        setSignVisible(true)
      }
    } else {
      setLoginVisible(false);
      setVisible(false);
      setSignVisible(false);
    }
  };
  const handleSignUp =async (id) => {
    const platform = process.env.TARO_ENV;
    try {
      const res = await httpRequest.post(`phoenix-manager-backend/client/signUp/${id}`, {
        data: {
          mobile: auth.realInfo.realMobile,
          name: auth.realInfo.realName,
          platform,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      } else {
        templateIdQuery();
        setVisible(true);
        httpRequest.put('phoenix-center-backend/client/register/signedUpAward')
      }
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  };
  const getImagesBanner = async () => {
    try {
      const res = await httpRequest.get(`phoenix-center-backend/client/noauth/banner/home`);
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setImageBanners(res.data.length> 0 ? res.data : defaultImages);
    } catch (err) {
      console.log(err);
    }
  }
  const getPopAds = async () => {
    try {
      const res = await httpRequest.get(`phoenix-center-backend/client/noauth/banner/pop`);
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setPopAds(res.data);
      if(res.data){
        setAdvertVisible(true);
      }
    } catch (err) {
      console.log('err',err)
    }
  }
  const handleCloseAdvert = () => {
    setAdvertVisible(false);
  }
  const handleHomePage = async () => {
    try {
      const res = await httpRequest.post(`phoenix-center-backend/client/noauth/track/record`,{
        data: {
          page: 'page/jobList/jobList',
          memberId: auth?.info.userid,
          event: 'home_page_view',
          type: process.env.TARO_ENV === 'h5' ? 'H5' : 'WECHAT',
          scene: Taro.getStorageSync(storageKeys.scene),
          time: new Date().getTime(),
          openId: auth?.info?.openid,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
    } catch (err) {
      console.log('err',err)
    }
  }
  const handleAuthLocation =  () => {
   if(!isH5){
    Taro.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userLocation']){
          Taro.getLocation({
            success: (result) => {
              Taro.setStorageSync(storageKeys.longitude, result.longitude);
              Taro.setStorageSync(storageKeys.latitude, result.latitude);
            },
            fail: (err) => {
              console.log('err',err)
            }
          })
        }else{
          Taro.authorize({
            scope: 'scope.userLocation',
            success: () => {
              Taro.getLocation({
                success: (result) => {
                  Taro.setStorageSync(storageKeys.longitude, result.longitude);
                  Taro.setStorageSync(storageKeys.latitude, result.latitude);
                },
                fail: (err) => {
                  console.log('err',err)
                }
              })
            }
          })
        }
      }
    })
   }
  }
  useDidShow(() => {
    setTabList(tabLists);
    if(auth.info.token) {
      if(!isH5){
        getOverview();
      }
      getUserInfo();
    }
    getImagesBanner();
    if(!Taro?.getCurrentPages()[0]?.data?.isBack){
      setHeight(0 + Math.random());
      setPagination((cur)=>{
        return {
          ...cur,
          pageNumber: 0,
        }
      })
    }else{
      Taro?.getCurrentPages()[0].setData({
        isBack: false,
      })
    }
  });
  useEffect(() => {
    handleAuthLocation();
    getPopAds();
    handleHomePage();
  },[]);
  useEffect(() => {
    if (!isH5) {
      getNavHeight();
    }
  }, [])
  const handleScrollToLower = () =>{
    setPagination({
      ...pagination,
      pageNumber: pagination.pageNumber + 1
    })
  };
  return (
    <View className={styles.page}>
      <NavBar  title='首页' customStyle={{color:'black',background:'#F6F8FF'}} />
      <ScrollView className={styles.container} onScrollToLower={handleScrollToLower} scrollY  lowerThreshold={100} scrollTop={height} style={{paddingTop:!isH5 && `${statusHeight + 44}px`}}>
        <Swiper list={imageBanners} />
          {
            !auth.info.token ? 
            (<View className={styles.login}>
                <Login />
            </View>):null
          }
          <View style={{position:'relative'}}>
            <View className={styles.list}  >
              <Tabs 
                tabList={tabList}
                current={tabCurrent}
                onTabClick={onTabClick}
                extra={<View style={{width:'16px',margin:'0 auto'}}><IconFont name='tabs_selected' style={{textAlign:'center'}} /></View>}
              />
            </View>
            <View className={styles.demo}>
              <ListIndex pagination={pagination} key={pagination.type} closeDialog={closeDialog} handleSubmit={handleSignUp} />
            </View>
          </View>
      </ScrollView>
      <AdvertModal
        visible={advertVisible}
        onClose={handleCloseAdvert}
        imageUrl={popAds?.imageUrl}
        jumpUrl={popAds?.jumpUrl}
      />
      <Dialog 
        maskClosable
        visible={visible}
        content={
          <View className={styles['dialog-content']}>
            <Image mode='widthFix' src={resultImg.success} className={styles['dialog-img']} />
            <View className={styles['dialog-subtitle']}>恭喜您，报名成功</View>
          </View>
          }
        onClose={() => { 
          setVisible(false);
        }}
      />
      <Dialog 
        maskClosable
        visible={loginVisible}
        content='您还未登录'
        actions={
          [{
            title: '下次再说',
            onClick: () =>{ setLoginVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '去登录',
            onClick: () =>{
            setLoginVisible(false)
            Taro.navigateTo({
            url: '../loginGuide/index'
          })
          },
          type: 'primary',
          size: 'mini'
        }]
        }
      />
      <Dialog 
        maskClosable
        visible={signVisible}
        title='提示'
        content='报名岗位需要先完善您的个人简历'
        actions={
          [{
            title: '取消',
            onClick: () =>{ setSignVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '去完善',
            onClick: () =>{
              setSignVisible(false);
              Taro.navigateTo({
                url: '/packageA/pages/myResume/index'
              })
            },
            type: 'primary',
            size: 'mini'
        }]
        }
      />
    </View>
  )
};

export default observer(Index);
