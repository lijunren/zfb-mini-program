const db = my.serverless.db;
const collectionName = 'test';
const testDb = db.collection(collectionName);

export const services = {
  async find(condition = {}) {
    return testDb.find(condition, {sort: { time: 1 }});
  },
  async insertOne(model) {
    return testDb.insertOne(model);
  },
  async updateOne(id, count) {
    return testDb.updateOne({
      _id: id,
    }, {
      $set: {
        count
      }
    });
  },
  async deleteOne(id) {
    return testDb.deleteOne({ _id: id });
  }
};
