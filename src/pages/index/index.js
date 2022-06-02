import { useState } from 'react';
import { View } from '@tarojs/components';
import { Tabs, TabsPanel, IconFont } from '@/components';

import styles from  './Index.module.scss';
import SwiperIndex from '../components/swiper/index';
import ListIndex from './components/list/index';

const tabList = [{
  title: '全部',
}, {
  title: '有补贴',
}, {
  title: '正式工',
}, {
  title: '派遣工',
}, {
  title: '兼职工',
}];
const Index = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const onTabClick = (index) => {
    setTabCurrent(index)
  };
  
  return (
    <View className={styles.container}>
      <SwiperIndex customStyle='height: 231px' />
      <View className={styles.list}>
        <Tabs 
          tabList={tabList}
          current={tabCurrent}
          onTabClick={onTabClick}
          extra={<View style={{width:'16px',margin:'0 auto'}}><IconFont name='tabs_selected' style={{textAlign:'center'}} /></View>}
        >
          <TabsPanel>
            <ListIndex />
          </TabsPanel>
        </Tabs>
      </View>
    </View>
  )
};

export default Index
