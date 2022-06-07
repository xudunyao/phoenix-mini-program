import { useState } from 'react';
import { View } from '@tarojs/components';
import { Tabs, TabsPanel, IconFont } from '@/components';
import exampleImg from '@/assets/images/example.png';
import exampleImg1 from '@/assets/images/example1.png';
import styles from  './Index.module.scss';
import SwiperIndex from '../components/swiper/index';
import ListIndex from './components/list/index';

const tabList = [{
  key: 'ALL',
  title: '全部',
}, {
  key: 'HOURLY_WORKER',
  title: '小时工',
}, {
  key: 'DAILY_WORKER',
  title: '正式工',
}, {
  key: 'HAVE_REWARD',
  title: '派遣工',
}, {
  key: 'FORMAL_WORKER',
  title: '兼职工',
}];
const swiperList = [
  exampleImg,
  exampleImg1,
];
const Index = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const onTabClick = (index) => {
    setTabCurrent(index)
  };

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
              <TabsPanel>
                <ListIndex name={item.key} />
              </TabsPanel>
            ))
          }
        </Tabs>
      </View>
    </View>
  )
};

export default Index
