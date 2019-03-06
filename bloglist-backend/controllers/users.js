const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1 })
    return response.json(users).end()
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response.status(400).json({
      error: 'password must have at least 3 characters'
    })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      ...body,
      passwordHash
    })

    const newUser = await user.save()
    return response.status(201).json(newUser).end()
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter