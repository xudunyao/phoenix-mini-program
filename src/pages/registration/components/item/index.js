import { View ,Text, Image } from '@tarojs/components';
import moment from 'moment';
import { IconFont } from '@/components';
import { datetimeFormat } from '@/constants';
import enroll_success from './img/enroll_success.png';
import styles from "./Item.modules.scss";

const stateText = {
  JOINED_ON: '在职',
  JOINED_RESIGED: '已离职',
  SIGN_UP_PENDING:  '已报名',
  SIGN_UP_NO_INTENTION: '未通过',
  SIGN_UP_NO_CONSIDER:'已报名',
  SIGN_UP_INTENTION: '已报名',
  INTERVIEW_PENDING: '面试中',
  INTERVIEW_PASS: '面试中',
  INTERVIEW_CONSIDER :'面试中',
  INTERVIEW_FAIL: '未通过',
  EMPLOYMENT_PENDING: '待入职',
  EMPLOYMENT_PASS: '待入职',
  EMPLOYMENT_FAIL: '未通过',
}
const stateColor = {
  "已报名": styles['status_signUP'],
  "面试中": styles['status_INTERVIEW'],
  "未通过": styles['status_signUP'],
  "待入职": styles['status_EMPLOYMENT'],
  "在职": styles['status_JOINED_ON'],
  "已离职": styles['tatus_signUP'],
}
const Item = (
  {
    data,
  }
 ) => {
  return (
    <View className={styles.item}>
        <View>
          <View className={styles.head}>
            <View className={styles.title}>{data.jobName}</View>
            <View className={stateColor[stateText[data.status]]}>{stateText[data.status]}</View>
          </View>
          <View className={styles.wrapper}>
            <View className={styles.wages}>
              <Text className={styles.money}>{data.orderPriceStart}{data?.orderPriceEnd && `-${data?.orderPriceEnd}`}</Text><Text>{data?.orderPriceType}</Text>
            </View>
            {
              data?.subsidyAmount ? (
                <View className={styles.subsidy} >
                  <Text className={styles.money}>{data?.subsidyAmount}</Text> <Text>元/时补贴</Text>
                </View>
              ) : null
            }

          </View>
          <View className={styles.tags}>
            {
              data.tags.slice(0,3).map((item, index) => {
                return (
                  <View className={styles.tag} key={index}>{item}</View>
                )
              })
            }
          </View>
        </View>
        <View className={styles.root}>
            <View className={`${styles.map} ${styles.center} ${styles['root-text']}`}>
               <IconFont name='location' color='#ccc' style={{marginRight:'4px'}} />
               <Text>{data.city + data.area}</Text>
            </View>
            <View className={`${styles['root-text']} ${styles.center}`}>
               <IconFont name='clock' color='#ccc' style={{marginRight:'4px'}} />
               <Text>{ moment(data?.signUpTime).format(datetimeFormat.date)}</Text>
            </View>
        </View>
    </View>
  )
}

export default Item
