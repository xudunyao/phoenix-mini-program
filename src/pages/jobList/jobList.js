import Taro, {useRouter,useDidShow, useDidHide, showToast } from '@tarojs/taro';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { getOverview, getUserInfo, httpRequest } from '@/utils';
import { View, Image, ScrollView  } from '@tarojs/components';
import { Tabs, TabsPanel, IconFont, Dialog } from '@/components';
import { resultImg, storageKeys, imagesKeys } from '@/constants';
import auth from '@/stores/auth';
import styles from  './Index.module.scss';
import Swiper from './components/swiper/index'
import ListIndex from './components/list/index';
import Info from '../components/dialog/info';

const tabLists = [{
  key: 'ALL',
  title: '全部',
}, {
  key: 'FORMAL_WORKER',
  title: '正式工',
}, {
  key: 'DISPATCH_WORKER',
  title: '派遣工',
}, {
  key: 'PRAT_TIME_WORKER',
  title: '兼职工',
}];

const Index = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [signVisible, setSignVisible] = useState(false);
  const [loginVisible, setLoginVisible] =useState(false);
  const [scrollY, setScrollY] = useState(false);
  const [tabList, setTabList] =useState([]);
  const isH5 = process.env.TARO_ENV === 'h5';
  const router = useRouter();
  
  const {channelCode} = router.params;
  if(channelCode){
    Taro.setStorageSync(storageKeys.channelCode, channelCode);
  }
  const onTabClick = (index) => {
    console.log(index,'index')
    setTabCurrent(index)
  };
  const onScroll = (e) => {
    if(e.detail.scrollTop > 200){
      setScrollY(true)
    }else {
      setScrollY(false)
    }
  }
  const closeDialog = (v) => {
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
  
  const handleSubmit = async (form) => {
    try {
      const res = await httpRequest.post(`phoenix-center-backend/client/info/creat`, {
        data: {
          mobile: form.phone.value,
          name: form.name.value,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      } else {
        setSignVisible(false);
        getUserInfo();
      }
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  };
  useDidShow(() => {
    setTabList(tabLists);
    if(auth.info.token) {
      if(!isH5){
        getOverview();
      }
      getUserInfo();
    }
  });
  useDidHide(() => {
    setTabList([])
  });
  return (
    <View className={styles.page}>
      <ScrollView className={styles.container} scrollY onScroll={onScroll} enhanced bounces={false} showScrollbar={false}>
        <Swiper list={imagesKeys.banner} />
        <View className={styles.rebate}>
          <Image src={imagesKeys.rebate} className={styles['rebate-img']} mode='widthFix'></Image>
        </View>
        <View className={styles.list}  >
          <Tabs 
            tabList={tabList}
            current={tabCurrent}
            onTabClick={onTabClick}
            extra={<View style={{width:'16px',margin:'0 auto'}}><IconFont name='tabs_selected' style={{textAlign:'center'}} /></View>}
          >
            {
              tabList.length > 0 && tabList.map((item) => (
                <TabsPanel key={item.key}>
                  <ListIndex name={item.key} closeDialog={closeDialog} scrollY={scrollY} />
                </TabsPanel>
              ))
            }
          </Tabs>
        </View>
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
        <Info title='个人信息' visible={signVisible} onSubmit={handleSubmit} onCancel={() => setSignVisible(false)} />
      </ScrollView>
    </View>
  )
};

export default observer(Index);
