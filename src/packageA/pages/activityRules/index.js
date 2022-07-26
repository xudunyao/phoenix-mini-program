import { View, Text, Image } from '@tarojs/components';
import backgroundImg from '@/constants/backgroundImg';
import styles from './ActivityRules.module.scss';
import LogoImg from './images/logo.png'

const userGift = () => {
  return (
    <View className={styles.userGift} style={{backgroundImage: `url(${backgroundImg.userGiftBackground})`}}>
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
                    <Text>一、用户完成注册后，可立即获得新人注册红包<Text className={styles.money}>1288.8</Text>(仅显示不可提现)</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>二、用户B首次报名可获得报名红包为8.8元（不可立即提现）。</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>三、用户B首次报名可获得报名红包为8.8元（不可立即提现）。</Text>
                </View>
            </View>
            <View className={styles.activityRules}>
               <View className={styles.activityObjectHeader}>
                    <Text className={styles.activityHeaderText}>活动规则</Text>
               </View>
                <View className={`${styles.activityText}  ${styles.removeSag}`}>
                    <Text>一、用户完成注册后，可立即获得新人注册红包<Text className={styles.money}>1288.8</Text>(仅显示不可提现)</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>二、用户B首次报名可获得报名红包为8.8元（不可立即提现）。</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>三、用户B首次报名可获得报名红包为8.8元（不可立即提现）。</Text>
                </View>
            </View>
            <Image className={styles.img} src={LogoImg} mode='widthFix' />
        </View>
    </View>
  )
};

export default userGift;