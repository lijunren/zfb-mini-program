const db = my.serverless.db;
export const services = {
  testDb: "",
  collect(collectionName) {
    this.testDb = db.collection(collectionName);
  },
  async find(condition = {}, option = {}) {
    return this.testDb.find(condition, option);
  },
  async insertOne(model) {
    return this.testDb.insertOne(model);
  },
  async updateOne(id, count) {
    return this.testDb.updateOne({
      _id: id,
    }, {
      $set: {
        count
      }
    });
  },
  async deleteOne(id) {
    return this.testDb.deleteOne({ _id: id });
  },
  async count(ondition = {}) {
    return this.testDb.count(ondition);
  }
};


