import { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import Taro, { showToast, useDidShow } from '@tarojs/taro';
import { Dialog } from '@/components';
import { httpRequest } from '@/utils';
import auth from '@/stores/auth';
import styles from './Workbench.module.scss';
import idea from './img/idea.png';
import real_name from './img/real_name.png';
import setting from './img/setting.png';
import sing_up from './img/sing_up.png';
import introduce from './img/introduce.png';
import resume from './img/resume.png';
import customer from './img/customer.png';
import bank_card from './img/bank_card.png';

const workbenchList = [
  {
    title: '实名认证',
    icon: real_name,
    url: 'pages/auth/index',
  },
  {
    title: '我的简历',
    icon: resume,
    url: 'packageA/pages/myResume/index',
  },
  {
    title: '客服电话',
    icon: customer,
    call: true,
  },
  {
    title: '我的报名',
    icon: sing_up,
    url: 'pages/registration/index',
  },
  {
    title: '寻工鸟介绍',
    icon: introduce,
    url: 'pages/introduce/index',
  },
  {
    title: '解绑银行卡',
    icon: bank_card,
    card: true,
  },
  {
    title: '意见反馈',
    icon: idea,
    url: 'pages/suggestion/index',
  },
  {
    title: '设置',
    icon: setting,
    url: 'pages/setting/index',
  },
]

const Workbench = (
  {
    validation,
    notLogin,
  }
) => {
  const [visible, setVisible] = useState(false);
  const [isRealName,setIsRealName] = useState(false);
  const [walletInfo, setWalletInfo] = useState(0);
  const handleClick = (item) => {
    if (!auth.info.token) {
      notLogin();
      return;
    }
    if (item.title === '实名认证' && validation) {
      showToast({
        icon: 'none',
        title: '您已经实名认证，无需再次认证'
      })
      return;
    }
    if (item.url) {
      Taro.navigateTo({
        url: "/" + item.url
      })
    }
    if (item.call) {
      Taro.makePhoneCall({
        phoneNumber: '18948762157',
      })
    }
    if (item.card) {
      if(!validation){
        setIsRealName(true);
        return;
      }
      if (walletInfo.bind) {
        {
          Taro.navigateTo({
            url: '/packageA/pages/unbindCard/index'
          });
          return;
        }
      } else {
        setVisible(!walletInfo?.bind)
      }
    }
  };
  const getWalletInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/walletInfo');
      if (res?.code !== 0) {
        throw new Error(res?.msg);
      }
      setWalletInfo(res.data);
    } catch (err) {
      console.log('err', err)
    }
  }
  useDidShow(() => {
    getWalletInfo();
  });
  return (
    <>
      <View className={styles.workbench}>
        <View className={styles.title}>工作台</View>
        <View className={styles['workbench-item']}>
          {
            workbenchList.map((item) => {
              return (
                <View className={styles.center} onClick={() => { handleClick(item) }} key={item.title}>
                  <View className={styles['icon-wrapper']}>
                    {
                      item.tips && <View className={styles['icon-tips']}>
                        {
                          item.tips
                        }
                      </View>
                    }
                    <Image src={item.icon} className={styles.icon} />
                  </View>
                  <Text className={styles.subTitle}>{item?.title}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
      <Dialog
        maskClosable
        visible={visible}
        content='您还未绑定银行卡'
        actions={
          [{
            title: '下次再说',
            onClick: () => { setVisible(false) },
            type: 'default',
            size: 'mini'
          }, {
            title: '去绑定',
            onClick: () => {
              setVisible(false)
              Taro.navigateTo({
                url: '/packageA/pages/bindCard/index'
              })
            },
            type: 'primary',
            size: 'mini'
          }]
        }
      />
      <Dialog
        maskClosable
        visible={isRealName}
        content='您还未进行实名认证'
        actions={
        [{
          title: '下次再说',
          onClick: () => { setIsRealName(false) },
          type: 'default',
          size: 'mini'
        }, {
          title: '去实名',
          onClick: () => {
            setIsRealName(false)
            Taro.navigateTo({
              url: '/pages/auth/index'
            })
          },
          type: 'primary',
          size: 'mini'
        }]
        }
      />
    </>
  )
};

export default observer(Workbench)
