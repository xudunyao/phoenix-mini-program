/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import { getAccountInfoSync } from '@tarojs/taro';
import axios from 'axios';

import { storageKeys } from '@/constants';
import { getStorageSync, removeStorageSync } from '@/utils';

export const getBaseUrl = async () => {
  if (process.env.NODE_ENV === 'development') {
    return global.API_ENDPOINT;
  }
  let isProd = true;
  switch (process.env.TARO_ENV) {
    case 'weapp':
      const { envVersion } = await getAccountInfoSync();
      isProd = envVersion === 'release';
      break;
    case 'h5':
      isProd = process.env.APP_ENV !== 'UAT';
      break;
    case 'tt':
      const { envType } = tt.getEnvInfoSync();
      isProd = envType === 'production';
      break;
    default:
      break;
  }

  return isProd ? global.API_ENDPOINT : global.API_ENDPOINT_UAT;
}


const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {},
});

const handleUnauthorized = () => {
  removeStorageSync(storageKeys.TOKEN);
};

// Add a request interceptor
instance.interceptors.request.use(async (config) => {
  try {
    const token = await getStorageSync(storageKeys.TOKEN);
    if (token) {
      config.headers['X-User-Token'] = token;
    }
  } catch (err) {
    console.log('获取本地token异常：', err)
  }
  
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
instance.interceptors.response.use((response) => {
  if (response?.data?.code === 10) {
    handleUnauthorized();
  }
  return response.data;
}, (error) => {
  if (error?.response?.status === 401) {
    handleUnauthorized();
  }
  return Promise.reject(error);
});

export default instance;
