import { useGlobalIconFont } from './components/iconfont/helper';

export default defineAppConfig({
  pages: [
    'pages/jobList/jobList',
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
    'pages/registration/index',
    'pages/form/index',
    'pages/suggestion/index',
    'pages/invitation/index',
    'pages/introduce/index'
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/webView/index",
        'pages/wallet/index',
        'pages/withdraw/index',
        'pages/steps/index',
        'pages/bindCard/index',
        'pages/unbindCard/index',
        "pages/myResume/index",
        "pages/activityRules/index",
        "pages/savePoster/index",
        "pages/inviteRecord/index"
      ]
    },
    {
      "root": "packageActivity",
      "pages": [
        "pages/giftBag/index",
      ]
    },
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
      pagePath: 'pages/jobList/jobList',
      text: '首页',
      iconPath:"assets/images/iconIndex.png",
      selectedIconPath:"assets/images/iconIndex_active.png",
    }, 
    {
      pagePath: 'pages/invitation/index',
      text: '邀请',
      iconPath:"assets/images/activity.png",
      selectedIconPath:"assets/images/activity_active.png",
    },
    {
      pagePath: 'pages/my/index',
      text: '我的',
      iconPath:"assets/images/iconMy.png",
      selectedIconPath:"assets/images/iconMy_active.png",
    }] : [{
      pagePath: 'pages/jobList/jobList',
      text: '首页',
      iconPath:"assets/images/iconIndex.png",
      selectedIconPath:"assets/images/iconIndex_active.png",
    }, 
    {
      pagePath: 'pages/invitation/index',
      text: '邀请',
      iconPath:"assets/images/activity.png",
      selectedIconPath:"assets/images/activity_active.png",
    },
    {
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
    color: '#454D66',
    selectedColor: '#80A2FF',
  },
})
