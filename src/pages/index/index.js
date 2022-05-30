import { useState } from 'react';
import { View } from '@tarojs/components';
import { Tabs, TabsPanel } from '@/components';
import styles from  './Index.module.scss';
import SwiperIndex from './components/swiperIndex';

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
      <SwiperIndex />
      <View>
        <Tabs tabList={tabList} current={tabCurrent} onTabClick={onTabClick} >
          <TabsPanel>111111</TabsPanel>
        </Tabs>
      </View>
    </View>
  )
};

export default Index
