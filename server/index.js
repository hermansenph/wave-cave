require('dotenv/config')
const { createApp } = require('./create-app')

const app = createApp()

app.listen(process.env.PORT, () => {
  console.log('Listening on ' + process.env.PORT)
})
