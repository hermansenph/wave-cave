const express = require('express')
const path = require('path')
const multerUpload = require('./multer')
const googleGateway = require('./google-gateway')
const fs = require('fs')
require('dotenv').config()

function createApp(gateway) {

  const app = express()
  const uploads = gateway

  app
    .use(express.static(path.join(__dirname, 'public')))
    .post('/upload', multerUpload, async (req, res) => {

      const uploadData = {}
      Object.assign(uploadData, req.body)
      uploadData.image = req.jpeg.fileName
      uploadData.audio = req.mp3.fileName

      await googleGateway(uploadData.image).upload()
      await googleGateway(uploadData.audio).upload()

      await uploads.create(uploadData)

      res.status(201).send('Upload Completed')
    })
    .get('/songs-download/:song', async (req, res) => {
      const song = req.params.song
      await googleGateway(song, 'songs').download()
      res.send('downloaded')
    })
    .get('/images-download/:image', async (req, res) => {
      const image = req.params.image
      await googleGateway(image, 'images').download()
      res.send('downloaded')
    })
    .get('/songs/:song', (req, res) => {
      const song = req.params.song
      res.sendFile(path.join(__dirname, 'songs/' + song))
    })
    .get('/images/:image', (req, res) => {
      const image = req.params.image
      res.sendFile(path.join(__dirname, 'images/' + image))
    })
    .get('/songs', async (req, res) => {
      const songs = await uploads.find()
      res.send(songs)
    })
    .delete('/songs/:song', (req, res) => {
      const song = req.params.song
      console.log('deleting')
      fs.unlink('server/songs/' + song)
      res.send('deleted')
    })

  return app
}

module.exports = { createApp }
