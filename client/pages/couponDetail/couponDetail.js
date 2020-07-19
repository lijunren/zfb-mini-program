import {services} from "../../utils/service";
Page({
  data: {
    item: null,
    text: "",
  },
  async onLoad(query) {
    console.log(query);
    services.collect("baseData");
    const res = await services.find(query);
    console.log(res);
    this.setData({
      item: res.result[0]
    });
    
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
    
  }
  
});
