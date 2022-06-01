import Taro from '@tarojs/taro';

export const getStorageSync = (key) => {
  switch (process.env.TARO_ENV) {
    case 'tt':
      return tt.getStorageSync(key)
    default:
      return Taro.getStorageSync(key);
  }
}

export const removeStorageSync = (key) => {
  switch (process.env.TARO_ENV) {
    case 'tt':
      return tt.getStorageSync(key)
    default:
      return Taro.removeStorageSync(key);
  }
}