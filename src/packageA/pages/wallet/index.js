import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View } from '@tarojs/components';
import { Button,Tabs, TabsPanel, IconFont, InfiniteScroll,NavBar} from '@/components';
import ListItem from './components/list/index';
import styles from  './Wallet.module.scss';

const Wallet = () => {
  const tabLists = [{
    key: '1',
    title: '收入',
  }, {
    key: '2',
    title: '提现',
  },]; 
  const [tabCurrent, setTabCurrent] = useState(0);
  const onTabClick = (index) => {
    setTabCurrent(index)
  };
  const getData = async (search) => {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        const response = {
          code: 0,
          data: {
            content: [
              {
                title:'大礼包',
                time: '2020-01-01',
                money:'+200.00',
              },
              {
                title:'大礼包',
                time:new Date(),
                money:'+200.00',
              },
            ],
            ...search,
            totalPages: 5,
          }};
        resolve(response)
      }, 500);
    });
    return res.data;
  }
  return  (
    <>
      <NavBar showBack title='我的钱包' customStyle='color:white;background: linear-gradient(180deg, #5381FF 0%, #8AA9FF 100%)' />
      <View className={styles.wallet}>
        <View className={styles.account}>
          <View className={styles['account-title']}>账户余额（元）</View>
          <View className={styles['account-money']}>2000.00</View>
          <Button customStyles={{maxWidth:'351Px',width:'80%',margin:'32px 0px 24px',lineHeight:'42px'}}>提现</Button>
        </View>
        <View className={styles.detailed}>
          <View className={styles['detailed-title']}>
           收支明细
          </View>
          <View className={styles['detailed-tab']}>
            <Tabs 
              tabList={tabLists}
              current={tabCurrent}
              onTabClick={onTabClick}
              extra={<View style={{width:'16px',margin:'0 auto'}}><IconFont name='tabs_selected' style={{textAlign:'center'}} /></View>}
            >
                {
                  tabLists.length > 0 && tabLists.map((item) => (
                    <TabsPanel>
                      <InfiniteScroll
                        getData={getData}
                        pageSize={5}
                        renderItem={() => (
                         <ListItem data={item} />
                        )}
                      >
                      </InfiniteScroll>
                    </TabsPanel>
                  ))
                }
              </Tabs>
          </View>
        </View>
      </View>
    </>
  )
  }

export default observer(Wallet);
