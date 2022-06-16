import { View ,Text, Image } from '@tarojs/components';
import moment from 'moment';
import { IconFont } from '@/components';
import { datetimeFormat } from '@/constants';
import enroll_success from './img/enroll_success.png';
import styles from "./Item.modules.scss";


const Item = (
  {
    data,
  }
 ) => {
  return (
    <View className={styles.item}>
        <View className={styles.content}>
            <View>
              <View className={styles.title}>{data.jobName}</View>
              <View className={styles.wrapper}>
                <View className={styles.wages}>
                  <Text className={styles.money}>{data.orderPriceStart}{data.orderPriceEnd && `-${data.orderPriceEnd}`}</Text><Text>元/时</Text>
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
            <View>
                 <Image src={enroll_success}  style='width: 82px;height: 75px' />
            </View>
        </View>
        <View className={styles.root}>
            <View className={`${styles.map} ${styles.center} ${styles['root-text']}`}>
               <IconFont name='location' color='#ccc' style={{marginRight:'4px'}} />
               <Text>{data.city + data.area}</Text>
            </View>
            <View className={`${styles['root-text']} ${styles.center}`}>
               <IconFont name='clock' color='#ccc' style={{marginRight:'4px'}} />
               <Text>{ moment(data?.signUpTime).format(datetimeFormat.dateTime)}</Text>
            </View>
        </View>
    </View>
  )
}

export default Item
