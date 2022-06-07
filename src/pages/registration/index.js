import { InfiniteScroll} from '@/components';
import { View } from '@tarojs/components';
import { httpRequest } from '@/utils';
import { Item } from "./components";
import styles from  './Registration.module.scss';

const Registration = () => {
  const getData = async (search) =>{
    try {
      const res = await httpRequest.post('phoenix-manager-backend/client/signUp/info',{
        data: search,
      });
      if( res.code ===　0){
        return res.data;
      }else{
        showToast({
          icon: 'fail',
          title: res.msg
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
   <View className={styles.container}>
      <InfiniteScroll
        getData={getData}
        pageSize={10}
        renderItem={(item) => (
        <Item data={item} />
      )}
      >
      </InfiniteScroll>
   </View>
  )
}
export default Registration
