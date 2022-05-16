# 跨平台小程序基础框架模板
模板基于Taro[https://taro-docs.jd.com/taro/docs/]+ React + Mobx 进行开发

## 环境变量配置
`./config/dev.js` 配置开发环境
`./config/prod.js` 配置生产和UAT环境
其中 `xx-UAT` 为预览环境变量

## 运行命令
可运行命令如下
#### `yarn dev:xxx`
开发环境代码编译，支持热更新，可同时开启多端调试

#### `yarn build:xxx`
打包项目，编译后的文件位于`dist/xxx`目录下

#### `yarn uat:xxx`
打包UAT环境项目，编译后的文件位于`dist/xxx`目录下




