import {services} from "../../utils/service";
import { log } from '../../utils';
Page({
  data: {
    list: [],
    currentPage: 0,
    pageNum: 10,
    showLoading: false,
    total: 0,
    end: false,
  },
  onLoad() {
    this.getListTotal();
  },
  onShow() {
    my.showLoading();
    this.getListData()
  },
  async getListTotal() {
    services.collect("baseData");
    const res = await services.count();
    this.setData({
      total: res.result
    });
    
  },
  async getListData() {
    services.collect("baseData");
    const {currentPage, pageNum, list, total} = this.data;
    const option = {
      limit: 10,
      skip: currentPage * pageNum
    }
    const res = await services.find({}, option);
    const result = res.result;
    ;
    my.hideLoading();
    this.setData({
      list: list.concat(...result),
      showLoading: false,
      currentPage: currentPage + 1
    })
  },
  toCouponDetail(e) {
    // console.log(e.target.dataset);
    const id = e.target.dataset.id;
    my.navigateTo({
      url: `../couponDetail/couponDetail?_id=${id}`
    });
  },
  onReachBottom() {
    this.setData({
      showLoading: true
    });
    const {currentPage, pageNum, total} = this.data;
    if ((currentPage) * pageNum >= total) {
      this.setData({
        showLoading: false,
        end: true
      });
      return;
    }
    this.getListData();
  },
});
