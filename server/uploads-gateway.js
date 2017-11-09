module.exports = function uploadsGateway(collection) {
  return {
    async create(uploadData) {
      collection.insertOne(uploadData)
    }
  }
}
