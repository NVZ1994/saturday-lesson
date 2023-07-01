const multer = require("multer")
const path = require("path")

const tempPath = path.join(__dirname, "../temp")

const config = multer.diskStorage({ destination: tempPath })

const upload = multer({ storage: config })

module.exports = upload