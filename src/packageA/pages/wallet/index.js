import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View } from '@tarojs/components';
import Taro,{ useDidShow } from '@tarojs/taro';
import { httpRequest } from '@/utils';
import { Button,Tabs, TabsPanel, IconFont,NavBar} from '@/components';
import numeral from 'numeral';
import ListItem from './components/list/index';
import styles from  './Wallet.module.scss';

const tabLists = [{
  key: 'INCOME',
  title: '收入',
}, {
  key: 'OUTLAY',
  title: '提现',
},]; 
const Wallet = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const [balance, setBalance] = useState(0);
  const onTabClick = (index) => {
    setTabCurrent(index)
  };
  const getWalletInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/walletInfo');
      if(res?.code !== 0){
        throw new Error(res?.msg);
      }
      setBalance(res.data?.balance);
    } catch (err) {
      console.log('err',err)
    }
  }
  const handleClick = () => {
    Taro.navigateTo({
      url: '/packageA/pages/withdraw/index'
    })
  }
  useDidShow(() => {
    getWalletInfo();
  },[]);
  return  (
    <>
      <NavBar showBack title='我的钱包' customStyle='color:white;background: linear-gradient(180deg, #5381FF 0%, #8AA9FF 100%)' />
      <View className={styles.wallet}>
        <View className={styles.account}>
          <View className={styles['account-title']}>账户余额（元）</View>
          <View className={styles['account-money']}>{numeral(balance).format('0,0.00')}</View>
          <Button customStyles={{maxWidth:'351Px',width:'80%',margin:'32px 0px 24px',lineHeight:'42px'}} onClick={handleClick}>提现</Button>
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
                    <TabsPanel key={item} >
                      <ListItem type={item.key} />
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
