const express = require('express')
const path = require('path')
const multerUpload = require('./multer')
const googleGateway = require('./google-gateway')
require('dotenv').config()

function createApp(gateway) {

  const app = express()
  const uploads = gateway

  app
    .use(express.static(path.join(__dirname, 'public')))
    .post('/upload', multerUpload, (req, res) => {

      const uploadData = {}
      Object.assign(uploadData, req.body)
      uploadData.image = req.jpeg.fileName
      uploadData.audio = req.mp3.fileName

      googleGateway(uploadData.image).upload()
      googleGateway(uploadData.audio).upload()

      uploads.create(uploadData)

      res.status(201).send('Upload Completed')
    })
    .get('/songs/:song', (req, res) => {
      const song = req.params.song
      res.sendFile(path.join(__dirname, 'songs/' + song))
    })

  return app
}

module.exports = { createApp }
