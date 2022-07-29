import { useEffect, useState } from 'react';
import Taro,{showToast} from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { httpRequest } from '@/utils';
import PropTypes from 'prop-types';
import auth from '@/stores/auth';
import { Dialog } from '@/components';
import { resultImg} from '@/constants';
import styles from './ListItem.module.scss';

const ListItem = ({
  data
}) => {
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [resumeVisible, setResumeVisible] = useState(false);
  const platform = process.env.TARO_ENV;
  const token = auth.info.token;
  const handleSubmit = async() => {
    try {
      const res = await httpRequest.post(`phoenix-manager-backend/client/signUp/${data.id}`, {
        data: {
          mobile: auth.realInfo.realMobile,
          name: auth.realInfo.realName,
          platform,
        }
      });
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setSignUpSuccess(true);
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  }
  const handleCurrentState = (state) => {
    switch (state.step) {
      case 'init':
        setLoginVisible(false);
        setResumeVisible(false);
        setSignUpSuccess(false);
        break;
      case 'login':
        Taro.navigateTo({
          url: `/pages/loginGuide/index`
        });
        break;
      case 'signUp':
        if(token){
          if(!auth.realInfo.completeInfo){
            setResumeVisible(true);
          }else{
            handleSubmit();
          }
        }else{
          setLoginVisible(true);
        }
        break;
      case 'detail':
        Taro.navigateTo({
          url: `/pages/position/index?positionId=${data?.id}`,
        })
        break;
      case 'resume':
        Taro.navigateTo({
          url: `/packageA/pages/myResume/index`,
        })
      break;
    }
  }
  useEffect(() => {
    handleCurrentState({step:'init'});
  }, []);
  return (
  <View className={styles['post-item']}>
    <View className={styles['post-item-header']}>
      <View className={styles['item-header-title']}>
        {data?.jobName}
      </View>
      <View className={styles['item-header-details']} onClick={()=> handleCurrentState({step:'detail'})}>
        查看详情
      </View>
    </View>
    <View className={styles['post-label-wrapper']}>
      {
        data.tags.map((value)=>{
          return <View className={styles['label-item']} key={value}>{value}</View>
        })
      }
    </View>
    <View className={styles['post-item-botton']}>
      <View className={styles['item-botton-money']}>
        {data.orderPriceStart +　data.orderPriceType}
      </View>
      <View className={styles['sing-up-button']} onClick={()=>handleCurrentState({step:'signUp'})}>立即报名</View>
    </View>
    <Dialog 
      maskClosable
      visible={signUpSuccess}
      content={
        <View className={styles['dialog-content']}>
          <Image mode='widthFix' src={resultImg.success} className={styles['dialog-img']} />
          <View className={styles['dialog-subtitle']}>恭喜您，报名成功</View>
        </View>
      }
      onClose={() => { 
        handleCurrentState({step:'init'});
      }}
    />
    <Dialog 
      maskClosable
      visible={loginVisible}
      content='您还未登录'
      onClose={()=>setLoginVisible(false)}
      actions={
        [{
          title: '下次再说',
          onClick: () =>{ handleCurrentState({step:'init'}); },
          type: 'default',
          size: 'mini'
        }, {
          title: '去登录',
          onClick: () =>{
            handleCurrentState({step:'login'});
          },
          type: 'primary',
          size: 'mini'
        }]
      }
    />
    <Dialog 
      maskClosable
      visible={resumeVisible}
      title='提示'
      content='报名岗位需要先完善您的个人简历'
      actions={
        [{
          title: '取消',
          onClick: () =>{ handleCurrentState({step:'init'}); },
          type: 'default',
          size: 'mini'
        }, {
          title: '去完善',
          onClick: () =>{
            handleCurrentState({step:'resume'});
          },
          type: 'primary',
          size: 'mini'
      }]
      }
    />
  </View>
  )
}
ListItem.propTypes = {
  data:PropTypes.shape({})
};

ListItem.defaultProps = {
  data:{}
};
export default ListItem;
