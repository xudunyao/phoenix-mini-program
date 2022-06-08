import { observable } from 'mobx';
import Taro from '@tarojs/taro';
import { storageKeys } from '@/constants';

const authStore = observable({
  info: {
    token: Taro.getStorageSync(storageKeys.TOKEN),
    mobile: Taro.getStorageSync(storageKeys.MOBILE),
    openid: Taro.getStorageSync(storageKeys.OPENID),
    userid: Taro.getStorageSync(storageKeys.USERID),
    unionid: Taro.getStorageSync(storageKeys.UNIONID),
  },

  setInfo(obj) {
    this.info.token = obj?.token;
    this.info.mobile = obj?.mobile;
    this.info.openid = obj?.openid;
    this.info.userid = obj?.userid;
    this.info.unionid = obj?.unionid;
  },

  clearInfo() {
    this.info = {
      token: '',
      mobile: '',
      openid: '',
      userid: '',
      unionid: '',
    }
  }
})

export default authStore;