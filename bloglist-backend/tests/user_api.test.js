const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

jest.setTimeout(15000)

const initialUsers = [
  {
    username: 'käyttäjä',
    name: 'Käyttäjä',
    password: 'iloveponies'
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  await User.create(initialUsers)
})

describe('POST /api/users', () => {
  test('creates a new user when it is valid', async () => {
    const newUser = {
      username: 'uusikäyttäjä',
      name: 'Uusi Käyttäjä',
      password: 'salasana123'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.password).toBeUndefined()
  })

  test('does not create user with invalid username or password', async () => {
    const newUserWithInvalidUsername = {
      username: 'us',
      name: 'Uusi Käyttäjä',
      password: 'salasana123'
    }

    let response = await api
      .post('/api/users')
      .send(newUserWithInvalidUsername)
      .expect(400)

      expect(response.body.error).toContain('username')

    const newUserWithInvalidPassword = {
      username: 'uusikäyttäjä',
      name: 'Uusi Käyttäjä',
      password: 'sa'
    }

    response = await api
      .post('/api/users')
      .send(newUserWithInvalidPassword)
      .expect(400)

    expect(response.body.error).toContain('password')
  })
})

afterAll(async () => {
  mongoose.connection.close()
})