import Taro from '@tarojs/taro';
import { useState } from 'react';
import { View, Image  } from '@tarojs/components';
import { Tabs, TabsPanel, IconFont, Dialog } from '@/components';
import { resultImg } from '@/constants';
import exampleImg from '@/assets/images/example.png';
import exampleImg1 from '@/assets/images/example1.png';
import styles from  './Index.module.scss';
import SwiperIndex from '../components/swiper/index';
import ListIndex from './components/list/index';

const tabList = [{
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
const swiperList = [
  exampleImg,
  exampleImg1,
];
const Index = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loginVisible, setLoginVisible] =useState(false);
  const onTabClick = (index) => {
    setTabCurrent(index)
  };
  const closeDialog = (v) => {
    if(v){
      setLoginVisible(true);
    } else {
      setLoginVisible(false);
      setVisible(false);
    }
    
  }
  return (
    <View className={styles.container}>
      <SwiperIndex customStyle='height: 231px' list={swiperList} position='left' />
      <View className={styles.list}>
        <Tabs 
          tabList={tabList}
          current={tabCurrent}
          onTabClick={onTabClick}
          extra={<View style={{width:'16px',margin:'0 auto'}}><IconFont name='tabs_selected' style={{textAlign:'center'}} /></View>}
        >
          {
            tabList.map((item) => (
              <TabsPanel key={item.key}>
                <ListIndex name={item.key} closeDialog={closeDialog}  />
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
    </View>
  )
};

export default Index
