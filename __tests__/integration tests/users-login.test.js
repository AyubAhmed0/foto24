/* global describe, afterAll, it, expect */
const request = require('supertest')
const app = require('../../app')
const db = require('../../db')

afterAll(() => db.end())

describe('POST /api/users/login', () => {
  it('Successful login returns a JWT', () => {
    const userData = { username: 'rose', password: 'rose12345' }
    return request(app)
      .post('/api/users/login')
      .send(userData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('token')
      })
  })
  it('Login with incorrect username returns a 404 error', () => {
    const userData = { username: 'badusername', password: 'bad12345' }
    return request(app)
      .post('/api/users/login')
      .send(userData)
      .expect(404)
      .then((response) => {
        const { msg } = response.body
        expect(msg).toBe('User not found')
      })
  })
  it('Login with incorrect password returns a 401 error', () => {
    const userData = { username: 'rose', password: 'bad12345' }
    return request(app)
      .post('/api/users/login')
      .send(userData)
      .expect(401)
      .then((response) => {
        const { msg } = response.body
        expect(msg).toBe('Incorrect login credentials')
      })
  })
})
