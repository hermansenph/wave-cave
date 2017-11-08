const express = require('express')
const path = require('path')
const multer = require('multer')
const mime = require('mime-types')
const crypto = require('crypto')
const fs = require('fs')
const Storage = require('@google-cloud/storage')
const { MongoClient } = require('mongodb')
require('dotenv').config()

const storageGoogle = new Storage()

const storage = multer.diskStorage({
  destination: 'server/uploads/',
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err)

      const extension = mime.extension(file.mimetype)
      const fileName = {fileName: raw.toString('hex') + '.' + extension}

      req[extension] = fileName
      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype))
    })
  }
})

const upload = multer({ storage: storage })

const googleStorage = (file) => {
  storageGoogle
    .bucket('wave-cave')
    .upload('server/uploads/' + file)
    .catch(err => {
      console.error('ERROR:', err)
    })
    .then(() => {
      fs.unlink('server/uploads/' + file)
    })
}

function createApp() {

  const app = express()

  app
    .use(express.static(path.join(__dirname, 'public')))
    .post('/upload', upload.fields([

      {name: 'image-file'},
      {name: 'audio-file'}

    ]), (req, res) => {

      const uploadData = {}
      Object.assign(uploadData, req.body)
      uploadData.image = req.jpeg.fileName
      uploadData.audio = req.mp3.fileName

      googleStorage(uploadData.image)
      googleStorage(uploadData.audio)

      MongoClient.connect(process.env.MONGODB_URI, async (err, db) => {

        if (err) console.log(err)

        const collection = db.collection('uploads')

        await collection.insertOne(uploadData)

        db.close()
      })

    })
  return app
}

module.exports = { createApp }
