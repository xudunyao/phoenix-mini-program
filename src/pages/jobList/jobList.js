import Taro, {useRouter,useDidShow, useDidHide } from '@tarojs/taro';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { View, Image, ScrollView  } from '@tarojs/components';
import { Tabs, TabsPanel, IconFont, Dialog } from '@/components';
import { resultImg, storageKeys, imagesKeys } from '@/constants';
import styles from  './Index.module.scss';
import Swiper from './components/swiper/index';
import ListIndex from './components/list/index';

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
  const [loginVisible, setLoginVisible] =useState(false);
  const [scrollY, setScrollY] = useState(false);
  const [tabList, setTabList] =useState([]);
  const router = useRouter();

  const {channelCode} = router.params;
  if(channelCode){
    Taro.setStorageSync(storageKeys.channelCode, channelCode);
  }
  const onTabClick = (index) => {
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
      }else {
        setVisible(true);
      }
     
    } else {
      setLoginVisible(false);
      setVisible(false);
    }
    
  };
  useDidShow(() => {
    setTabList(tabLists)
  });
  useDidHide(() => {
    setTabList([])
  });
  return (
    <View className={styles.page}>
      <ScrollView className={styles.container} scrollY onScroll={onScroll} enhanced bounces={false} showScrollbar={false}>
        <Swiper list={imagesKeys.banner} position='left' />
        <View className={styles.rebate}>
          <Image src={imagesKeys.rebate} className={styles['rebate-img']} mode='widthFix'></Image>
        </View>
        <View className={styles.list} >
          <Tabs 
            tabList={tabList}
            current={tabCurrent}
            onTabClick={onTabClick}
            extra={<View style={{width:'16px',margin:'0 auto'}}><IconFont name='tabs_selected' style={{textAlign:'center'}} /></View>}
          >
            {
            tabList && tabList.map((item) => (
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
      </ScrollView>
    </View>
  )
};

export default observer(Index);
