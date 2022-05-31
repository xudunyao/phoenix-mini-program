import { View ,Text, Image} from '@tarojs/components';
import { IconFont } from '@/components';
import styles from  './Workbench.module.scss';
import  bill from './img/bill.png';
import  idea from './img/idea.png';
import real_name from './img/real_name.png';
import setting from './img/setting.png';
import sing_up from './img/sing_up.png';

const workbenchList = [
  {
    title: '实名认证',
    icon: real_name,
    url: '',
  },
  {
    title: '我的报名',
    icon: sing_up,
    url: '',
  },
  {
    title: '账单明细',
    icon: bill,
    url: '',
  },
  {
    title: '意见反馈',
    icon: idea,
    url: '',
  },
  {
    title: '设置',
    icon: setting,
    url: '',
  },
]
const Workbench = () => {
  return (
    <View className={styles.workbench}>
      <View className={styles.title}>工作台</View>
      {
        workbenchList.map((item, index) => {
          return (
            <>
            <View className={styles.workbenchItem}>
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
