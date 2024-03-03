/* global describe, beforeAll, afterAll, it, expect */
const request = require('supertest')
const app = require('../../app')
const db = require('../../db')
const seed = require('../../db/seed')
const data = require('../../db/data/test-data')

beforeAll(() => seed(data))
afterAll(() => db.end())

describe('POST /api/users/register', () => {
  it('should register a new user with a unique username and valid password', () => {
    const testUser = {
      username: 'newuser12345',
      password: 'password123'
    }
    return request(app)
      .post('/api/users/register')
      .send(testUser)
      .expect(201)
      .then((response) => {
        const { user } = response.body
        expect(user.username).toEqual(testUser.username)
      })
  })

  it('should not register a user with a password shorter than 8 characters', () => {
    return request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'short'
      })
      .expect(400)
      .then((response) => {
        const { msg } = response.body
        expect(msg).toBe('Password must be at least 8 characters long')
      })
  })
  it('should return a 400 bad request when missing keys in request body', () => {
    const testUser = {
      username: 'newuser123'
    }
    return request(app)
      .post('/api/users/register')
      .send(testUser)
      .expect(400)
      .then((response) => {
        const { msg } = response.body
        expect(msg).toBe('Bad request')
      })
  })
  it('should return a 400 bad request for failing schema validation eg username is not unique', () => {
    const testUser = {
      username: 'lee',
      password: 'password123'
    }
    return request(app)
      .post('/api/users/register')
      .send(testUser)
      .expect(400)
      .then((response) => {
        const { msg } = response.body
        expect(msg).toBe('Bad request')
      })
  })
})
