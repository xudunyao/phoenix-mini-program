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
  realInfo ={
    completeInfo: Taro.getStorageSync(storageKeys.completeInfo),
    realMobile: Taro.getStorageSync(storageKeys.realMobile),
    realName: Taro.getStorageSync(storageKeys.realName),
    idNo: Taro.getStorageSync(storageKeys.idNo),
  }
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
  setRealInfo(obj) {
    this.realInfo.completeInfo = obj?.completeInfo;
    this.realInfo.realMobile = obj?.mobile;
    this.realInfo.realName = obj?.name;
    this.realInfo.idNo = obj?.idNo;
  }
  clearInfo() {
    this.info = {
      token: '',
      mobile: '',
      openid: '',
      userid: '',
      unionid: '',
    }
    this.realInfo ={
      completeInfo: false,
      realMobile: '',
      realName: '',
    }
  }
};

export default new Auth();