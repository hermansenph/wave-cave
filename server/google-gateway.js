const storage = require('@google-cloud/storage')
const gcs = storage({
  projectID: 'still-bank-185318',
  credentials: JSON.parse(process.env.CREDENTIALS)
})
const fs = require('fs')
require('dotenv').config()

const bucket = gcs.bucket('wave-cave')

module.exports = function googleGateway(file, folder) {
  return {

    async upload() {
      await bucket
        .upload('server/uploads/' + file)
        .catch(err => console.error('ERROR:', err))
        .then(() => fs.unlink('server/uploads/' + file))

    },

    async download() {

      function makeDirectory() {
        return new Promise((resolve, reject) => {
          console.log('PROMISE SUCCESFUL')
          fs.stat('server/' + folder, (err, stats) => {

            if (err) {
              console.log('MAKING DIRECTORY')
              fs.mkdir('server/' + folder)
              resolve()
            }

            else resolve()

          })
        })
      }

      await makeDirectory()

      await bucket
        .file(file)
        .download({
          destination: 'server/' + folder + '/' + file
        })
        .catch(err => console.error('ERROR:', err))
        .then(() => console.log('downloaded'))
    }
  }
}
