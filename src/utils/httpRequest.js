/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import Taro, { getAccountInfoSync } from '@tarojs/taro';
import auth from '@/stores/auth';

import { storageKeys } from '@/constants';
import { getStorageSync, removeStorageSync } from '@/utils';

export const getBaseUrl = async () => {
  if (process.env.NODE_ENV === 'development') {
    return API_ENDPOINT;
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

  return isProd ? API_ENDPOINT : API_ENDPOINT_UAT;
}
getBaseUrl();

const handleUnauthorized = () => {
  removeStorageSync(storageKeys.TOKEN);
  Taro.redirectTo({
    url: '/pages/loginGuide/index'
  })
  auth.clearInfo();
};

const interceptor = async (chain) => {
  const { requestParams } = chain
  const token = await getStorageSync(storageKeys.TOKEN);
  const baseUrl = await getBaseUrl();
  const isStaticUrl = requestParams?.url?.startsWith('https://') || requestParams?.url?.startsWith('http://');
  if (!isStaticUrl) {
    requestParams.url = `${baseUrl}${requestParams.url}`
  }
  requestParams.header = {
    ...requestParams.header,
    'X-User-Token': token,
  }
  return chain.proceed(requestParams).then(res => { return res })
}

Taro.addInterceptor(interceptor);

const defaultHeader = { 'content-type': 'application/json' };

const request = (method, url, params) => new Promise(async (resolve, reject) => {
  try {
    await Taro.request({
      method,
      url,
      data: params?.data,
      isShowLoading: !!params?.isShowLoading,
      header: {
        ...defaultHeader,
        ...(params?.headers || {}),
      },
      success: (res) => {
        if (res?.data?.code === 10) {
          handleUnauthorized();
        }
        resolve(res.data);
      },
    });
  } catch (err) {
    if (err?.status) {
      switch (err?.status) {
        case 401:
          handleUnauthorized();
          reject('登录失效');
          break;
        case 404:
          reject('找不到请求地址');
          break;
        case 503:
          reject('服务器异常');
          break;
        // TODO(optional): 根据其他不同的网络状态码返回不同的error message
        default:
          reject(err?.statusText);
          break;
      }
    }
    reject(err);
  }
});

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
