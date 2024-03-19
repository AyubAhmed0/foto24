/* global describe, afterAll, it, expect */
const request = require('supertest')
const app = require('../../app')
const db = require('../../db')

afterAll(() => db.end())

describe('GET /api/photos/gallery', () => {
  let token
  it("retrieves a paginated gallery with photos, including uploader's username and description", async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ username: 'rose', password: 'rose12345' })
      .expect(200)

    token = loginResponse.body.token

    const page = 1
    const limit = 1

    return request(app)
      .get(`/api/photos/gallery?page=${page}&limit=${limit}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.photos).toHaveLength(limit)
        response.body.photos.forEach((photo) => {
          expect(photo).toHaveProperty('url')
          expect(photo).toHaveProperty('description')
          expect(photo).toHaveProperty('username')
          // Check properties are not null or undefined
          expect(photo.url).toBeTruthy()
          expect(photo.description).toBeTruthy()
          expect(photo.username).toBeTruthy()
        })
      })
  })

  it('returns an empty array when requesting a page beyond the total number of photos', () => {
    const page = 5
    const limit = 1

    return request(app)
      .get(`/api/photos/gallery?page=${page}&limit=${limit}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.photos).toHaveLength(0)
      })
  })

  it('returns a 400 error for invalid query parameters', () => {
    const page = 'invalid'
    const limit = -2

    return request(app)
      .get(`/api/photos/gallery?page=${page}&limit=${limit}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toBe('Bad Request')
      })
  })
})
