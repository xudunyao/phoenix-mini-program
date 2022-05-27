import { useGlobalIconFont } from './components/iconfont/helper';

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/message/index',
    'pages/my/index',
    'pages/form/index',
    'pages/result/index',
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
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath:"assets/images/job.png",
      selectedIconPath:"assets/images/job_active.png",
    }, {
      pagePath: 'pages/message/index',
      text: '消息',
      iconPath:"assets/images/message.png",
      selectedIconPath:"assets/images/message_active.png",
    }, {
      pagePath: 'pages/my/index',
      text: '消息',
      iconPath:"assets/images/my.png",
      selectedIconPath:"assets/images/my_active.png",
    }],
    backgroundColor: '#ffffff',
    color: '#666666',
    selectedColor: '#80A2FF',
  },
})
