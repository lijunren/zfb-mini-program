import { log } from './utils';
import MPServerless from '@alicloud/mpserverless-sdk';
import cloud from 'alipay-serverless-sdk';


// appId: '请输入小程序Id',
// 小程序云控制台中记得对比切换的空间是否正确哦~
// spaceId: '请输入spaceId',
// clientSecret: '请输入对应space的secret',
// endpoint: 'https://api.bspapp.com', 这个是API endpoint
my.serverless = my.serverless || new MPServerless({
  uploadFile: my.uploadFile,
  request: my.request,
  getAuthCode: my.getAuthCode,
}, {
  appId: '2021001173680351', // 小程序应用标识
  spaceId: '334a53db-3265-4a76-8670-398b40d422e3', // 服务空间标识
  clientSecret: 'mP79loGEqXQWNtnpoW7y+A==', // 服务空间 secret key
  endpoint: 'https://api.bspapp.com', // 服务空间地址，从小程序 serverless 控制台处获得
});

// 必须要初始化哦~cloud 是一个单例，初始化一次 App 引入均可生效
cloud.init(my.serverless);

App({
  async onLaunch(options) {
    log.info('App onLaunch');
    // 授权登录方法
    await my.serverless.user.authorize({
      authProvider: 'alipay_openapi',
    });
  },
  onShow(options) {
    log.info('App show');
  },
});
