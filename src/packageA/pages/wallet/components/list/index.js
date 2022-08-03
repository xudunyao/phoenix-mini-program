import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { View } from '@tarojs/components';
import { datetimeFormat, resultImg } from '@/constants';
import { InfiniteScroll, Result } from '@/components';
import { httpRequest } from '@/utils';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import styles from  './List.module.scss';

const ListItem = ({
  type
}) => {
  const icon = {
    src:resultImg.empty,
    width: 100,
    height: 100,
  }
  const getData = async (search) => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/transactionRecord',{
        data: {
          billType: type,
          ...search,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <InfiniteScroll
      getData={getData}
      pageSize={10}
      noDataComponent={
        <Result
          icon={icon}
          subTitle='暂无更多数据' 
        />
      }
      renderItem={(item) => (
      <View className={styles.list}>
        <View className={styles.info}>
          <View className={styles.title}>{item?.tradeType}</View>
          <View className={`${item.amount > 0 ?　styles['income-money'] : styles['outlay-money']}`}>
          {
            item?.amount > 0 ? `+${numeral(item?.amount).format('0,0.00')}元` : `${numeral(item?.amount).format('0,0.00')}元`
          }
          </View>
        </View>
        <View className={styles.time}>{moment(item.time).format(datetimeFormat.dateTime)}</View>
      </View>
    )}
    >
   </InfiniteScroll>
  );
}
ListItem.propTypes = {
  data: PropTypes.shape({})
};

ListItem.defaultProps = {
  data:{}
};
export default observer(ListItem);