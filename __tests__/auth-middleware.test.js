/* global describe, it, expect */

const request = require('supertest')
const app = require('../app')

describe('JWT Verification Middleware', () => {
  it('should deny access without token', async () => {
    return request(app)
      .post('/api/photos/upload')
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual({ message: 'Authorisation required' })
      })
  })

  it('should deny access with invalid token', async () => {
    return request(app)
      .post('/api/photos/upload')
      .set('Authorization', 'Bearer invalidtoken')
      .expect(403)
      .then((response) => {
        expect(response.body).toEqual({
          message: 'Token is invalid or expired'
        })
      })
  })
})
