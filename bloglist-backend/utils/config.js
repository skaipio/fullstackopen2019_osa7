if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const MONGO_URL = process.env.MONGODB_URI

module.exports = {
  MONGO_URL
}
