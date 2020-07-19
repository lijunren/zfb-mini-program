import { log } from '../../utils';

/**
 * @author alipay.demo
 * @description 了解云函数功能演示
 */
Page({
  data: {
    sum: '',
  },
  async handleTry() {
    my.showLoading({
      content: '正在计算中',
    });
    try {
      const res = await my.serverless.function.invoke('getSum',  {
        x: 1,
        y: 1,
      });
      // 第一次可以看一下控制台打印完整的响应数据
      log.info(res);

      if (res.success) {
        this.setData({
          sum: res.result,
        });
      } else {
        my.showToast({
          type: 'fail',
          content: '请求失败',
        });
      }
    } catch (e) {
      log.error('云函数异常：', e);
    }
    my.hideLoading();
  } 
});
