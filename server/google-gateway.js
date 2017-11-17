const Storage = require('@google-cloud/storage')
const fs = require('fs')
require('dotenv').config()

const storage = new Storage()

module.exports = function googleGateway(file, folder) {
  return {

    async upload() {
      await storage
        .bucket('wave-cave')
        .upload('server/uploads/' + file)
        .catch(err => console.error('ERROR:', err))
        .then(() => fs.unlink('server/uploads/' + file))

    },

    download() {
      return new Promise((resolve, reject) => {
        storage
          .bucket('wave-cave')
          .file(file)
          .download({
            destination: 'server/' + folder + '/' + file
          })
          .catch(err => console.error('ERROR:', err))
          .then(() => resolve('downloaded'))
      })
    }
  }
}
