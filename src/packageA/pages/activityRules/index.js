import { View, Text, Image } from '@tarojs/components';
import backgroundImg from '@/constants/backgroundImg';
import styles from './ActivityRules.module.scss';
import LogoImg from './images/logo.png'

const userGift = () => {
  return (
    <View className={styles.userGift} style={{backgroundImage: `url(${backgroundImg.activityBackground})`}}>
        <View className={styles.body}>
            <View className={styles.activityObject}>
                <View className={styles.activityObjectHeader}>
                    <Text className={styles.activityHeaderText}>活动对象</Text>
                </View>
                <View className={`${styles.activityText}  ${styles.removeSag}`}>
                    <Text>寻工鸟用户（可邀请人注册、找工作，也可自己注册、找工作）</Text>
                </View>
            </View>
            <View className={styles.activityRules}>
                    <View className={styles.activityObjectHeader}>
                        <Text className={styles.activityHeaderText}>活动规则</Text>
                    </View>
                    <View className={`${styles.activityText}  ${styles.removeSag}`}>
                        <Text>邀新活动说明：</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>用户A：邀请人 、用户B：被邀请人</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>1、寻工鸟注册用户A邀请B注册成为寻工鸟用户，用户B手机验证后完成注册，用户A即享有红包奖励。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（1）用户A邀请用户B完成注册后，用户A获得邀新注册红包8.88元。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（2）用户B完成报名后，用户A获得报名红包6.66元。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（3）用户B到线下面试后，用户A获得面试红包6.66元。  </Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（4）用户B线下面试成功后，用户A获得面试通过红包6.66元。  </Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（5）用户B线下签订劳动合同后，用户A获得入职红包18.88元。（可提现合计金额：47.74元）    </Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（6）特殊说明：以上红包奖励需用户B入职签订劳动合同后，相对应奖金才可以提现。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（7）邀请奖励时效说明：每邀请一个用户，从用户注册时间起算，一个自然月内有效。   </Text>
                    </View>
                </View>
                <View className={styles.activityRules}>
                    <View className={styles.activityObjectHeader}>
                        <Text className={styles.activityHeaderText}>活动规则</Text>
                    </View>
                    <View className={`${styles.activityText}  ${styles.removeSag}`}>
                        <Text>1、用户B（被邀请人）完成注册后，可立即获得新人注册红包<Text className={styles.money}>1288.8</Text>元</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（1）用户B首次报名可获得报名红包8.8元。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（2）用户B首次线下面试后可获得面试红包7元。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（3）用户B首次线下面试成功后可获得面试成功红包为8元。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（4）用户B首次入职签订劳动合同后，解锁提现功能（可提现合计23.80元）。</Text>
                    </View>
                    <View className={styles.activityText}>
                        <Text>（5）特殊说明：需用户B入职签订劳动合同后，相对应奖金才可以提现。</Text>
                    </View>
                </View>
            <Image className={styles.img} src={LogoImg} mode='widthFix' />
        </View>
    </View>
  )
};

export default userGift;