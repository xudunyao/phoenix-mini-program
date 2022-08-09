import { View ,Image,Text} from '@tarojs/components';
import IconFont from '@/components/iconfont';
import styles from  './RewardModal.module.scss';

const RewardModal = ({
  onClose,
  maskClosable = false,
  imageUrl,
  visible = false,
  award,
}) => {
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  }
  const style = {
    position:'absolute',
    bottom:'0px',
    left:'50%',
    transform:'translateX(-50%)'
  }
  return (
   imageUrl && (
    <View className={styles.mask}  style={{ display: visible ? 'block' : 'none' }} onClick={handleMaskClick}>
      <View className={styles['mask-body']}>
        <Image className={styles['mask-body-img']} src={imageUrl} mode='widthFix' />
        <View className={styles['mask-body-content']}>
          <Text className={styles['content-title']}>恭喜您获得</Text>
          <Text className={styles['content-desc']}>{award}大礼包</Text>
        </View>
        <View style={style} onClick={onClose}>
          <IconFont name='clear' color='#ccc' size={25} />
        </View>
      </View>
    </View>
   )
  )
}
export default RewardModal