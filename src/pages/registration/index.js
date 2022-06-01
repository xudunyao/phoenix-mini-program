import { InfiniteScroll} from '@/components';
import { View } from '@tarojs/components';
import { Item } from "./components";
import styles from  './Registration.module.scss';

const Registration = () => {
  const getData = async (search) => {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        const response = {
          code: 0,
          data: {
            content: [
              {
                title:'这是标题1它到这儿哦哦哦哦哦哦哦哦哦哦哦哦',
                wages: '32',
                subsidy: '+1',
                tags: ['正式工', '底薪高', '福利好'],
                map: '深圳龙华',
                date: '2022-04-09',
              },
              {
                title:'这是标题2它到这儿哦哦哦哦哦哦哦哦哦哦哦哦',
                wages: '32',
                subsidy: '+1',
                tags: ['正式工', '底薪高', '福利好'],
                map: '深圳龙华',
                date: '2022-04-09',
              },
              {
                title:'这是标题3它到这儿哦哦哦哦哦哦哦哦哦哦哦哦',
                wages: '32',
                subsidy: '+1',
                tags: ['正式工', '底薪高', '福利好'],
                map: '深圳龙华',
                date: '2022-04-09',
              },
              {
                title:'这是标题4它到这儿哦哦哦哦哦哦哦哦哦哦哦哦',
                wages: '32',
                subsidy: '+1',
                tags: ['正式工', '底薪高', '福利好'],
                map: '深圳龙华',
                date: '2022-04-09',
              }
            ],
            ...search,
            totalPages: 5,
          }};
        resolve(response)
      }, 500);
    });
    return res.data;
  }
  return (
   <View className={styles.container}>
      <InfiniteScroll
        getData={getData}
        pageSize={20}
        renderItem={(item) => (
        <Item data={item} />
      )}
      >
    </InfiniteScroll>
   </View>
  )
}
export default Registration
