module.exports = function uploadsGateway(collection) {
  return {

    async create(uploadData) {
      collection.insertOne(uploadData)
    },

    async find() {
      const songList = await collection.find({}).toArray()
      return songList
    }

  }
}
