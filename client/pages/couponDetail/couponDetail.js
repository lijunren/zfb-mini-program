import {services} from "../../utils/service";
Page({
  data: {
    item: null,
    text: "",
    realPrice: 0,
  },
  async onLoad(query) {
    console.log(query);
    services.collect("baseData");
    const res = await services.find(query);
    console.log(res);
    const reg = /￥[a-zA-Z0-9]*￥/g;
    res.result[0].coupon_command = res.result[0].coupon_command.match(reg)[0];
    this.setData({
      item: res.result[0]
    });
    this.computePrice(res.result[0]);
  },
  copyCode() {
    my.setClipboard({
      // text: this.data.item.code,
      complete(res) {
        console.log(res)
        if (res.success) {
          my.showToast({
            content: "拷贝成功！",
            type: "success",
          });
        } else {
          my.showToast({
            content: "拷贝失败~",
            type: "fail",
          });
        }
      }
    });
  },
  computePrice(item) {
    const realPrice = Math.round(item.good_price * 100 - item.coupon_price * 100) / 100;
    this.setData({
      realPrice
    });
  }
});
