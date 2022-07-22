import { View ,Text, Image} from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import Taro , {showToast } from '@tarojs/taro';
import auth from '@/stores/auth';
import styles from  './Workbench.module.scss';
import  idea from './img/idea.png';
import real_name from './img/real_name.png';
import setting from './img/setting.png';
import sing_up from './img/sing_up.png';
import bill from './img/bill.png';
import introduce from './img/introduce.png';
import resume from './img/resume.png';
import invitation from './img/invitation.png';

const workbenchList = [
  {
    title: '实名认证',
    icon: real_name,
    url: 'pages/auth/index',
  },
  {
    title: '我的简历',
    icon: resume  ,
    url: 'packageA/pages/myResume/index',
  },
  {
    title: '邀请好友',
    icon: invitation  ,
    url: 'packageActivity/pages/invitation/index',
    tips: '1288.8元红包',
  },
  {
    title: '我的报名',
    icon: sing_up,
    url: 'pages/registration/index',
  },
  {
    title: '寻工鸟介绍',
    icon: introduce,
    url: 'pages/registration/index',
  },
  {
    title: '账单明细',
    icon: bill,
    url: 'packageA/pages/wallet/index',
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
  const handleClick = (item) => {
    if(!auth.info.token){
      notLogin();
      return;
    }
    if(item.title === '实名认证' && validation) {
      showToast({
        icon: 'none',
        title: '您已经实名认证，无需再次认证'
      })
      return ;
    }
    if (item.url) {
      Taro.navigateTo({
        url: "/" + item.url
      })
    }
  };
  return (
    <>
      <View className={styles.workbench}>
        <View className={styles.title}>工作台</View>
          <View className={styles['workbench-item']}>
            {
              workbenchList.map((item) => {
                return (
                    <View className={styles.center} onClick={() => { handleClick(item)}} key={item.title}>
                        <View className={styles['icon-wrapper']}>
                          {
                            item.tips &&  <View className={styles['icon-tips']}>
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
      
    </>
  )
};

export default observer(Workbench)
