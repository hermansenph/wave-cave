require('dotenv/config')
const { createApp } = require('./create-app')
const { MongoClient } = require('mongodb')
const uploadsGateway = require('./uploads-gateway')

MongoClient.connect(process.env.MONGODB_URI, async (err, db) => {

  if (err) console.log(err)

  const collection = db.collection('uploads')
  const app = createApp(uploadsGateway(collection))

  app.listen(process.env.PORT, () => {
    console.log('Listening on ' + process.env.PORT)
  })

})
