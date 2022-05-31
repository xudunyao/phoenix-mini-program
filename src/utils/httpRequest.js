/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import Taro, { getAccountInfoSync } from '@tarojs/taro';
// import axios from 'axios';

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

const interceptor = async (chain) => {
  const requestParams = chain.requestParams
  const token = await getStorageSync(storageKeys.TOKEN);
  requestParams.header = {
    ...requestParams.header,
    Authorization: 'Bearer ' + token //将token添加到头部
  }
  return chain.proceed(requestParams).then(res => { return res })
}
const handleUnauthorized = () => {
  removeStorageSync(storageKeys.TOKEN);
};

Taro.addInterceptor(interceptor);
const request = async (method, url, params) => {
  const contentType = params?.data ? 'application/json' : 'application/x-www-form-urlencoded';
  if (params) contentType = params?.headers?.contentType || contentType;
  const option = {
    method,
    isShowLoading: false,
    url: 'http://xgn-inner-fat.fjf.com/phoenix-center-backend'+ url,
    data: params && (params?.data || params?.params),
    header: {
      'content-type': contentType,
    },
    success(res) {
      switch (res?.code) {
        case 503: {
          break;
        }
        case 401: {
          handleUnauthorized();
          break;
        }
        default:
          break;
      }
    },
    error(e) {
      console.log('api', '请求接口出现问题', e);
    }
  }
  const resp = await Taro.request(option);
  return resp.data;//根据个人需要返回
}

export default {
  get: (url, config) => {
    return request('GET', url, config);
  },
  post: (url, config) => {
    return request('POST', url, config);
  },
  put: (url, config) => {
    return request('PUT', url, config);
  },
  delete: (url, config) => {
    return request('DELETE', url, config);
  },
  patch: (url, config) => {
    return request('PATCH', url, config);
  },
}
