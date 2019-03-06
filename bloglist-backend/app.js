const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { errorHandler, tokenExtractor } = require('./utils/middleware')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app
