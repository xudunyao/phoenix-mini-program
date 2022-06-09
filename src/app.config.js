import { useGlobalIconFont } from './components/iconfont/helper';

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/privacyProtocol/index',
    'pages/setting/index',
    'pages/messageAccount/index',
    'pages/messageSystem/index',
    'pages/messageWork/index',
    'pages/message/index',
    'pages/my/index',
    'pages/loginGuide/index',
    'pages/auth/index',
    'pages/login/index',
    'pages/position/index',
    'pages/example/index',
    'pages/registration/index',
    'pages/form/index',
    'pages/result/index',
    'pages/suggestion/index',
    'pages/protocol/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '寻工鸟',
    navigationBarTextStyle: 'black'
  },
  /* eslint-disable */
  usingComponents: Object.assign(useGlobalIconFont()),
  tabBar: {
    list: process.env.TARO_ENV === 'h5' ? [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath:"assets/images/iconIndex.png",
      selectedIconPath:"assets/images/iconIndex_active.png",
    }, {
      pagePath: 'pages/my/index',
      text: '我的',
      iconPath:"assets/images/iconMy.png",
      selectedIconPath:"assets/images/iconMy_active.png",
    }] : [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath:"assets/images/iconIndex.png",
      selectedIconPath:"assets/images/iconIndex_active.png",
    }, {
      pagePath: 'pages/message/index',
      text: '消息',
      iconPath:"assets/images/iconMessage.png",
      selectedIconPath:"assets/images/iconMessage_active.png",
    }, {
      pagePath: 'pages/my/index',
      text: '我的',
      iconPath:"assets/images/iconMy.png",
      selectedIconPath:"assets/images/iconMy_active.png",
    }],
    backgroundColor: '#ffffff',
    color: '#666666',
    selectedColor: '#80A2FF',
  },
})
