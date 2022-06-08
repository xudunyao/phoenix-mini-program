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

  setInfo(token, mobile, openid, userid, unionid) {
    this.info.token = token;
    this.info.mobile = mobile;
    this.info.openid = openid;
    this.info.userid = userid;
    this.info.unionid = unionid;
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