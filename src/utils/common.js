import { httpRequest } from '@/utils';
import Taro from '@tarojs/taro';

const templateIdQuery = async () => {
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
export default {
  templateIdQuery
}