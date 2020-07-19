import { config } from './config';
import { log } from '../../utils';

Page({
  data: {
    ...config,
  },
  onLoad(query) {
    log.info('Page onLoad');
  },
  goCouponList() {
    my.navigateTo({
      url: '/pages/coupon/coupon'
    });
  }

});
