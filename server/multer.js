const multer = require('multer')
const mime = require('mime-types')
const crypto = require('crypto')

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

const multerStore = multer({ storage: storage })

const multerUpload = multerStore.fields([

  {name: 'image-file'},
  {name: 'audio-file'}

])

module.exports = multerUpload
