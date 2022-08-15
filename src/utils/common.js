import { httpRequest } from '@/utils';
import Taro from '@tarojs/taro';
import auth from '@/stores/auth';
import { storageKeys } from '@/constants';

export const templateIdQuery = async () => {
  const isH5 = process.env.TARO_ENV === 'h5';
  if(isH5) {
    return ;
  }
  try{
    const res = await httpRequest.get('phoenix-center-backend/client/message/templateId');
    if (res?.code !== 0) {
      throw new Error(res.msg)
    } else {
      Taro.requestSubscribeMessage({
        tmplIds: res.data,
        success: function (rs) {
          console.log(rs)
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
export const getOverview = async () => {
  try{
    const res = await httpRequest.get('phoenix-center-backend/client/message/overview');
    if(res.code === 0) {
      if(res.data.unReadCount !== 0){
        Taro.setTabBarBadge({
          index: 2,
          text: (res.data.unReadCount).toString()
        })
      } else {
        Taro.removeTabBarBadge({
          index: 2,
        })
      }
    } 
  } catch (err) {
    console.log(err);
  }
};
export const getUserInfo = async () => {
  try {
    const res = await httpRequest.get('phoenix-center-backend/client/member/info');
    if(res?.code !== 0){
     throw new Error(res?.msg);
    }
    Taro.setStorageSync(storageKeys.completeInfo, res.data.completeInfo);
    Taro.setStorageSync(storageKeys.realName, res.data.name);
    Taro.setStorageSync(storageKeys.realMobile, res.data.mobile);
    auth.setRealInfo(res.data)
  } catch (err) {
    console.log(err);
  }
};