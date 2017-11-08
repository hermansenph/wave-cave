const express = require('express')
const path = require('path')
const multer = require('multer')
const mime = require('mime-types')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: 'server/uploads/',
  filename: (rew, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype))
    })
  }
})

const upload = multer({ storage: storage })

function createApp() {

  const app = express()

  app
    .use(express.static(path.join(__dirname, 'public')))
    .post('/upload', upload.fields([
      {name: 'image-file'},
      {name: 'audio-file'}
    ]), (req, res) => {
      console.log(req.body)
      console.log(req.files)
    })
  return app
}

module.exports = { createApp }
