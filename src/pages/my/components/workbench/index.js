import { View ,Text, Image} from '@tarojs/components';
import { IconFont } from '@/components';
import Taro , {showToast} from '@tarojs/taro';
import styles from  './Workbench.module.scss';
import  idea from './img/idea.png';
import real_name from './img/real_name.png';
import setting from './img/setting.png';
import sing_up from './img/sing_up.png';

const workbenchList = [
  {
    title: '实名认证',
    icon: real_name,
    url: 'pages/auth/index',
  },
  {
    title: '我的报名',
    icon: sing_up,
    url: 'pages/registration/index',
  },
  {
    title: '意见反馈',
    icon: idea,
    url: 'pages/suggestion/index',
  },
  {
    title: '设置',
    icon: setting,
    url: '',
  },
]
const handleClick = (item,validation) => {
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
}
const Workbench = (
  {
    validation
  }
) => {
  return (
    <View className={styles.workbench}>
      <View className={styles.title}>工作台</View>
      {
        workbenchList.map((item, index) => {
          return (
            <>
            <View className={styles.workbenchItem} onClick={() => { handleClick(item,validation)}}>
              <View className={styles.center}>
                  <View className={styles.iconWrapper}>
                    <Image src={item.icon} className={styles.icon} />
                  </View>
                  <Text className={styles.subTitle}>{item?.title}</Text>
              </View>
              <View>
                <IconFont name='right' color='#ccc' />
              </View>
           </View>
          {
            index !== workbenchList.length - 1 ? <View className={styles.line}></View> : ''
          }
          </>
          )
        })
      }
    </View>
  )
};

export default Workbench
