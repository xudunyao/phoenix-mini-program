import { View, Image,Text} from '@tarojs/components';
import { InfiniteScroll} from '@/components';
import  Progress from './components/progress'
import ListItem  from './components/ListItem';
import styles from "./GiftBag.module.scss";
import baseImg from './img/baseImg.png';

const process = [
  {
    title: '已完成',
    count: '154',
  },
  {
    title: '已完成',
    count: '54',
  },
  {
    title: '已完成',
    count: '14',
  },
  {
    title: '待领取',
    count: '8',
  },
]
const getData = async (search) => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        code: 0,
        data: {
          content: [
            {
              title:'我是岗位名称啊啊啊我到这儿',
              label:['男女不限','需要体检','身体健康'],
              money:'5000-8000/月',
            },
            {
              title:'我是岗位名称啊啊啊我到这儿',
              label:['男女不限','需要体检','身体健康'],
              money:'5000-8000/月',
            },
            {
              title:'我是岗位名称啊啊啊我到这儿',
              label:['男女不限','需要体检','身体健康'],
              money:'5000-8000/月',
            },
          ],
          ...search,
          totalPages: 5,
        }};
      resolve(response)
    }, 500);
  });
  return res.data;
}
const ProcessItem = ({ title, count }) => {
  return (
    <View className={styles['reward-item']} style={{backgroundImage: "url(" + require("./img/open.png") + ")"}}>
      <View className={styles['reward-tips']}>{title}</View>
      <View className={styles['reward-count']}>{count}</View>
    </View>
  )
}
const Invitation = () => {
  return  (
    <View className={styles['gift-bag']}>
      <Image src={baseImg} mode='widthFix' style={{width:'100%'}} ></Image>
      <View className={styles['gift-rule']}>规则说明</View>
      <View className={styles['gift-reward']}>
        <View className={styles['gift-reward-title']}>累计奖金</View>
        <View className={styles['gift-reward-money']}>23.8<Text className={styles['gift-reward-unit']}>元</Text></View>
      </View>
      <View className={`${styles['activity-module']} ${styles['induction-award']}`}>
        <View className={styles['induction-award-title']} />
        <View className={styles['induction-award-desc']}>
          <Text className={styles['award-desc-modify']} />所有岗位<Text className={styles['award-desc-modify']} style='transform:rotate(180deg)' />
        </View>
        <View className={styles['reward-item-wrapper']}>
          {
            process.map((item)=>{
              return <ProcessItem {...item}></ProcessItem>
            })
          }
        </View>
        <Progress size={4} percentage={50} />
        <View className={styles['induction-award-font']}>
          {
            process.map(()=>{
              return (
              <View>
                <View className={styles['award-font-text']}>首次入职</View>
                <View className={styles['award-register-btn']}>去注册</View>
              </View>
              )
            })
          }
        </View>
      </View>
      <View className={`${styles['activity-module']} ${styles['sing-up']}`}>
        <View className={styles['sing-up-title']} />
        <InfiniteScroll
          getData={getData}
          pageSize={5}
          renderItem={(item) => (
            <ListItem  data={item} />
          )}
        >
        </InfiniteScroll>
      </View>
    </View>
  )
}

export default Invitation;
