import { makeAutoObservable, action } from 'mobx';
import Taro from '@tarojs/taro';
import { storageKeys } from '@/constants';


class Auth{
  info = {
    token: Taro.getStorageSync(storageKeys.TOKEN),
    mobile: Taro.getStorageSync(storageKeys.MOBILE),
    openid: Taro.getStorageSync(storageKeys.OPENID),
    userid: Taro.getStorageSync(storageKeys.USERID),
    unionid: Taro.getStorageSync(storageKeys.UNIONID),
  };
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setInfo(obj) {
    this.info.token = obj?.jwt;
    this.info.mobile = obj?.mobile;
    this.info.openid = obj?.openid;
    this.info.userid = obj?.userid;
    this.info.unionid = obj?.unionid;
  }
  clearInfo() {
    this.info = {
      token: '',
      mobile: '',
      openid: '',
      userid: '',
      unionid: '',
    }
  }
};

export default new Auth();