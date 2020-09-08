import { services } from './services';
import { formatTime, log, alertMethodAnnotation } from '../../utils';

/**
 * @author alipay.demo
 * @description 前端数据库操作演示
 */
Page({
  data: {
    current: 0,
    newData: [],
    dbData: [],
    originData: [],
    updatedData: [],
    deletedData: {},
    stepConfig: [
      {
        title: "1. 新建数据表",
        visibleNext: true,
      }, {
        title: "2. 修改数据库权限",
        visibleNext: true
      }, {
        title: "3. 添加记录",
        visibleNext: false
      }, {
        title: '4. 查询记录',
        visibleNext: false
      }, {
        title: '5. 更新记录',
        visibleNext: false
      }, {
        title: '6. 删除记录',
        visibleNext: false
      }
    ]
  },
  onChangeStep({ current }) {
    this.setData({ current });
  },
  getNewStepConfig({ stepConfig, current }) {
    return stepConfig.map((item, index) => {
      if (current === index) {
        return {
          ...item,
          visibleNext: true,
        };
      }
      return item;
    });
  },
  onAction(action) {
    if (this[action]) {
      this[action]();
    } else {
      alertMethodAnnotation(action);
    }
  },

  // 获取最新的那条数据
  async getLastData() {
    const res = await services.find();
    const result = res.result;
    const sortedData = result.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });

    return sortedData;
  },

  // 新增数据
  async onAdd() {
    my.showLoading({
      content: '新增记录中',
    });
    
    const { newData, current } = this.data;

    const model = {
      count: 0,
      time: formatTime(new Date()),
    };
    if (newData.length > 0) {
      model.count = newData[0].count + 1;
    }

    try {
      const res = await services.insertOne(model);
      const result = res.result || {};
      // 如果插入成功
      if (res.affectedDocs > 0 && result.insertedId) {
        const insertData = await services.find({
          _id: result.insertedId
        });
        const insertResult = insertData.result || [];

        this.setData({
          newData: insertResult,
          stepConfig: this.getNewStepConfig(this.data),
        });
      }
    } catch (e) {
      log.error('新增数据异常', e);
    }

    my.hideLoading();
  },

  // 查询数据
  async onQuery() {
    my.showLoading({
      content: '查询记录中',
    });

    const { stepConfig, current } = this.data;

    try {
      const res = await services.find();
      const result = res.result;
      if (result.affectedDocs === 0) {
        my.showToast({ content: '数据条数为 0' });
      }

      const sortedData = result;

      this.setData({
        dbData: sortedData,
        stepConfig: this.getNewStepConfig(this.data),
      });
    } catch (e) {
      log.error('查询数据失败： ', e);
    }
    my.hideLoading();
  },

  // 更新数据
  async onUpdate() {
    my.showLoading({
      content: '更新记录中',
    });

    try {
      const sortedData = await this.getLastData();
      if (sortedData.length > 0) {
        const originData = sortedData[0];
        this.setData({
          originData,
        });

        const updateRes = await services.updateOne(originData._id, originData.count + 1);
        if (updateRes.affectedDocs > 0) {
          const originNewRes = await services.find({ _id: originData._id });
          this.setData({
            updatedData: originNewRes.result[0],
            stepConfig: this.getNewStepConfig(this.data),
          });
        } else {
          log.warn('数据更新记录为 0，返回数据为：', updateRes);
        }
      } else {
        log.warn('数据库记录为空，请先添加一条记录再执行更新数据.');
      }
    } catch (e) {
      log.error('更新数据失败: ', e);
    }

    my.hideLoading();
  },

  // 删除数据
  async onDelete() {
    my.showLoading({
      content: '删除记录中',
    });
    try {
      const sortedData = await this.getLastData();
      if (sortedData.length > 0) {
        const current = sortedData[0];
        const res = await services.deleteOne(current._id);
        log.info(res);

        if (res.affectedDocs > 0) {
          my.showToast({
            type: 'success',
            content: '删除成功',
          });

          this.setData({
            deletedData: current,
            stepConfig: this.getNewStepConfig(this.data),
          });
        } else {
          log.warn('删除未成功，返回数据为：', res);
        }
      }
    } catch (e) {
      log.error('删除数据失败', e);
    }
    my.hideLoading();
  }
});
