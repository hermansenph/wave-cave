const Storage = require('@google-cloud/storage')
const fs = require('fs')
require('dotenv').config()

const storage = new Storage()

module.exports = function googleGateway(file) {
  return {
    upload() {
      storage
        .bucket('wave-cave')
        .upload('server/uploads/' + file)
        .catch(err => console.error('ERROR:', err))
        .then(() => fs.unlink('server/uploads/' + file))
    }
  }
}
