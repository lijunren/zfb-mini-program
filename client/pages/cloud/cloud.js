import cloud from 'alipay-serverless-sdk';
import { log } from '../../utils';
Page({
  data: {
    qrCodeUrl: '',
  },
  onLoad() {

  },
  async handleTry() {
    my.showLoading({
      content: '二维码生成中',
    });
    try {
      const res = await cloud.base.qrcode.create(
        'pages/cloud/cloud',
        'key=value',
        '我是二维码描述',
      );
      this.setData({
        qrCodeUrl: res.qrCodeUrl,
      });
    } catch (e) {
      my.showToast({
        content: e.message || '未知错误',
      });
    }
    my.hideLoading();
  }
});
