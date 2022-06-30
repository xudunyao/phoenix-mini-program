import { httpRequest } from '@/utils';
import Taro from '@tarojs/taro';

export const templateIdQuery = async () => {
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
          index: 1,
          text: (res.data.unReadCount).toString()
        })
      } else {
        Taro.removeTabBarBadge({
          index: 1,
        })
      }
    } 
  } catch (err) {
    console.log(err);
  }
};