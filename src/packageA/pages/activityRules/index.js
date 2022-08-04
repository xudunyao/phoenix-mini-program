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
                    <Text className={styles.activityHeaderText}>规则一</Text>
                </View>
                <View className={`${styles.activityText}  ${styles.removeSag}`}>
                    <Text>用户（所有用户）注册后，享有寻工鸟入职<Text className={styles.money}>1288.8</Text>新人大红包，完成新人任务获得对应的奖励。1288.8元新人礼包包含以下几个方面：</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（1）用户注册开始一年内首次报名可获得报名红包为8.8元（需完成入职后可提现）。</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（2）用户注册开始一年内首次线下面试后可获得面试红包为7元（需完成入职后可提现）。</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（3）用户注册开始一年内首次线下面试成功后可获得面试成功红包为8元（需完成入职后可提现）。</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（4）用户注册开始一年内首次入职签订劳动合同后，解锁提现功能（可提现合计23.80元）。</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（5）用户注册开始一年内首次入职打卡满7天，解锁68元红包（可立即提现）</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（6）注册开始一年内首次入职打卡满30天，解锁399元红包（可立即提现）</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（7）用户注册开始一年内二次入职打卡满30天，解锁399元红包（可立即提现） </Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（8）用户注册开始一年内三次入职且工作打卡满30天，解锁399元红包（可立即提现）</Text>
                </View>
            </View>
            <View className={styles.activityRules}>
                <View className={styles.activityObjectHeader}>
                    <Text className={styles.activityHeaderText}>规则二</Text>
                </View>
                <View className={`${styles.activityText}  ${styles.removeSag}`}>
                    <Text>（1）首次入职奖励前的红包（注册、面试、面试通过），可通过报名平台所有岗位（兼职岗位除外）获得</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（2）首次入职后，后续入职打卡奖励（如：打卡满7天），需要用户报名平台特定的岗位（特定岗位在首页特别有特殊展示，请前往首页查看）</Text>
                </View>
            </View>
            <View className={styles.activityRules}>
                <View className={styles.activityObjectHeader}>
                    <Text className={styles.activityHeaderText}>规则三</Text>
                </View>
                <View className={`${styles.activityText}  ${styles.removeSag}`}>
                    <Text>（1）完成对应阶段任务后，需要用户前往活动页面领取后，方可进行提现；</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（2）未解锁提现的红包，需要完成入职后方可解锁提现权限。</Text>
                </View>
                <View className={styles.activityText}>
                    <Text>（3）入职大礼包有效期：完成注册后1个自然年内有效。</Text>
                </View>
            </View>
            <Image className={styles.img} src={LogoImg} mode='widthFix' />
        </View>
    </View>
  )
};

export default userGift;