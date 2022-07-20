import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { View } from '@tarojs/components';
import { datetimeFormat } from '@/constants';
import PropTypes from 'prop-types';
import styles from  './List.module.scss';

const ListItem = ({
  data
}) => {
  return (
    <View className={styles.list}>
      <View className={styles.info}>
        <View className={styles.title}>{data?.title}</View>
        <View className={styles.time}>{moment(data.time).format(datetimeFormat.dateTime)}</View>
      </View>
      <View className={styles['income-money']}>
        {data?.money}
      </View>
    </View>
  );
}
ListItem.propTypes = {
  data: PropTypes.shape({})
};

ListItem.defaultProps = {
  data:{}
};
export default observer(ListItem);