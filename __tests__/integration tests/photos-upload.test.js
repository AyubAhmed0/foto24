/* global describe, afterAll, it, expect */
const request = require('supertest')
const app = require('../../app')
const db = require('../../db')
const path = require('path')

afterAll(() => db.end())

describe('POST /api/photos/upload', () => {
  // The following test have been commented out because it uploads photos to S3, incurring costs.

  // it('should upload a photo successfully', async () => {
  //   // login a valid user to get token
  //   const loginResponse = await request(app)
  //     .post('/api/users/login')
  //     .send({ username: 'rose', password: 'rose12345' })
  //     .expect(200)

  //   // extract token from login response
  //   const token = loginResponse.body.token

  //   // Now use the token for the photo upload test
  //   return request(app)
  //     .post('/api/photos/upload')
  //     .set('Authorization', `Bearer ${token}`)
  //     .attach(
  //       'photo',
  //       path.resolve(__dirname, '..', '..', 'uploads', '1709579286632.jpg')
  //     )
  //     .field('description', 'A test photo')
  //     .expect(201)
  //     .then((response) => {
  //       expect(response.body).toHaveProperty(
  //         'msg',
  //         'Photo uploaded successfully'
  //       )
  //     })
  // })

  // The following test have been commented out because it depends on the above commented test.

  // it('successfully inserts photo data into the database', async () => {
  //   // fetch the user to get the userId
  //   const userRes = await db.query('SELECT * FROM users WHERE username = $1', [
  //     'rose'
  //   ])
  //   expect(userRes.rows.length).toBeGreaterThan(0) // Making sure the user exists
  //   const userId = userRes.rows[0].userId

  //   // fetch the most recently uploaded photo by this userId
  //   const photoRes = await db.query(
  //     'SELECT * FROM photos WHERE "userId" = $1 ORDER BY created_at DESC LIMIT 1',
  //     [userId]
  //   )

  //   expect(photoRes.rows.length).toBe(1) // a photo was found
  //   const uploadedPhoto = photoRes.rows[0]
  //   expect(uploadedPhoto.description).toBe('A test photo')
  //   expect(uploadedPhoto.userId).toBe(userId)
  // })

  it('rejects photo upload without a token', () => {
    return request(app)
      .post('/api/photos/upload')
      .attach(
        'photo',
        path.resolve(__dirname, '..', '..', 'uploads', '1709579286632.jpg')
      )
      .field('description', 'A test photo')
      .expect(401)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Authorisation required'
        )
      })
  })

  it('rejects photo upload with an invalid token', () => {
    const invalidToken = 'Bearer thisisnotavalidtokenhahahaha'

    return request(app)
      .post('/api/photos/upload')
      .set('Authorization', invalidToken)
      .attach(
        'photo',
        path.resolve(__dirname, '..', '..', 'uploads', '1709579286632.jpg')
      )
      .field('description', 'A test photo')
      .expect(403)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Token is invalid or expired'
        )
      })
  })

  it('rejects photo upload without a file', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ username: 'rose', password: 'rose12345' })
      .expect(200)
    const token = loginResponse.body.token

    return request(app)
      .post('/api/photos/upload')
      .set('Authorization', `Bearer ${token}`)
      .field('description', 'A test photo')
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('msg', 'Photo upload is required')
      })
  })

  it('rejects unsupported photo formats', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ username: 'rose', password: 'rose12345' })
      .expect(200)
    const token = loginResponse.body.token

    const response = await request(app)
      .post('/api/photos/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach(
        'photo',
        path.resolve(__dirname, '..', '..', 'uploads', 'unsupported-file.txt')
      )
      .field('description', 'A test with unsupported format')
      .expect(400)

    expect(response.body).toHaveProperty('msg', 'Unsupported file format')
  })
})
