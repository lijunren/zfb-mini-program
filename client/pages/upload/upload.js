import { request, log } from '../../utils';

/**
 * @author alipay.demo
 * @description 上传文件功能 demo
 */
Page({
  data: {},
  // 选择并上传图片，获得图片 URL
  handleTry() {
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const filePath = res.apFilePaths[0];
        my.getImageInfo({
          src: filePath,
          success: imageInfoRes => {
            const options = {
              filePath,
              extension: imageInfoRes.type,
              headers: {
                contentDisposition: 'inline',
              },
            };

            my.serverless.file.uploadFile(options).then((image) => {
              log.info(image);

              my.showToast({
                type: 'success',
                content: '上传成功'
              });


              this.setData({
                imageUrl: image.fileUrl,
              });
            }).catch(log.error);
          },
          fail: function(err) {
            my.showToast({
              type: 'exception',
              content: '上传失败.'
            });

            log.error(err);
          }
        });
      },
    });
  } 
});
