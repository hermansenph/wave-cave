const storage = require('@google-cloud/storage')
const gcs = storage({
  projectID: 'still-bank-185318',
  credentials: JSON.parse(process.env.CREDENTIALS)
})
const fs = require('fs')
require('dotenv').config()

const bucket = gcs.bucket('wave-cave')
console.log(process.env.CREDENTIALS)

module.exports = function googleGateway(file, folder) {
  return {

    async upload() {
      await bucket
        .upload('server/uploads/' + file)
        .catch(err => console.error('ERROR:', err))
        .then(() => fs.unlink('server/uploads/' + file))

    },

    download() {
      return new Promise((resolve, reject) => {
        bucket
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
