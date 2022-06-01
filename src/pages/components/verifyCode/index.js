import {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';

import styles from './VerifyCode.module.scss';

let timer = null;
const VerifyCode = ({ onClick, listeners }) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    timer && clearInterval(timer);
    return () => timer && clearInterval(timer);
  }, []);

  useEffect(()=> {
    if( time === 60 ){
      timer = setInterval(()=> setTime(timeItem => --timeItem), 1000)
    } 
    else if ( time === 0 ){
      listeners();
      clearInterval(timer); 
    } 
  }, [time])

  const getCode = () => {
    onClick && onClick(()=> {
      setTime(60)
    })
  };
  return (
    <View className={styles.send} onClick={getCode}>
      { time? `${time}s后重新获取`: '获取验证码' }
    </View>
  )
}
VerifyCode.propTypes = {
  onClick: PropTypes.func,
  listeners: PropTypes.func,
};

VerifyCode.defaultProps = {
  onClick: () => {},
  listeners: () => {},
};
export default VerifyCode;
